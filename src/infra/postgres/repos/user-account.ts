import { LoadUserAccountRepository, SaveFacebookAccountRepository } from '@/domain/contracts/repos'
import { User } from '@/infra/postgres/entities'
import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccountRepository.Input
type LoadResult = LoadUserAccountRepository.Output

type SaveParams = SaveFacebookAccountRepository.Input
type SaveResult = SaveFacebookAccountRepository.Output

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccountRepository {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(User)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
    const pgUserRepo = getRepository(User)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ name, email, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}
