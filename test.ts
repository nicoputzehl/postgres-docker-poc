import { config } from 'dotenv';
import * as path from 'path';
function main() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const envFilePath = nodeEnv === 'test' ? path.resolve(__dirname, './.env.test') : path.resolve(__dirname, './.env');
  config({ path: envFilePath });


  console.log(process.env.ENV_VAR)
}

main();