import dotenv from 'dotenv';
import Debug from 'debug';
const debug = Debug('env');
const result = dotenv.config();
console.log(result);
if (result.error) {
  debug('Dotenv failed to parse.', result.error);
} else {
  debug('Dotenv parsed successfully.');
}
