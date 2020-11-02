import { beginsWith } from '@aws/dynamodb-expressions';
import { DataMapper, QueryOptions } from '@aws/dynamodb-data-mapper';
import { ModelBaseType } from '@controller/base/model';
import { Log } from '@logger';
import { GSI, LSI } from '@config/tableSchema';

interface GetItemOptions {
  id?: string;
  range?: string;
  data?: string;
}

const defaultQueryOptions: QueryOptions = {
  scanIndexForward: false,
  limit: 10,
  indexName: GSI.RangeData,
  pageSize: 10,
};

class ClientWrapper {
  mapper: DataMapper;

  constructor(mapper: DataMapper) {
    this.mapper = mapper;
  }

  private async getByData<T>(Model: ModelBaseType<T>, attr: GetItemOptions): Promise<T | null> {
    const indexName = GSI.RangeData;
    return await (await this.mapper.query(Model, attr, { indexName, limit: 1 }).next()).value;
  }

  private async getById<T>(Model: ModelBaseType<T>, id: string): Promise<T | null> {
    const indexName = LSI.IdType;
    const type = Model.__type__;
    const attr = { id, type };
    return (await this.mapper.query(Model, attr, { indexName, limit: 1 }).next()).value;
  }

  async get<T>(Model: ModelBaseType<T>, keys: GetItemOptions): Promise<T | null> {
    const { id, range, data } = keys;
    console.log('QUERY GET', Model.__type__, keys);
    try {
      if (id && range) {
        return await this.mapper.get(Object.assign(new Model(), { id, range }));
      } else if (id) {
        return await this.getById<T>(Model, id);
      } else if (range && data) {
        return await this.getByData<T>(Model, { range, data });
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async pagination<T>(
    Model: ModelBaseType<T>,
    objectId = '',
    dataPrefix = '',
    options: QueryOptions
  ): Promise<T[]> {
    let items: T[] = [];
    const range = `${Model.__type__}#${objectId}`;
    const pagination = this.mapper
      .query(Model, { range, data: beginsWith(dataPrefix) }, { ...defaultQueryOptions, ...options })
      .pages();

    for await (const page of pagination) {
      items = items.concat(page);
    }
    return items;
  }

  async getAllOwnedByUser<T>(
    Model: ModelBaseType<T>,
    userId: string,
    dataPrefix = ''
  ): Promise<T[]> {
    return await this.pagination(Model, userId, dataPrefix, {
      limit: undefined,
      pageSize: undefined,
    });
  }

  async getAll<T>(Model: ModelBaseType<T>, rangePrefix = ''): Promise<T[]> {
    if (!rangePrefix) {
      rangePrefix = Model.__type__;
    }
    const indexName = GSI.TypeRange;
    const items: T[] = [];
    const iterator = this.mapper.query(
      Model,
      { type: Model.__type__, range: beginsWith(rangePrefix) },
      { indexName }
    );

    for await (const item of iterator) {
      items.push(item);
    }
    return items;
  }

  async create<T>(item: T): Promise<T | null> {
    try {
      item = await this.mapper.put(item);
      return item;
    } catch (error) {
      Log.error('Failed to create', error);
      return null;
    }
  }

  async update<T>(item: T): Promise<T | null> {
    try {
      item = await this.mapper.update(item, { onMissing: 'skip' });
      return item;
    } catch (error) {
      return null;
    }
  }

  async delete<T>(Model: ModelBaseType<T>, { id, range }: GetItemOptions): Promise<T | null> {
    try {
      const item = Object.assign(new Model(), { id, range });
      const deleted = await this.mapper.delete(item, { returnValues: 'ALL_OLD' });
      if (!deleted) {
        // operation failed
        return null;
      }
      return item;
    } catch (error) {
      return null;
    }
  }
}

export default ClientWrapper;
