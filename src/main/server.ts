import './config/module-alias'
import 'reflect-metadata'
import { env } from './config/env'
import express, { json, Router } from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(json())
app.use((req, res, next) => {
  res.type('json')
  next()
})
const router = Router()

router.post('/api/login/facebook/', (req, res) => {
  res.send({ data: 'any_data' })
})
app.use(router)
app.listen(env.port, () => console.log(`Sever runnig at: http://localhost:${env.port}`))
