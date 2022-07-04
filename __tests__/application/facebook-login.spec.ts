type HttpResponse = {
  statusCode: number
  data: any
}

export class FacebookLoginController {
  async handle (httRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The field token is required')
    }
  }
}

describe('FacebookLoginController', () => {
  it('should return  400 if token empty', async () => {
    const sut = new FacebookLoginController()
    const httResponse = await sut.handle({ token: '' })
    expect(httResponse).toEqual({
      statusCode: 400,
      data: new Error('The field token is required')
    })
  })
})
