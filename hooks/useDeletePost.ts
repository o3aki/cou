import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

import axios, { AxiosRequestConfig } from 'axios'

import usePost from './usePost'
import usePosts from './usePosts'
import useCurrentUser from './useCurrentUser'

const useDeletePost = ({ userId }: { userId: string }) => {
  const searchParams = useSearchParams()

  const postId: any = searchParams?.get('postId')
  const { data: currentUser } = useCurrentUser()

  const { data: post, mutate: mutateFetchedPost } = usePost(postId)
  const { mutate: mutateFetchedPosts } = usePosts(userId as string)

  const requestConfig: AxiosRequestConfig = {}
  requestConfig.data = { postId: postId }

  const deletePost = useCallback(async () => {
    try {
      await axios.delete(`/api/posts/delete?postId=${postId}`, requestConfig)

      mutateFetchedPost()
      mutateFetchedPosts()
    } catch (error) {
      console.log(error)
    }
  }, [postId, currentUser, post])

  return { deletePost }
}

export default useDeletePost
