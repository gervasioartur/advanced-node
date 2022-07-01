import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthenticationService } from '@/data/services'
import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUserApi } from '@/data/contracts/apis'

type SutTypes = {
  sut: FacebookAuthenticationService
  loadFacebookUser: MockProxy<LoadFacebookUserApi>
}

const makeSut = (): SutTypes => {
  const loadFacebookUser = mock<LoadFacebookUserApi>()
  const sut = new FacebookAuthenticationService(loadFacebookUser)
  return {
    sut,
    loadFacebookUser
  }
}
describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookApi with correct values', async () => {
    const { sut, loadFacebookUser } = makeSut()
    await sut.perfom({ token: 'any_token' })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUser.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return authentication error when LoadFacebookApi returns undefined', async () => {
    const { sut, loadFacebookUser } = makeSut()
    loadFacebookUser.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perfom({ token: 'any_token' })
    expect(authResult).toEqual(new AuthenticationError())
  })
})
