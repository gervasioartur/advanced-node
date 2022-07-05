import { config } from '@/infra/postgres/helpers'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { app } from './config/app'
import { env } from './config/env'
import './config/module-alias'

createConnection(config)
  .then(() => app.listen(env.port, () => console.log(`Sever runnig at: http://localhost:${env.port}`)))
  .catch(console.error)
