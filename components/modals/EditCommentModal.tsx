import { useCallback, useEffect, useState } from 'react'
import Modal from '../Modal'
import { toast } from 'react-hot-toast'
import usePosts from '@/hooks/usePosts'
import usePost from '@/hooks/usePost'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import useComment from '@/hooks/useEditComment'

const EditCommentModal = () => {
  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: mutatePosts } = usePosts('')

  const searchParams = useSearchParams()

  const postId: any = searchParams?.get('postId')

  const { data: fetchedPost, mutate: mutatePost } = usePost(postId)
  console.log(fetchedPost)

  const editComment = useComment()

  useEffect(() => {
    setBody(fetchedPost?.body)
  }, [postId])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <textarea
        disabled={isLoading}
        onChange={(event) => setBody(event.target.value)}
        value={body}
        className="
                disabled:opacity-80
                peer
                resize-none
                mt-3
                w-full
                bg-globalDark
                ring-0
                outline-none
                text-[20px]
                placeholder-greySome
                text-textWhite
              "
        placeholder={'Edit your comment!'}
      ></textarea>
      <hr
        className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                w-full
                border-greyBorder
                transition"
      />
    </div>
  )

  const onSubmit = useCallback(async () => {
    setIsLoading(true)

    try {
      await axios.patch(`/api/comments/edit?commentId=${postId}`, {
        body,
        postId,
      })

      mutatePost()
      mutatePosts()
      toast.success('Comment edited successfully!')
      editComment.onClose()
    } catch (error) {
      console.log(error)
      toast.error('Unable to edit comment')
    } finally {
      setIsLoading(false)
    }
  }, [body, mutatePost, mutatePosts, fetchedPost])

  return (
    <Modal
      disabled={isLoading}
      isOpen={editComment.isOpen}
      title="Edit your comment tweet"
      actionLabel="Edit"
      onClose={editComment.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditCommentModal
