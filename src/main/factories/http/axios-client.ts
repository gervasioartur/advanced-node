import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosClient = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
