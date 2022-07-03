import { FacebookApi } from '@/infra/apis'
import { HttpGetClient } from '@/infra/http'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookApi', () => {
  let clientId: string
  let clientSecret: string
  let sut: FacebookApi
  let httClient: MockProxy<HttpGetClient>

  beforeAll(() => {
    clientId = 'any_client_id'
    clientSecret = 'any_client_secret'
    httClient = mock()
  })

  beforeEach(() => {
    httClient.get
      .mockResolvedValueOnce({ access_token: 'any_app_token' })
      .mockResolvedValueOnce({ data: { user_id: 'any_user_id' } })
      .mockResolvedValueOnce({
        id: 'any_facebook_id',
        name: 'any_facebook_name',
        email: 'any_facebook_email'
      })

    sut = new FacebookApi(httClient, clientId, clientSecret)
  })

  it('should get app token ', async () => {
    await sut.loadUser({ token: 'any_client_token' })
    expect(httClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/oauth/access_token',
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials'
      }
    })
  })

  it('should get debug token ', async () => {
    await sut.loadUser({ token: 'any_client_token' })
    expect(httClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/debug_token',
      params: {
        access_token: 'any_app_token',
        input_token: 'any_client_token'
      }
    })
  })

  it('should get userinfo', async () => {
    await sut.loadUser({ token: 'any_client_token' })
    expect(httClient.get).toHaveBeenCalledWith({
      url: 'https://graph.facebook.com/any_user_id',
      params: {
        fields: 'id,name,email',
        access_token: 'any_client_token'
      }
    })
  })

  it('should return facebook user info', async () => {
    const fbUser = await sut.loadUser({ token: 'any_client_token' })
    expect(fbUser).toEqual({
      facebookId: 'any_facebook_id',
      name: 'any_facebook_name',
      email: 'any_facebook_email'
    })
  })
})
