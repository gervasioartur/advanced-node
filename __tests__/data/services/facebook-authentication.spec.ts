import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookApi with correct values', async () => {
    const loadFacebookUser = mock<LoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUser)
    await sut.perfom({ token: 'any_token' })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return authentication error when LoadFacebookApi returns undefined', async () => {
    const loadFacebookUser = mock<LoadFacebookUserApi>()
    loadFacebookUser.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUser)
    const authResult = await sut.perfom({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
