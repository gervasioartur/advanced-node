import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { mock, MockProxy } from 'jest-mock-extended'
import { FacebookLoginController } from '@/application/controller'
import { SeverError, UnauthorizedError } from '@/application/errors'
import { mocked } from 'jest-mock'
import { RequiredStringValidator } from '@/application/validation'

jest.mock('@/application/validation/required-string')

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

  it('should return  400 validation fails', async () => {
    const error = new Error('validation_error')
    const RequiresStringValidatorSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(RequiredStringValidator).mockImplementationOnce(RequiresStringValidatorSpy)
    const httResponse = await sut.handle({ token })
    expect(RequiredStringValidator).toHaveBeenCalledWith('any_token', 'token')
    expect(httResponse).toEqual({
      statusCode: 400,
      data: error
    })
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

  it('should return  500 if authentication throws', async () => {
    const error = new Error('infra_Error')
    facebookAuth.perform.mockRejectedValueOnce(error)
    const httResponse = await sut.handle({ token })
    expect(httResponse).toEqual({
      statusCode: 500,
      data: new SeverError(error)
    })
  })
})
