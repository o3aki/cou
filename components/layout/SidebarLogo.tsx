import Image from 'next/image'
import { useRouter } from 'next/router'

const SidebarLogo = () => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push('/')}
      className="
    rounded-xl
    h-20
    w-20
    p-4
    flex
    items-center
    justify-center
    hover:bg-blue-300
    hover:bg-opacity-10
    cursor-pointer
    transition"
    >
      <Image width={100} height={100} src="/COU.svg" alt="Logo" />
    </div>
  )
}

export default SidebarLogo
