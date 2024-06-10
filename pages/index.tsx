import Header from '@/components/layout/Header'
import Form from '@/components/Form'
import PostFeed from '@/components/posts/PostFeed'

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
