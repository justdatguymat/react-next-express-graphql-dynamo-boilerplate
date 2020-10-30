//import "regenerator-runtime";
import './env'; // MUST BE AT THE TOP

import { buildServices } from '@builder';
import CONSTANTS, {
  APP_NAME,
  DYNAMO_REGION,
  DYNAMO_TABLE,
  DYNAMO_URL,
  LOG_LEVEL,
  LOG_PATH,
} from '@config/constants';
import { TABLE_SCHEMA } from '@config/tableSchema';
import { createDynamoTable } from '@dynamodb';
import { initLogger, Log } from '@logger';
import { ClusterManager } from '@manager';
import 'reflect-metadata';

function master() {
  for (const [key, value] of Object.entries(CONSTANTS)) {
    Log.debug(`${key.padEnd(30)}: ${value}`);
  }
  createDynamoTable({
    endpoint: DYNAMO_URL,
    region: DYNAMO_REGION,
    table: DYNAMO_TABLE,
    schema: TABLE_SCHEMA,
  });
}

function worker() {
  buildServices();
}

function main() {
  try {
    initLogger(APP_NAME, LOG_PATH, LOG_LEVEL);
    new ClusterManager(worker, master, 1).launch(); //TODO: hard coded number of processes
  } catch (error) {
    Log.error(error.message).debug(error);
    process.exit(1);
  }
}

/*****************
 * MAIN EXECUTION
 *****************/
process.on('uncaughtException', (error) => {
  Log.error('Uncaught exception', error.message).debug(error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  Log.error('Unhandled rejection', error || '');
  process.exit(1);
});

main();
