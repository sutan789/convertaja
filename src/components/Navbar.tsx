import { cookies } from 'next/headers';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('auth-token');

  // Server action to clear cookie
  async function handleLogout() {
    'use server';
    const cookiesList = await cookies();
    cookiesList.delete('auth-token');
  }

  return <NavbarClient isLoggedIn={isLoggedIn} logoutAction={handleLogout} />;
}
