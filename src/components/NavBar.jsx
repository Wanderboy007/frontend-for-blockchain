"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Home Link */}
          <div className="flex items-center">
            <Link href="/" legacyBehavior>
              <a className="text-white font-bold text-xl">Auction DApp</a>
            </Link>
            {/* Navigation Links */}
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" legacyBehavior>
                <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </a>
              </Link>
              <Link href="/create" legacyBehavior>
                <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Create Auction
                </a>
              </Link>
              {/* You can add more links here (e.g., "My Auctions", "Profile", etc.) */}
            </div>
          </div>
          {/* Placeholder for additional actions (e.g., wallet connect button) */}
          <div>
            <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
