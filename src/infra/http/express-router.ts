import { Controller } from '@/application/controller'
import { Request, Response } from 'express'

export class ExpresRouter {
  constructor (
    private readonly controler: Controller
  ) { }

  async adapt (req: Request, res: Response): Promise<void> {
    const httpResponse = await this.controler.handle({ ...req.body })
    if (httpResponse.statusCode === 200) {
      res.status(200).json(httpResponse.data)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.data.message })
    }
  }
}
