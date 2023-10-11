import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ReduxProvider } from '@/redux/provider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrendZ',
  description: 'Cloth shopping website',
  keywords: ['clothes wear', 'clothes', 'shop', 'buy', 'cart'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="images/shirt.png" sizes='128x128'/>
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <Navbar />
          {children}
          <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  )
}
