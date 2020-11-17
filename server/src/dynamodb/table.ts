import { DynamoDB } from 'aws-sdk';
import { CreateTableInput } from 'aws-sdk/clients/dynamodb';
import { Log } from '@logger';
import { TABLE_UPDATE } from '@config/tableSchema';

class TableCreator {
  static create(client: DynamoDB, name: string, schema: CreateTableInput): void {
    client.listTables((error, data) => {
      if (error) {
        Log.error('Failed to obtain list of tables.', error.message).debug(error);
        throw error;
      } else {
        Log.info('Obtained list of tables.').debug(data);
        if (!data.TableNames?.find((item) => item === name)) {
          Log.info('Creating dynamo table scheme, ', name).debug(JSON.stringify(schema));
          client.createTable(schema, (error, data) => {
            if (error) {
              Log.error('Failed to create the table. ', error.message).debug(error);
              throw error;
            } else {
              Log.info('Table created successfully.').debug(data);
            }
          });
        } else if (TABLE_UPDATE) {
          client.updateTable(TABLE_UPDATE, (error, data) => {
            if (error) {
              Log.error('Failed to update the table. ', error.message).debug(error);
              throw error;
            } else {
              Log.info('Table updated successfully.').debug(data);
            }
          });
        }
      }
    });
  }
}

export { TableCreator };
