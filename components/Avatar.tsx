import useUser from '@/hooks/useUser'

import { useCallback } from 'react'
import { useRouter } from 'next/router'

import Image from 'next/image'

interface AvatarProps {
  userId: string
  isLarge?: boolean
  hasBorder?: boolean
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId)
  const router = useRouter()

  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation()

      const url = `/users/${userId}`

      router.push(url)
    },
    [router, userId]
  )

  return (
    <div
      className={` 
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-28' : 'h-10'}
        ${isLarge ? 'w-28' : 'w-10'}
        rounded-full
        hover:opacity-70
        transition
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '25%',
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || '/images/placeholder.png'}
      />
    </div>
  )
}

export default Avatar
