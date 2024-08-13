import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs'
import { Github, LogIn } from 'lucide-react'
import Image from 'next/image'

function LandingHero() {
  return (
    <section className="grow">
      <div className="container mx-auto px-4 mb-24 mt-12 flex flex-col md:flex-row">
        <div className="max-w-sm flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="mb-5 text-5xl font-extrabold leading-tight">Collect your feedback seamlessly</h1>
            <p className="text-gray-500 text-lg">Easily integrate Voix and start collecting feedback today.</p>
          </div>
          <div>
            <SignedOut>
              <SignUpButton>
                <div className="space-x-3">
                  <Button>
                    <LogIn className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                  <Button variant="secondary" asChild>
                    <Link href="https://github.com/" target="_blank">
                      <Github className="w-4 h-4 mr-2" />
                      Github
                    </Link>
                  </Button>
                </div>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
            </SignedIn>
          </div>
        </div>
        <div className="flex-1">
          <Image src="/demo.gif" alt="Hero" layout="responsive" width="175" height="175" unoptimized={true} />
        </div>
      </div>
    </section>
  )
}

export default LandingHero