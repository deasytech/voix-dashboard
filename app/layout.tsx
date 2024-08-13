import {
  ClerkProvider
} from '@clerk/nextjs'
import './globals.css'
import PageHeader from '@/components/page-header'
import PageFooter from '@/components/page-footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <PageHeader />
          {children}
          <PageFooter />
        </body>
      </html>
    </ClerkProvider>
  )
}