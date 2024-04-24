import { navLinks } from '@/constants';
import Link from 'next/link';
import { useState } from 'react';
import { CgClose, CgMenuGridO } from 'react-icons/cg';
import { FaFacebookSquare } from 'react-icons/fa';
import {
  FaSquareInstagram,
  FaSquareSnapchat,
  FaSquareXTwitter,
} from 'react-icons/fa6';
import Route from '../ui/Route';
import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';

const MobileMenu: React.FC<{ user: User }> = ({ user }) => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const pathname = usePathname();

  return (
    <>
      <div className="lg:hidden" onClick={mobileMenuHandler}>
        {openMobileMenu ? (
          <CgClose size={25} className="cursor-pointer" />
        ) : (
          <CgMenuGridO size={25} className="cursor-pointer" />
        )}
      </div>

      {openMobileMenu ? (
        <div
          className="fixed w-full h-screen top-0 left-0 bg-black/25 z-50 lg:hidden"
          onClick={() => setOpenMobileMenu(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute h-screen left-0 top-0 w-60 bg-white z-[999] px-5 border-r overflow-y-hidden flex flex-col gap-10"
          >
            <div className="border-b py-5 text-center">
              <Link href="/">
                <h1 className="text-3xl font-extrabold text-secondary">
                  <span className="text-primary">X</span>PLORE
                </h1>
              </Link>

              <div className="flex gap-5 text-secondary flex-1 justify-center text-xl mt-5">
                <FaFacebookSquare className="cursor-pointer" />
                <FaSquareInstagram className="cursor-pointer" />
                <FaSquareXTwitter className="cursor-pointer" />
                <FaSquareSnapchat className="cursor-pointer" />
              </div>
            </div>

            <ul className="flex items-center justify-center gap-5 flex-col mt-5 py-10 border-b">
              {navLinks.map((link, index) => (
                <Route
                  isActive={
                    (pathname.includes(link.route) && link.route.length > 1) ||
                    pathname === link.route
                  }
                  label={link.label}
                  route={link.route}
                  key={index}
                  onClick={() => setOpenMobileMenu(false)}
                />
              ))}
            </ul>

            {!user && (
              <div className="flex gap-5 flex-1 flex-col py-5">
                <Button
                  text="Log In"
                  onClick={() => null}
                  aria="Login Button"
                />
                <Button
                  text="Sign Up"
                  onClick={() => null}
                  aria="Signup Button"
                />
              </div>
            )}

            {user && (
              <div>
                <ul className="flex flex-col  gap-5 items-center">
                  <Link
                    href="/create"
                    onClick={() => setOpenMobileMenu(false)}
                    className="cursor-pointer"
                  >
                    <li>Create a Post</li>
                  </Link>
                  <Link
                    href="/userposts"
                    onClick={() => setOpenMobileMenu(false)}
                    className="cursor-pointer"
                  >
                    <li>My Post(s)</li>
                  </Link>

                  <li className="cursor-pointer" onClick={() => signOut()}>
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileMenu;

// We added onClick={(e) => e.stopPropagation()} to our mobile menu div so that the menu does not close when we click
// anywhere inside of it (when the menu is opened), but closes when we click outside of the div.
