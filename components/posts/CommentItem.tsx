import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'

import Avatar from '../Avatar'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { toast } from 'react-hot-toast'

import useDeletePost from '@/hooks/useDeletePost'
import useCurrentUser from '@/hooks/useCurrentUser'
import useEditComment from '@/hooks/useEditComment'

interface CommentItemProps {
  data: Record<string, any>
  commentId: String
}

const CommentItem: React.FC<CommentItemProps> = ({ data, commentId }) => {
  const router = useRouter()
  const [otherMenu, setOtherMenu] = useState(false)
  const { data: currentUser } = useCurrentUser()
  const editComment = useEditComment()

  const { deletePost } = useDeletePost({
    userId: currentUser?.id,
  })

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation()

      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id]
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
    <div className="border-b-[1px] border-greyBorder p-5 cursor-pointer hover:bg-greyDark transition">
      <div className="flex flex-row items-start gap-3 ">
        <Avatar userId={data.user.id} />
        <div className="w-full">
          <div className="flex flex-row space-between ">
            <div className="flex flex-row items-center gap-2">
              <p
                onClick={goToUser}
                className="text-textWhite text-sm font-semibold cursor-pointer hover:text-opacity-90"
              >
                {data.user.name}
              </p>
              <span
                onClick={goToUser}
                className="text-columbia opacity-50 text-sm cursor-pointer hover:underline hidden md:block"
              >
                @{data.user.username}
              </span>
              <span className="text-greySome text-xs">{createdAt}</span>
            </div>
            <div className="relative ml-auto">
              <BsThreeDotsVertical
                size={20}
                color="gray"
                onClick={() => setOtherMenu((prev) => !prev)}
              />
              {otherMenu && (
                <div className="absolute mt-3 mr-20 p-2 rounded-xl bg-greySome flex flex-col z-50">
                  <span
                    className="font-semibold p-2 hover:bg-greyDark hover:text-textWhite rounded-lg"
                    onClick={editComment.onOpen}
                  >
                    Edit
                  </span>
                  <span
                    className="text-mainColorr font-semibold p-2 hover:text-textWhite hover:bg-greyDark rounded-lg"
                    onClick={handleDelete}
                  >
                    Delete
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="text-textWhite mt-1 text-xs">{data.body}</div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
