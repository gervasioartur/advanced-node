import { Controller } from '@/application/controller'
import { RequestHandler } from 'express'

export const adaptEpressRoute = (controler: Controller): RequestHandler => {
  return async (req, res) => {
    const { statusCode, data } = await controler.handle({ ...req.body })
    const json = statusCode === 200 ? data : { error: data.message }
    res.status(statusCode).json(json)
  }
}
