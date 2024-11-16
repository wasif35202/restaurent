// UsersPage.tsx

import Wrapper from '@/Components/Wrapper';
import { UserType } from '@/types/dbTypesClient'; // Import UserType from types file
import Image from 'next/image';

const getUsers = async () => {
  const res = await fetch('http://localhost:3000/admin/users/api', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

const UsersPage = async () => {
  let users: UserType[] = [];

  try {
    users = await getUsers();
  } catch (error) {
    console.error('Failed to load users:', error);
  }

  return (
    <Wrapper className="bg-gray-50 p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">User Details</h1>
      {users?.map(user => (
        <div key={user.id} className="mb-6 rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center">
            {user.image ? (
              <Image
                width={100}
                height={100}
                src={user.image}
                alt={`${user.name ?? 'User'}'s profile`}
                className="mr-4 h-12 w-12 rounded-full"
              />
            ) : (
              <div className="mr-4 h-12 w-12 rounded-full bg-gray-200" />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.name ?? 'No name provided'}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <p className="mb-4 text-sm text-gray-500">
            <strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}
          </p>
          <p className="mb-4 text-sm text-gray-500">
            <strong>Created At:</strong>{' '}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="mb-4 text-sm text-gray-500">
            <strong>Updated At:</strong>{' '}
            {new Date(user.updatedAt).toLocaleDateString()}
          </p>

          {/* Orders */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
            {user.Order && user.Order.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {user.Order.map(order => (
                  <li key={order.id} className="rounded-lg bg-gray-100 p-4">
                    <p className="text-sm text-gray-600">
                      <strong>Order ID:</strong> {order.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Price:</strong> ${order.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Intent:</strong> {order.intent_Id}
                    </p>

                    <p className="text-sm text-gray-600">
                      <strong>Created At:</strong>{' '}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">No orders available</p>
            )}
          </div>

          {/* Accounts */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Accounts</h3>
            {user.accounts?.length ? (
              <ul className="mt-2 space-y-2">
                {user.accounts.map(account => (
                  <li
                    key={account.providerAccountId}
                    className="rounded-lg bg-gray-100 p-4"
                  >
                    <p className="text-sm text-gray-600">
                      <strong>Provider:</strong> {account.provider}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Type:</strong> {account.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Created At:</strong>{' '}
                      {new Date(account.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                No accounts available
              </p>
            )}
          </div>

          {/* Sessions */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Sessions</h3>
            {user.sessions?.length ? (
              <ul className="mt-2 space-y-2">
                {user.sessions.map(session => (
                  <li
                    key={session.sessionToken}
                    className="rounded-lg bg-gray-100 p-4"
                  >
                    <p className="text-sm text-gray-600">
                      <strong>Session Token:</strong> {session.sessionToken}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Expires:</strong>{' '}
                      {new Date(session.expires).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                No sessions available
              </p>
            )}
          </div>

          {/* Authenticators */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Authenticators
            </h3>
            {user.Authenticators?.length ? (
              <ul className="mt-2 space-y-2">
                {user.Authenticators.map(authenticator => (
                  <li
                    key={authenticator.credentialID}
                    className="rounded-lg bg-gray-100 p-4"
                  >
                    <p className="text-sm text-gray-600">
                      <strong>Device Type:</strong>{' '}
                      {authenticator.credentialDeviceType}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Backed Up:</strong>{' '}
                      {authenticator.credentialBackedUp ? 'Yes' : 'No'}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                No authenticators available
              </p>
            )}
          </div>
        </div>
      ))}
    </Wrapper>
  );
};

export default UsersPage;
