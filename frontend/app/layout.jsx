import { Layout } from '@/components/dom/Layout'
import { BookProvider } from '@/context/BookProvider'
import { UserProvider } from '@/context/UserProvider'
import '@/global.css'

import localFont from '@next/font/local'

const jeju = localFont({
  src: '../public/fonts/jeju.ttf',
  variable: '--font-jeju',
})

const gelio = localFont({
  src: '../public/fonts/gelio.ttf',
  variable: '--font-gelio',
})

export const metadata = {
  title: 'Next.js + Three.js',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className={`antialiased ${jeju.variable} ${gelio.variable} font-texto`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <UserProvider>
          <BookProvider>
            <Layout>{children}</Layout>
          </BookProvider>
        </UserProvider>
      </body>
    </html>
  )
}
