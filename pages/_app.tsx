import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import EditModal from '@/components/modals/EditModal'

import EditPostModal from '@/components/modals/EditPostModal'
import EditCommentModal from '@/components/modals/EditCommentModal'
import Provider from '@/components/Provider'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <EditPostModal />
      <EditCommentModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
