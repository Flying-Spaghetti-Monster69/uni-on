"use client";

import Link from "next/link";
import { Home, BookOpen, BarChart, User } from "lucide-react";

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-6 py-2 z-40">
      <div className="flex justify-around items-center">
        <Link href="/" className="flex flex-col items-center text-teal-600">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link href="/" className="flex flex-col items-center text-teal-600">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1">Notes</span>
        </Link>

        <Link href="/" className="flex flex-col items-center text-teal-600">
          <BarChart className="h-5 w-5" />
          <span className="text-xs mt-1">Status</span>
        </Link>

        <Link href="/" className="flex flex-col items-center text-teal-600">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
