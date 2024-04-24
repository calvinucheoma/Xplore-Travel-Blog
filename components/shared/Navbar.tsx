'use client';

import { navLinks } from '@/constants';
import Link from 'next/link';
import Route from '../ui/Route';
import Button from '../ui/Button';
import { usePathname, useRouter } from 'next/navigation';
import MobileMenu from './MobileMenu';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { User } from '@prisma/client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

interface NavbarProps {
  user: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const pathname = usePathname();

  const [isScrolling, setIsScrolling] = useState(false);

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={clsx(
        'py-4 w-full',
        isScrolling ? 'fixed top-0 bg-white shadow-lg z-10' : 'relative'
      )}
    >
      <div
        className={clsx(
          'mx-auto w-[95%] max-w-[1450px] flex items-center justify-between border-b border-gray-100',
          isScrolling && 'pb-0 border-none',
          !isScrolling && 'pb-5'
        )}
      >
        <div className="flex-1">
          <Link href="/">
            <h1 className="text-3xl font-extrabold text-secondary">
              <span className="text-primary">X</span>PLORE
            </h1>
          </Link>
        </div>

        <ul className="flex items-center justify-center gap-16 flex-2 max-lg:hidden">
          {navLinks.map((link, index) => {
            // const isActive = useMenuActive(link.route);

            return (
              <li
                key={index}
                className="transform transition duration-500 ease-in-out hover:scale-110"
              >
                <Route
                  isActive={
                    (pathname.includes(link.route) && link.route.length > 1) ||
                    pathname === link.route
                  }
                  label={link.label}
                  route={link.route}
                  key={index}
                />
              </li>
            );
          })}
        </ul>

        {!user && (
          <div className="flex gap-5 flex-1 justify-end max-lg:hidden">
            <Button
              text="Log In"
              onClick={() => router.push('/access')}
              aria="Login Button"
            />
            <Button
              text="Sign Up"
              onClick={() => router.push('/access')}
              aria="Signup Button"
            />
          </div>
        )}

        {user && (
          <div className="flex gap-5 items-center flex-1 justify-end max-md:hidden">
            <h1>{user.name}</h1>
            <Image
              src={user.image as string}
              alt={`Image of ${user.name}`}
              width={50}
              height={50}
              className="rounded-full border-4 border-primary cursor-pointer"
              onClick={() => setOpenUserMenu(!openUserMenu)}
            />
          </div>
        )}

        {openUserMenu && (
          <ul className="z-10 absolute right-12 w-48 top-[70px] bg-white shadow-md rounded-md py-4 px-2">
            <Link href="/create" onClick={() => setOpenUserMenu(false)}>
              <li className="hover:bg-gray-200 p-2 rounded-lg">
                Create a post
              </li>
            </Link>

            <Link href="/userposts" onClick={() => setOpenUserMenu(false)}>
              <li className="hover:bg-gray-200 p-2 rounded-lg">My posts</li>
            </Link>

            <li
              onClick={() => signOut()}
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              Sign out
            </li>
          </ul>
        )}

        <div>
          <MobileMenu user={user} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
