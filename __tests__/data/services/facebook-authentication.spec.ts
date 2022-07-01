import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUser: MockProxy<LoadFacebookUserApi>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    loadFacebookUser = mock()
    sut = new FacebookAuthenticationService(loadFacebookUser)
  })
  it('should call LoadFacebookApi with correct values', async () => {
    await sut.perfom({ token })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return authentication error when LoadFacebookApi returns undefined', async () => {
    loadFacebookUser.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perfom({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
