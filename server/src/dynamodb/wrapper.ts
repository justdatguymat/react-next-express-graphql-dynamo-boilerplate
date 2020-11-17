import { beginsWith } from '@aws/dynamodb-expressions';
import { DataMapper, QueryOptions } from '@aws/dynamodb-data-mapper';
import { ModelBaseType } from '@controller/base/model';
import { Log } from '@logger';
import { GSI, LSI } from '@config/tableSchema';
import { sleep } from '@utils';

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

class DynamoWrapper {
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
    const attr = { id, type: Model.__type__ };
    const result = this.mapper.query<T>(Model, attr, { indexName, limit: 1 });
    return (await result.next()).value;
  }

  async get<T>(Model: ModelBaseType<T>, keys: GetItemOptions): Promise<T | null> {
    const { id, range, data } = keys;
    console.log('QUERY GET', Model.__type__, keys);
    await sleep(1500);
    try {
      if (id && range) {
        // get by keys ID RANGE
        return await this.mapper.get(Object.assign(new Model(), { id, range }));
      } else if (id) {
        // get by ID using ID-TYPE-LOCAL index
        return await this.getById<T>(Model, id);
      } else if (range && data) {
        // get by RANGE DATA using RANGE-DATA-GLOBAL index
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
    const data = beginsWith(dataPrefix);

    let items: T[] = [];
    let pagination;
    if (objectId) {
      const range = `${Model.__type__}#${objectId}`;
      const indexName = GSI.RangeData;
      const startKey = options.startKey
        ? {
          id: options.startKey.id,
          range: options.startKey.range,
          data: options.startKey.data,
        }
        : undefined;
      pagination = this.mapper
        .query<T>(
          Model,
          { range, data },
          { ...defaultQueryOptions, ...options, startKey, indexName }
        )
        .pages();
    } else {
      const type = Model.__type__;
      const indexName = GSI.TypeData;
      const startKey = options.startKey
        ? {
          id: options.startKey.id,
          type: options.startKey.type,
          data: options.startKey.data,
          range: options.startKey.range,
        }
        : undefined;
      pagination = this.mapper
        .query<T>(
          Model,
          { type, data },
          { ...defaultQueryOptions, ...options, startKey, indexName }
        )
        .pages();
    }

    for await (const page of pagination) {
      items = items.concat(page);
    }
    pagination.lastEvaluatedKey;
    await sleep(1500);
    return items;
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
    await sleep(1500);
    return items;
  }

  async create<T>(item: T): Promise<T | null> {
    try {
      item = await this.mapper.put(item);
      await sleep(1500);
      return item;
    } catch (error) {
      Log.error('Failed to create', error);
      return null;
    }
  }

  async update<T>(item: T): Promise<T | null> {
    try {
      item = await this.mapper.update(item, { onMissing: 'skip' });
      await sleep(1500);
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
      await sleep(1500);
      return deleted;
    } catch (error) {
      return null;
    }
  }
}

export default DynamoWrapper;
