import { HttpRequest } from '@/application/middlewares'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { mock, MockProxy } from 'jest-mock-extended'

type Adapter = (middleware: Middleware) => RequestHandler

export interface Middleware {
  handler: (httpRequest: any) => Promise<HttpRequest>
}
export const adaptExpressMidleware: Adapter = middleware => async (req, res, next) => {
  await middleware.handler({ ...req.headers })
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
})
