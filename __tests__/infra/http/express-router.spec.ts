import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'
import { Controller } from '@/application/controller'
import { ExpresRouter } from '@/infra/http'

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let controller: MockProxy<Controller>
  let sut: ExpresRouter

  beforeEach(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { anyData: 'any_data' }
    })
    sut = new ExpresRouter(controller)
  })

  it('should call handle with correct request', async () => {
    await sut.adapt(req, res)
    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with empty request', async () => {
    const req = getMockReq()
    await sut.adapt(req, res)
    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should responde with 200 and correct data', async () => {
    await sut.adapt(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ anyData: 'any_data' })
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledTimes(1)
  })

  it('should responde with 400 and valida error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any_error')
    })
    await sut.adapt(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledTimes(1)
  })

  it('should responde with 500 and valida error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error')
    })
    await sut.adapt(req, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledTimes(1)
  })
})
