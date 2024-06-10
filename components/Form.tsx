import React, { useCallback, useState } from 'react'

import axios from 'axios'
import { toast } from 'react-hot-toast'

import usePosts from '@/hooks/usePosts'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import usePost from '@/hooks/usePost'

import Button from '@/components/Button'
import Avatar from '@/components/Avatar'

interface FormProps {
  placeholder?: string
  isComment?: boolean
  postId?: string
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const { data: currentUser } = useCurrentUser()
  const { mutate: mutatePosts } = usePosts(postId as string)

  const { mutate: mutatePost } = usePost(postId as string)

  const [body, setBody] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts'

      await axios.post(url, { body })
      toast.success('Post added successfully.')

      setBody('')
      mutatePosts()
      mutatePost()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [body, mutatePosts, isComment, postId, mutatePost])

  return (
    <div className="border-b-[1px] border-greySome px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(e) => setBody(e.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none
                mt-2
                w-full
                bg-globalDark
                ring-0
                outline-none
                text-[16px]
                placeholder-greySome
                text-textWhite
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                opacity-0
                peer-focus:opacity-100
                h-[1px]
                border-greySome
                transition
              "
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                label="Cou"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-textWhite text-xl text-center mb-4 font-bold">
            Welcome to CouCou
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button secondary label="Register" onClick={registerModal.onOpen} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
