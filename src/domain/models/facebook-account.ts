type FacebookData = {
  name: string
  email: string
  facebookId: string
}

type AccountData = {
  id?: string
  name?: string
}

export class FacebookAccount {
  id?: string
  name?: string
  email: string
  facebookId: string

  constructor (fbData: FacebookData, accountDate?: AccountData) {
    this.id = accountDate?.id
    this.name = accountDate?.name ?? fbData.name
    this.email = fbData.email
    this.facebookId = fbData.facebookId
  }
}
