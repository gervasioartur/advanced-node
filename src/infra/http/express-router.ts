import { Controller } from '@/application/controller'
import { RequestHandler } from 'express'

export const adaptEpressRoute = (controler: Controller): RequestHandler => {
  return async (req, res) => {
    const httpResponse = await controler.handle({ ...req.body })
    if (httpResponse.statusCode === 200) {
      res.status(200).json(httpResponse.data)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.data.message })
    }
  }
}
