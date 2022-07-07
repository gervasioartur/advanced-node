import { HttpRequest } from '@/application/helpers'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'

type Adapter = (middleware: Middleware) => RequestHandler

export interface Middleware {
  handler: (httpRequest: any) => Promise<HttpRequest>
}
export const adaptExpressMidleware: Adapter = middleware => async (req, res, next) => {
  const { statusCode, data } = await middleware.handler({ ...req.headers })
  res.status(statusCode).json(data)
}

describe('ExpressMiddleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let middleware: MockProxy<Middleware>
  let sut: RequestHandler

  beforeAll(() => {
    req = getMockReq({ headers: { any: 'any' } })
    res = getMockRes().res
    next = getMockRes().next
    middleware = mock<Middleware>()
    middleware.handler.mockResolvedValue({
      statusCode: 500,
      data: { error: 'any_error' }
    })
  })

  beforeEach(() => {
    sut = adaptExpressMidleware(middleware)
  })

  it('should call handler with correct request', async () => {
    await sut(req, res, next)
    expect(middleware.handler).toHaveBeenCalledWith({ any: 'any' })
    expect(middleware.handler).toHaveBeenCalledTimes(1)
  })

  it('should call handler with empty request', async () => {
    req = getMockReq()
    await sut(req, res, next)
    expect(middleware.handler).toHaveBeenCalledWith({})
    expect(middleware.handler).toHaveBeenCalledTimes(1)
  })

  it('should respond with correct error and statusCode', async () => {
    await sut(req, res, next)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
