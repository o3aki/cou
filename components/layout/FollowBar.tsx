import useUsers from '@/hooks/useUsers'
import Avatar from '../Avatar'

const FollowBar = () => {
  const { data: users = [] } = useUsers()

  if (users.length === 0) {
    return null
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4 bg-greyDark">
        <h2 className="text-xl font-semibold text-center text-textWhite">
          Who to Follow
        </h2>
        <div className="flex flex-col gap-6 mt-4">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="font-semibold text-sm text-textWhite">
                  {user.name}
                </p>
                <p className="text-sm text-columbia opacity-50">
                  @{user.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FollowBar
