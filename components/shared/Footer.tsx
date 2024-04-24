'use client';

import Link from 'next/link';
import Route from '../ui/Route';
import { navLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import { FaFacebookSquare } from 'react-icons/fa';
import {
  FaSquareInstagram,
  FaSquareSnapchat,
  FaSquareXTwitter,
} from 'react-icons/fa6';

const Footer = () => {
  const pathname = usePathname();

  return (
    <div className="w-full py-5 bg-tertiary mt-10">
      <div className="w-[95%] mx-auto max-w-[1450px]">
        <div className="py-5 border-b border-gray-300 border-opacity-20 flex justify-between items-center max-md:flex-col max-md:gap-8">
          <div className="flex-1">
            <Link href="/">
              <h1 className="text-3xl font-extrabold text-light">
                <span className="text-primary">X</span>PLORE
              </h1>
            </Link>
          </div>

          <ul className="flex items-center justify-center gap-16 flex-1 text-white max-md:flex-col max-md:gap-5">
            {navLinks.map((link, index) => (
              <Route
                isActive={
                  (pathname.includes(link.route) && link.route.length > 1) ||
                  pathname === link.route
                }
                label={link.label}
                route={link.route}
                key={index}
              />
            ))}
          </ul>

          <div className="flex gap-5 text-white flex-1 justify-end text-2xl">
            <FaFacebookSquare className="cursor-pointer" />
            <FaSquareInstagram className="cursor-pointer" />
            <FaSquareXTwitter className="cursor-pointer" />
            <FaSquareSnapchat className="cursor-pointer" />
          </div>
        </div>

        <div className="w-full text-center mt-3 text-sm text-white">
          <span> &copy;XPLORE. All Rights Reserved. </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
