import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import pool from '@/lib/db';
import { User, Mail, Calendar, Settings } from 'lucide-react';

export default async function Profile() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth-token')?.value;

  if (!userId) {
    redirect('/login');
  }

  // Fetch user from DB
  const [rows] = await pool.query('SELECT name, email, created_at FROM users WHERE id = ?', [userId]);
  const users = rows as any[];

  if (users.length === 0) {
    // Cookie invalid
    redirect('/login');
  }

  const user = users[0];
  const joinedDate = new Date(user.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="flex-1 bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Cover */}
          <div className="h-32 bg-primary w-full relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>
          
          <div className="px-8 pb-8 relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-8">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white flex items-center justify-center text-primary shadow-lg">
                <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center">
                  <User size={40} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 pb-6">
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-primary px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                <Settings size={16} className="mr-2" /> Edit Profil
              </button>
            </div>

            {/* User Info */}
            <div className="mt-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Alamat Email</p>
                    <p className="text-lg text-gray-900 font-semibold">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Bergabung Sejak</p>
                    <p className="text-lg text-gray-900 font-semibold">{joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-200" />

            {/* Statistik/Info Tambahan */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Informasi Akun</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Status Akun</p>
                    <p className="text-xl font-bold text-green-600 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Aktif
                    </p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Paket Saat Ini</p>
                    <p className="text-xl font-bold text-primary">Gratis (MVP)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
