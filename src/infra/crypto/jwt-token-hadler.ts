import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
export class JwtTokenHandler implements TokenGenerator, TokenValidator {
  constructor (
    private readonly secret: string
  ) { }

  async generateToken ({ key, expirationInMs }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }

  async validateToken ({ token }: TokenValidator.Input): Promise<TokenGenerator.Output> {
    const paylod = verify(token, this.secret) as JwtPayload
    return paylod.key
  }
}
