import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import HeadeerMenu from './header-menu'

const PageHeader = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 transition-all w-full bg-white/20 backdrop-blur-md">
      <div className="w-full max-w-screen-xl mx-auto px-2.5 lg:px-20 relative border-b">
        <div className="flex h-[65px] items-center justify-between">
          <Link href="/">
            <Image src="/voix-logo.png" alt="Voix Logo" width={80} height={80} />
          </Link>
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton>
                <Button className="mr-2">Sign in</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant="outline">Sign up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <HeadeerMenu />
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  )
}

export default PageHeader