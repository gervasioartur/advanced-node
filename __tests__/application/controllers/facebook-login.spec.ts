import { FacebookLoginController } from '@/application/controller'
import { UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validation'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookLoginController', () => {
  let token: string
  let sut: FacebookLoginController
  let facebookAuth: MockProxy<FacebookAuthentication>

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = mock()
    facebookAuth.perform.mockResolvedValue(new AccessToken('any_value'))
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
    expect(facebookAuth.perform).toHaveBeenLastCalledWith({ token: 'any_valid_token' })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('should return  401 if authentication fails', async () => {
    facebookAuth.perform.mockResolvedValueOnce(new AuthenticationError())
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
      data: {
        accessToken: 'any_value'
      }
    })
  })
})
