import React, { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { formatDistanceToNowStrict } from 'date-fns'

import useLoginModal from '@/hooks/useLoginModal'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLike from '@/hooks/useLike'

import Avatar from '@/components/Avatar'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import useDeletePost from '@/hooks/useDeletePost'
import useEditPostModal from '@/hooks/useEditPostModal'

interface PostItemProps {
  data: Record<string, any>
  userId?: string
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const loginModal = useLoginModal()
  const router = useRouter()
  const { data: currentUser } = useCurrentUser()

  const [otherMenu, setOtherMenu] = useState(false)

  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId })

  const { deletePost } = useDeletePost({
    userId: currentUser?.id,
  })

  const editPostModal = useEditPostModal()

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation()

      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id]
  )

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`)
  }, [router, data.id])

  const onLike = useCallback(
    (e: any) => {
      e.stopPropagation()

      if (!currentUser) {
        loginModal.onOpen()
      }

      toggleLike()
    },
    [loginModal, currentUser, toggleLike]
  )

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null
    }

    return formatDistanceToNowStrict(new Date(data.createdAt))
  }, [data?.createdAt])

  const handleDelete = useCallback(
    (e: any) => {
      e.stopPropagation()
      if (data.userId !== currentUser.id) {
        toast.error('Not allowed')
        return
      }
      deletePost()

      router.push('/')
      toast.success('Post deleted')
    },
    [otherMenu]
  )

  return (
    <div
      className="border-b-[1px] border-greyBorder p-5 cursor-pointer hover:bg-greyDark transition w-full"
      onClick={goToPost}
    >
      <div className="flex flex-row items-start gap-3 ">
        <Avatar userId={data.user.id} />
        <div className="w-full">
          <div className="flex flex-row space-between items-center w-full">
            <div className="flex flex-row items-center gap-2">
              <p
                onClick={goToUser}
                className="text-textWhite text-sm font-semibold cursor-pointer hover:opacity-90"
              >
                {data.user.name}
              </p>
              <span
                onClick={goToUser}
                className="text-columbia opacity-50 text-xs cursor-pointer hover:opacity-90 hidden md:block"
              >
                @{data.user.username}
              </span>
              <span className="text-greySome text-sm">{createdAt}</span>
            </div>
            <div className="relative ml-auto">
              <BsThreeDotsVertical
                size={20}
                className="text-textWhite"
                onClick={() => setOtherMenu((prev) => !prev)}
              />
              {otherMenu && (
                <div className="absolute mt-3 mr-20 p-2 rounded-md bg-greySome flex flex-col z-50">
                  <span
                    className="text-semibold p-2 hover:bg-greyDark hover:text-textWhite rounded-md"
                    onClick={editPostModal.onOpen}
                  >
                    Edit
                  </span>
                  <span
                    className="text-mainColorr font-semibold p-2 hover:text-mainColorr hover:bg-greyDark rounded-md"
                    onClick={handleDelete}
                  >
                    Delete
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="text-textWhite text-sm mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-greySome gap-2 cursor-pointer transition hover:text-columbia">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-greySome gap-2 cursor-pointer transition hover:text-mainColorr"
            >
              {hasLiked ? (
                <AiFillHeart size={20} className="text-mainColorr" />
              ) : (
                <AiOutlineHeart size={20} />
              )}
              <p>{data.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem
