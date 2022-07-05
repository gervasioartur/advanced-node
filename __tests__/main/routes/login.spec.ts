import request from 'supertest'
import { app } from '@/main/config/app'
import { IBackup } from 'pg-mem'
import { makeFakeDb } from '@/__tests__/infra/postgres/mocks'
import { getConnection } from 'typeorm'

describe('LoginRoutes', () => {
  describe('POST /login/facebook', () => {
    const loadUserPy = jest.fn()

    jest.mock('@/infra/apis/facebook', () => ({
      FacebookApi: jest.fn().mockReturnValue({
        loadUser: loadUserPy
      })
    }))

    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb()
      backup = db.backup()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
    })

    it('should return 200 with accessToken', async () => {
      loadUserPy.mockResolvedValueOnce({
        facebookid: 'any_id',
        name: 'any_name',
        email: 'any_email'
      })
      await request(app)
        .post('/api/login/facebook')
        .send({ token: 'valid_token' })
        .expect(200)
    })
  })
})
