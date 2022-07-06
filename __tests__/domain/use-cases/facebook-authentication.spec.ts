import { LoadFacebookUserApi } from '@/domain/contracts/apis'
import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { FacebookAthentication, setupFacebookAuthentication } from '@/domain/use-cases'

import { TokenGenerator } from '@/domain/contracts/crypto'
import { mocked } from 'jest-mock'
import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/domain/entities/facebook-account')

describe('FacebookAuthentication', () => {
  let sut: FacebookAthentication
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
    sut = setupFacebookAuthentication(
      facebookApi,
      userAccountRepo,
      crypto
    )
  })

  it('should call LoadFacebookApi with correct values', async () => {
    await sut({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should throw authentication error when LoadFacebookApi returns undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)
    const promise = sut({ token })
    await expect(promise).rejects.toThrow()
  })

  it('should retrhow if LoadFacebookApi throws', async () => {
    facebookApi.loadUser.mockRejectedValueOnce(new Error('facebook_error'))
    const promise = sut({ token })
    await expect(promise).rejects.toThrow(new Error('facebook_error'))
  })

  it('should call LoadUserAccountRepo with correct values when LoadFacebookApi returns data', async () => {
    await sut({ token })
    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_facebook_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  it('should retrhow if LoadUserAccountRepo throws', async () => {
    userAccountRepo.load.mockRejectedValueOnce(new Error('load__user_account_error'))
    const promise = sut({ token })
    await expect(promise).rejects.toThrow(new Error('load__user_account_error'))
  })

  it('should call SaveFacebookAccountRepository with correct FacebookAccount', async () => {
    const FacebookAccountStub = jest.fn().mockImplementation(() => ({ any: 'any' }))
    mocked(FacebookAccount).mockImplementation(FacebookAccountStub)
    await sut({ token })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledWith({ any: 'any' })
    expect(userAccountRepo.saveWithFacebook).toHaveBeenCalledTimes(1)
  })

  it('should retrhow if SaveFacebookAccountRepository throws', async () => {
    userAccountRepo.saveWithFacebook.mockRejectedValueOnce(new Error('save_facebook_account_error'))
    const promise = sut({ token })
    await expect(promise).rejects.toThrow(new Error('save_facebook_account_error'))
  })

  it('should call TokenGenerator  with correct params', async () => {
    await sut({ token })
    expect(crypto.generateToken).toHaveBeenCalledWith({
      key: 'any_account_id',
      expirationInMs: AccessToken.expirationInMs
    })
    expect(crypto.generateToken).toHaveBeenCalledTimes(1)
  })

  it('should return an accessToken on success', async () => {
    const authResult = await sut({ token })
    expect(authResult).toEqual({ accessToken: 'any_generated_token' })
  })

  it('should retrhow if TokenGenerator  throws', async () => {
    crypto.generateToken.mockRejectedValueOnce(new Error('token_generator_error'))
    const promise = sut({ token })
    await expect(promise).rejects.toThrow(new Error('token_generator_error'))
  })
})
