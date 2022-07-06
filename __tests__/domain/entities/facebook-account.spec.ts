import { FacebookAccount } from '@/domain/entities'

describe('FacebookAccount', () => {
  const fbDate = {
    name: 'any_facebook_name',
    email: 'any_facebook_email',
    facebookId: 'any_facebook_id'
  }

  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbDate)
    expect(sut).toEqual(fbDate)
  })

  it('should update name if its empty', () => {
    const accountData = { id: 'any_id' }
    const sut = new FacebookAccount(fbDate, accountData)
    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_facebook_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })

  it('should not update name if isn\'t s empty', () => {
    const accountData = { id: 'any_id', name: 'any_name' }
    const sut = new FacebookAccount(fbDate, accountData)
    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })
  })
})
