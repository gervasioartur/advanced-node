import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'
describe('facebook Api Integration Tests', () => {
  it('should return a facebook user if token is valid', async () => {
    const axioClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axioClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
    const fbUser = await sut.loadUser({ token: 'EAAFX9uOG26gBAMVstFXRW8kyTZCIhUW1tWZCATV3o7ZCoRIbjR077RiNroQ71WLnf7GrhbihTnjlIzjWxMtin2RDs5NFmMfw3CSvWRTXfKzlfLYKGXaacyNz2ZCwSpYUc6vSlYiBKrZCH91kPnmhLtJwoozc5anvmmnJxuI9fuTSYidbP4jaTHY0QNLqsZC40KIw742lQZCQQZDZD' })
    expect(fbUser).toEqual({
      facebookId: '100139682770806',
      email: 'gerry_sgxlsjq_teste@tfbnw.net',
      name: 'Gerry Teste'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const axioClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axioClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
    const fbUser = await sut.loadUser({ token: 'invali_token' })
    expect(fbUser).toBeUndefined()
  })
})
