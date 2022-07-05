export const env = {
  port: process.env.PORT ?? 4500,
  facebookApi: {
    clientId: process.env.FACEBOOK_CLIENT_ID ?? '378192867548072',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '3f21b8e402e95448cf7b84b875d75b7e',
    // this token expires in 3 moths
    accessTokenInTestMode: 'EAAFX9uOG26gBANoSEe7G04ZBvOKRgWo6Lxfv8EEkoR0ckViDgk2aHzsZCvSOGC6HfskWvHilRIIODiZAJo7NxjGPZBigUYnzhZAlxZBRGlejrftu5ZBZBfMpJ6TpOKmouzrelWvOm9fH1wv6kNcn0J0F1WfKMppfZCvm6Au5nuPa1GV1zSYfcW81Bd4DL81F1Jj2n1VAE549s5AZDZD'
  }
}
