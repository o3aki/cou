import useCurrentUser from '@/hooks/useCurrentUser'
import useNotification from '@/hooks/useNotifications'
import React, { useEffect } from 'react'
import SidebarLogo from '@/components/layout/SidebarLogo'

interface NotificationFeedProps {}

const NotificationsFeed: React.FC<NotificationFeedProps> = ({}) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
  const { data: fetchedNotifications = [] } = useNotification(currentUser?.id)

  useEffect(() => {
    mutateCurrentUser()
  }, [])

  if (fetchedNotifications.length === 0) {
    return (
      <div className="text-greySome text-center p-6 text-xl">
        No Notifications
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-greyBorder"
        >
          <SidebarLogo />
          <p className="text-textWhite">{notification.body}</p>
        </div>
      ))}
    </div>
  )
}

export default NotificationsFeed
