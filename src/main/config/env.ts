export const env = {
  port: process.env.PORT ?? 4500,
  secretkey: process.env.SECRET ?? '!@Ian^vv$%.',
  facebookApi: {
    clientId: process.env.FACEBOOK_CLIENT_ID ?? '378192867548072',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '3f21b8e402e95448cf7b84b875d75b7e',
    // this token expires in 3 moths
    accessTokenInTestMode: 'EAAFX9uOG26gBAHADIAYwe8ZCJfaGj5wNs2miJlZCAzj7eZBXHoxdx08vKEd5YSg7U6m7RjVLVZCcYEKpWQjQMlLRPneZAZASMtkcNmQkAUZAzqXyNj8zXzoPx6BfHk91JkIPE4eSstaVEEaEYPBQBs5cmLJn0k7L7LyD3CSI7gLvehoMAFETMaCCY1zeSpPPxCJ35Iaa7eZBPgZDZD'
  }
}
