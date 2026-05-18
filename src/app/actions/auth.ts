'use server';

import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginWithEmail(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Email dan password harus diisi' };
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    const users = rows as any[];

    if (users.length === 0) {
      return { error: 'Email tidak ditemukan' };
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { error: 'Password salah' };
    }

    // Set cookie jika sukses
    const cookieStore = await cookies();
    cookieStore.set('auth-token', user.id.toString(), {
      path: '/',
      maxAge: 86400, // 1 hari
      httpOnly: true,
      sameSite: 'lax',
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Terjadi kesalahan sistem' };
  }
}
