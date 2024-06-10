import React from 'react'
import Sidebar from './layout/Sidebar'
import FollowBar from './layout/FollowBar'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-globalDark">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-1 lg:col-span-2 border-x-[1px] border-greyBorder">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  )
}

export default Layout
