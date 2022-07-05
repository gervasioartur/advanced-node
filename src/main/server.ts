import './config/module-alias'
import 'reflect-metadata'
import { env } from './config/env'
import { app } from './config/app'

app.listen(env.port, () => console.log(`Sever runnig at: http://localhost:${env.port}`))
