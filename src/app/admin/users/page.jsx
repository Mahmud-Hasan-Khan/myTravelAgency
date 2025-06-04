'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const fetcher = (url) => fetch(url).then((res) => {
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
});

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: users, error, isLoading, mutate } = useSWR('/api/admin/users', fetcher);
  const [promotingId, setPromotingId] = useState(null);

  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  const handleUserStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'blocked' ? 'unblocked' : 'blocked';

    try {
      const res = await fetch(`/api/admin/users/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status')
      toast.success(`User ${newStatus === 'blocked' ? 'blocked' : 'unblocked'}`);
      mutate();
    } catch (err) {
      console.error(err);
      toast.error('Error updating user status');
    }
  };

  const promoteToAdmin = async (id) => {
    setPromotingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin' }),
      });

      if (!res.ok) throw new Error('Failed to update role');
      toast.success('User promoted to admin');
      mutate(); // revalidate SWR cache
    } catch (err) {
      console.error(err);
      toast.error('Error promoting user');
    } finally {
      setPromotingId(null);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Failed to load users</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#6AD0FF] text-[#000000] uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">S.No</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
              <th className="px-4 py-2 text-sm font-medium text-center">Role</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y-2 divide-gray-100">
            {users?.map((user, index) => (
              <tr key={user._id}
                className='hover:bg-[#C8EEFF] transition duration-200 ease-in-out'>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize text-center">
                  {user.role} <br />
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => promoteToAdmin(user._id)}
                      disabled={promotingId === user._id}
                      className="text-green-600 hover:underline text-sm"
                    >
                      {promotingId === user._id ? 'Promoting...' : 'Make Admin'}
                    </button>
                  )}
                </td>
                <td className="px-4 py-2 capitalize">
                  <button
                    onClick={() => handleUserStatus(user._id, user.status)}
                    className={`${user.status === 'blocked' ? 'text-green-600' : 'text-red-600'
                      } hover:underline text-sm`}
                  >
                    {user.status === 'blocked' ? 'Unblock' : 'Block'}
                  </button>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => router.push(`/admin/users/${user._id}`)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Details
                  </button>


                  <button
                    onClick={() => toast('Edit feature coming soon')}
                    className="text-yellow-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toast('Delete feature coming soon')}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
