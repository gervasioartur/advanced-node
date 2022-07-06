import { mock, MockProxy } from 'jest-mock-extended'

namespace TokenValidator {
  export type Params = { token: string }
  export type Result = string
}

export interface TokenValidator {
  validateToken: (params: TokenValidator.Params) => Promise<TokenValidator.Result>
}

type Input = { token: string }
type Output = string
type Authorize = (params: Input) => Promise<Output>
type Setup = (crypto: TokenValidator) => Authorize

const setupAuthorize: Setup = crypto => async params => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return crypto.validateToken(params)
}

describe('Authorize', () => {
  let sut: Authorize
  let crypto: MockProxy<TokenValidator>
  let token: string

  beforeAll(() => {
    token = 'any_token'
    crypto = mock()
    crypto.validateToken.mockResolvedValue('any_value')
  })

  beforeEach(() => {
    sut = setupAuthorize(crypto)
  })

  it('should call TokenValidator with correct values', async () => {
    await sut({ token })
    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })

  it('should return  the correct accessToken', async () => {
    const userId = await sut({ token })
    expect(userId).toBe('any_value')
  })
})
