import { FacebookLoginController } from '@/application/controller'
import { UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validation'
import { AuthenticationError } from '@/domain/entities/errors'

describe('FacebookLoginController', () => {
  let token: string
  let sut: FacebookLoginController
  let facebookAuth: jest.Mock

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = jest.fn()
    facebookAuth.mockResolvedValue({ accessToken: 'any_value' })
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('should build  validator correcty', async () => {
    const validators = sut.buildValidators({ token })
    expect(validators).toEqual([
      new RequiredStringValidator('any_token', 'token')
    ])
  })

  it('should call FacebookAthentication with correct params', async () => {
    await sut.handle({ token: 'any_valid_token' })
    expect(facebookAuth).toHaveBeenLastCalledWith({ token: 'any_valid_token' })
    expect(facebookAuth).toHaveBeenCalledTimes(1)
  })

  it('should return  401 if authentication fails', async () => {
    facebookAuth.mockRejectedValueOnce(new AuthenticationError())
    const httResponse = await sut.handle({ token })
    expect(httResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return  200 if authentication succeeds', async () => {
    const httResponse = await sut.handle({ token })
    expect(httResponse).toEqual({
      statusCode: 200,
      data: { accessToken: 'any_value' }
    })
  })
})
