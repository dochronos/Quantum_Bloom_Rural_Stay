import dynamic from 'next/dynamic';

const ManageUsers = dynamic(() => import('./ManageUsers'), { ssr: false });

export default function ManageUsersPage() {
  return <ManageUsers />;
}
