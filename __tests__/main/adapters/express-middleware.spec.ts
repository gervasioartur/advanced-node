import { HttpRequest } from '@/application/middlewares'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { RequestHandler } from 'express'
import { mock } from 'jest-mock-extended'

type Adapter = (middleware: Middleware) => RequestHandler

export interface Middleware {
  handler: (httpRequest: any) => Promise<HttpRequest>
}
export const adaptExpressMidleware: Adapter = middleware => async (req, res, next) => {
  await middleware.handler({ ...req.headers })
}

describe('ExpressMiddleware', () => {
  it('should call handler with correct request', async () => {
    const req = getMockReq({ headers: { any: 'any' } })
    const res = getMockRes().res
    const next = getMockRes().next
    const middleware = mock<Middleware>()
    const sut = adaptExpressMidleware(middleware)
    await sut(req, res, next)
    expect(middleware.handler).toHaveBeenCalledWith({ any: 'any' })
    expect(middleware.handler).toHaveBeenCalledTimes(1)
  })

  it('should call handler with empty request', async () => {
    const req = getMockReq()
    const res = getMockRes().res
    const next = getMockRes().next
    const middleware = mock<Middleware>()
    const sut = adaptExpressMidleware(middleware)
    await sut(req, res, next)
    expect(middleware.handler).toHaveBeenCalledWith({})
    expect(middleware.handler).toHaveBeenCalledTimes(1)
  })
})
