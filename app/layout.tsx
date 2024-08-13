import {
  ClerkProvider
} from '@clerk/nextjs'
import './globals.css'
import PageHeader from '@/components/page-header'
import PageFooter from '@/components/page-footer'
import Script from 'next/script'

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
          <Script src="https://voix-widget.vercel.app/widget.umd.js"></Script>
          {/* @ts-ignore */}
          <my-widget project-id="1"></my-widget>
          <PageFooter />
        </body>
      </html>
    </ClerkProvider>
  )
}