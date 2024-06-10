import { FaFeather } from 'react-icons/fa6'
import { useCallback } from 'react'
import { useRouter } from 'next/router'

import useLoginModal from '../../hooks/useLoginModal'

const SidebarCouButton = () => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const onClick = useCallback(() => {
    loginModal.onOpen()
  }, [loginModal, router])

  return (
    <div onClick={onClick}>
      <div
        className="
        mt-6
        lg:hidden
        rounded-xl
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center
        bg-secondaryColor
        hover:bg-opacity-80
        transition
        cursor-pointer
      "
      >
        <FaFeather size={24} className="h-6 w-6" />
      </div>
      <div
        className="
        mt-6
        hidden
        lg:block
        px-4
        py-2
        bg-mainColorr
        opacity-90
        rounded-xl
        hover:bg-opacity-80
        transition
        cursor-pointer
      "
      >
        <p className="hidden lg:block text-textWhite text-center font-semibold text-[20px]">
          Cou
        </p>
      </div>
    </div>
  )
}

export default SidebarCouButton
