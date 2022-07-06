import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
export class JwtTokenHandler implements TokenGenerator {
  constructor (
    private readonly secret: string
  ) { }

  async generateToken ({ key, expirationInMs }: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.secret, { expiresIn: expirationInSeconds })
  }

  async validateToken ({ token }: TokenValidator.Params): Promise<TokenGenerator.Result> {
    const paylod = verify(token, this.secret) as JwtPayload
    return paylod.key
  }
}
