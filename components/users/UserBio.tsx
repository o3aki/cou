import React, { useMemo } from 'react'
import { BiCalendar } from 'react-icons/bi'
import { format } from 'date-fns'

import useCurrentUser from '@/hooks/useCurrentUser'
import useUser from '@/hooks/useUser'
import useEditModal from '@/hooks/useEditModal'
import useFollow from '@/hooks/useFollow'

import Button from '../Button'

interface UserBioProps {
  userId: string
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser()
  const { data: fetchedUser } = useUser(userId)

  const editModal = useEditModal()

  const { isFollowing, toggleFollow } = useFollow(userId)

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy')
  }, [fetchedUser?.createdAt])

  return (
    <div className="border-[1px] border-greyDark pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            secondary={!isFollowing}
            label={isFollowing ? 'Unfollow' : 'Follow'}
            onClick={toggleFollow}
            outline={isFollowing}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-textWhite text-xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-columbia opacity-50">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-textWhite text-sm">{fetchedUser?.bio}</p>
          <div
            className="
              flex
              flex-row
              items-center
              gap-2
              mt-4
              text-greySome
              opacity-80
            "
          >
            <BiCalendar size={20} />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-textWhite">
              {fetchedUser?.followingIds?.length}
            </p>
            <p className="text-greySome text-sm">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-textWhite">{fetchedUser?.followerCount || 0}</p>
            <p className="text-greySome text-sm">Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBio
