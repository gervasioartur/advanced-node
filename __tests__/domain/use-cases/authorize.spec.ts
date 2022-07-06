import { mock, MockProxy } from 'jest-mock-extended'

namespace TokenValidator {
  export type Params = { token: string }
}

export interface TokenValidator {
  validateToken: (params: TokenValidator.Params) => Promise<void>
}

type Input = { token: string }
// type Output = { accessToken: string }
type Authorize = (params: Input) => Promise<void>
type Setup = (crypto: TokenValidator) => Authorize

const setupAuthorize: Setup = crypto => async params => {
  await crypto.validateToken(params)
}

describe('Authorize', () => {
  let sut: Authorize
  let crypto: MockProxy<TokenValidator>
  let token: string

  beforeAll(() => {
    token = 'any_token'
    crypto = mock()
  })

  beforeEach(() => {
    sut = setupAuthorize(crypto)
  })

  it('should call TokenValidator with correct values', async () => {
    await sut({ token })
    expect(crypto.validateToken).toHaveBeenCalledWith({ token })
    expect(crypto.validateToken).toHaveBeenCalledTimes(1)
  })
})
