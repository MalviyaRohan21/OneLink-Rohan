import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import LogoutButton from './buttons/LogoutButton';
import Image from 'next/image';

export default async function Header(){
    const session = await getServerSession(authOptions);
    return(
    <header className="bg-white border-b flex justify-between p-2">
        
    <div className="flex items-center gap-0 px-0 -ml-2">
          <Link href={'/'} className="flex items-center gap-2 text-blue-700">
          <div className="logo-container" style={{ width: '140px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
                src="/oneLINK.png" 
                alt="Logo"
                width={160} 
                height={140} 
                className="logo-image"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
           </div>
          </Link>
        <nav className="flex items-center gap-4 text-slate-500 text-s">
         <Link href={'/about'}>About</Link>
         <Link href={'/pricing'}>Pricing</Link>
         <Link href={'/contact'}>Contact</Link>
        </nav>
    </div>

        <nav className="flex items-center gap-4 text-s text-slate-500">
        {!!session && (
            <>
            <Link href={'/account'}>
                Hello, {session?.user?.name}
            </Link>
            <LogoutButton />
            </>
        )}
        {!session && (
            <>
            <Link href={'/login'}>Sign In</Link>
            <Link href={'/login'}>Create Account</Link>
            </>
        )}
        </nav>
       
    </header>

    );
}
