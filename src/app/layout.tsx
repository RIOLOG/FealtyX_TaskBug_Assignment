// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { Providers } from '../redux/provider'
import { Toaster } from 'react-hot-toast';


export const metadata = {
  title: 'FealtyX  Bug Tracker Ankit Singh',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right" 
            reverseOrder={false}
            toastOptions={{
              className: '',
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
