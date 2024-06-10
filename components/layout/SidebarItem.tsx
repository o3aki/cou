import { IconType } from 'react-icons'
import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import { BsDot } from 'react-icons/bs'

interface SidebarItemProps {
  label: string
  href?: string
  icon: IconType
  onClick?: () => void
  auth?: boolean
  alert?: boolean
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  onClick,
  icon: Icon,
  auth,
  alert,
}) => {
  const loginModal = useLoginModal()
  const { data: currentUser } = useCurrentUser()
  const router = useRouter()
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick()
    }
    if (auth && !currentUser) {
      loginModal.onOpen()
    } else if (href) {
      router.push(href)
    }
  }, [router, onClick, href, currentUser, auth, loginModal])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div
        className="
      relative
      rounded-xl
      h-14
      w-14
      flex
      items-center
      justify-center
      p-4
      hover:bg-greyDark
      hover:bg-opacity-100
      cursor-pointer
      lg:hidden
      "
      >
        <Icon size={20} className="text-textWhite" />
        {alert ? (
          <BsDot className="text-mainColorr absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
      <div
        className="
      relative
      hidden
      lg:flex
      items-center
      gap-4
      p-4
      rounded-xl
      hover:bg-greyDark
      hover:bg-opacity-100
      cursor-pointer
      "
      >
        <Icon size={20} className="text-textWhite" />
        <p className="hidden lg:block text-textWhite text-lg">{label}</p>
        {alert ? (
          <BsDot className="text-mainColorr absolute -top-4 left-0" size={70} />
        ) : null}
      </div>
    </div>
  )
}

export default SidebarItem
