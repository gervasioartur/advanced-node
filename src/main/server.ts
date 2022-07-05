import './config/module-alias'
import 'reflect-metadata'
import { env } from './config/env'
import { app } from './config/app'
import { createConnection } from 'typeorm'
import { config } from '@/infra/postgres/helper'

createConnection(config)
  .then(() => app.listen(env.port, () => console.log(`Sever runnig at: http://localhost:${env.port}`)))
  .catch(console.error)
