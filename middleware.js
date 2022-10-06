import { withClerkMiddleware, getAuth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Set the paths that don't require the user to be signed in
const publicPaths = ['/sign-in', '/sign-up']

export default withClerkMiddleware(req => {
  console.log(req.nextUrl.pathname)
  if (
    publicPaths.some(path => req.nextUrl.pathname.startsWith(path)) ||
    req.nextUrl.pathname === '/'
  ) {
    return NextResponse.next()
  }
  const { userId } = getAuth(req)
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }
  return NextResponse.redirect(new URL('/sign-in', req.url))
})

export const config = { matcher: '/((?!_next|static|.*\\..*).*)' }
