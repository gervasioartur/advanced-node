import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { FacebookAuthenticationService } from '@/domain/services'
import { AuthenticationError } from '@/domain/errors'
import { AccessToken, FacebookAccount } from '@/domain/models'

import { TokenGenerator } from '@/domain/contracts/crypto'
import { mocked } from 'jest-mock'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/models/facebook-account')

describe('FacebookAuthenticationService', () => {
  let sut: FacebookAuthenticationService
  let facebookApi: MockProxy<LoadFacebookUserApi>
  let crypto: MockProxy<TokenGenerator>
  let userAccountRepo: MockProxy<LoadUserAccountRepository & SaveFacebookAccountRepository>
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      facebookId: 'any_facebook_id',
      name: 'any_facebook_name',
      email: 'any_facebook_email'
    })
    userAccountRepo = mock()
    userAccountRepo.load.mockResolvedValue(undefined)
    userAccountRepo.saveWithFacebook.mockResolvedValue({ id: 'any_account_id' })
    crypto = mock()
    crypto.generateToken.mockResolvedValue('any_generated_token')
  })

  beforeEach(() => {
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo,
      crypto
    )
  })

  it('should call LoadFacebookApi with correct values', async () => {
    await sut.perform({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return authentication error when LoadFacebookApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })

  it('should retrhow if LoadFacebookApi throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('facebook_error'))
    const promise = sut.perform({ token })
    await expect(promise).rejects.toThrow(new Error('facebook_error'))
  })

  it('should call LoadUserAccountRepo with correct values when LoadFacebookApi returns data', async () => {
    await sut.perform({ token })
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_facebook_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should retrhow if LoadUserAccountRepo throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load__user_account_error'))
    const promise = sut.perform({ token })
    await expect(promise).rejects.toThrow(new Error('load__user_account_error'))
  })

  it('should call SaveFacebookAccountRepository with correct FacebookAccount', async () => {
    const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(FacebookAccount).mockImplementation(FacebookAccountStub)
    await sut.perform({ token })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should retrhow if SaveFacebookAccountRepository throws', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('save_facebook_account_error'))
    const promise = sut.perform({ token })
    await expect(promise).rejects.toThrow(new Error('save_facebook_account_error'))
  })

  it('should call TokenGenerator  with correct params', async () => {
    await sut.perform({ token })
    expect(crypto.generateToken).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })

  it('should return an accessToken on success', async () => {
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AccessToken('any_generated_token'))
  })

  it('should retrhow if TokenGenerator  throws', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('token_generator_error'))
    const promise = sut.perform({ token })
    await expect(promise).rejects.toThrow(new Error('token_generator_error'))
  })
})
