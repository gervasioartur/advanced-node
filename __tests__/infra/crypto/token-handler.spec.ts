import { JwtTokenHandler } from '@/infra/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenHandler', () => {
  let secret: string
  let sut: JwtTokenHandler
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeEach(() => {
    sut = new JwtTokenHandler('any_secret')
  })

  describe('generateToken', () => {
    let key: string
    let token: string
    let expirationInMs: number
    beforeAll(() => {
      key = 'any_key'
      token = 'any_token'
      expirationInMs = 1000
      secret = 'any_secret'
      fakeJwt = jwt as jest.Mocked<typeof jwt>
      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call sing with corecct params', async () => {
      await sut.generateToken({ key, expirationInMs })
      expect(fakeJwt.sign).toHaveBeenCalledWith(
        { key },
        secret,
        { expiresIn: 1 })
    })

    it('should return a token', async () => {
      const tokenGeneratedToken = await sut.generateToken({ key, expirationInMs })
      expect(tokenGeneratedToken).toBe(token)
    })

    it('should rethrow if get throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })
      const promise = sut.generateToken({ key, expirationInMs })
      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })
})
