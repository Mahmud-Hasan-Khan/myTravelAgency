'use client';

import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FaUserShield, FaUserAltSlash, FaSearch, FaEdit, FaTrash, FaLock, FaUnlock } from 'react-icons/fa';
import { showConfirmToast } from '../../components/shared/ConfirmToast/ConfirmToast';

const fetcher = (url) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  });

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { data: users, error, isLoading, mutate } = useSWR('/api/admin/users', fetcher);

  if (!session || !session.user || session.user.role !== 'admin') {
    redirect('/unauthorized');
  }

  const updateRole = async (id, newRole) => {
    const res = await fetch(`/api/admin/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    if (!res.ok) throw new Error('Failed to update role');
    mutate();
    toast.success(`User role updated to ${newRole}`);
  };

  const updateStatus = async (id, newStatus) => {
    if (!['blocked', 'unblocked'].includes(newStatus)) {
      return toast.error('Invalid status value');
    }

    const res = await fetch(`/api/admin/users/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    mutate();
    toast.success(`User status changed to ${newStatus}`);
  };

  const deleteUser = async (id) => {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete user');
    mutate();
    toast.success('User deleted');
  };

  const handleRoleChange = (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    showConfirmToast({
      message: `Are you sure you want to change role to ${newRole}?`,
      onConfirm: () => updateRole(id, newRole),
      toastId: `role-${id}`,
    });
  };

  const handleStatusChange = (id, currentStatus) => {
    const newStatus = currentStatus === 'blocked' ? 'unblocked' : 'blocked';
    showConfirmToast({
      message: `Are you sure you want to ${newStatus} this user?`,
      onConfirm: () => updateStatus(id, newStatus),
      toastId: `status-${id}`,
    });
  };

  const handleDelete = (id) => {
    showConfirmToast({
      message: 'Are you sure you want to delete this user?',
      onConfirm: () => deleteUser(id),
      toastId: `delete-${id}`,
    });
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Failed to load users</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto w-full border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
          <thead className="bg-[#6AD0FF] text-[#000000] uppercase text-xs sm:text-sm">
            <tr>
              <th className="px-4 py-2 text-left">S.No</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users?.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-[#C8EEFF] transition">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize text-center">
                    <button
                      onClick={() => handleRoleChange(user._id, user.role)}
                      className={`text-sm flex items-center justify-center gap-1 ${
                        user.role === 'admin' ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {user.role === 'admin' ? <FaUserAltSlash /> : <FaUserShield />}
                      <span className="hidden sm:inline">
                        {user.role === 'admin' ? 'Make Normal User' : 'Make Admin'}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-2 capitalize">
                    <button
                      onClick={() => handleStatusChange(user._id, user.status)}
                      className={`text-sm flex items-center gap-1 ${
                        user.status === 'blocked' ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {user.status === 'blocked' ? <FaUnlock /> : <FaLock />}
                      {user.status === 'blocked' ? 'Unblock the user' : 'Block the user'}
                    </button>
                  </td>
                  <td className="px-4 py-2 space-x-2 flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => router.push(`/admin/users/${user._id}`)}
                      className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Details</span>
                      <FaSearch size={16} />
                    </button>

                    <button
                      onClick={() => toast.info('Edit feature coming soon')}
                      className="text-yellow-600 hover:underline text-sm flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Edit</span>
                      <FaEdit size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:underline text-sm flex items-center gap-1"
                    >
                      <span className="hidden sm:inline">Delete</span>
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
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
