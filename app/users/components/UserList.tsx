'use client';

import { User } from '@prisma/client';
import UserBox from './UserBox';
import Back from '@/components/Back';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <aside className="fixed inset-y-0 bg-white pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-0 border-b">
        <div className="flex-col">
          <Back title={'People'} />
          {/*<div className="text-2xl font-bold text-neutral-800 py-4">People</div>*/}
        </div>
      </div>

      {users.map((user) => (
        <UserBox key={user.id} user={user} />
      ))}
    </aside>
  );
};
export default UserList;
