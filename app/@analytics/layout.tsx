"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AnalyticsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4 border border-gray-200 p-4 mt-2">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <div>
        <Link
          className={`text-sm text-gray-500 ${
            pathname === "/visitors" ? "text-red-500 font-bold" : ""
          }`}
          href="/visitors"
        >
          Visitors
        </Link>
        <Link
          className={`text-sm text-gray-500 ml-5 ${
            pathname === "/page-views" ? "text-red-500 font-bold" : ""
          }`}
          href="/page-views"
        >
          Page Views
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AnalyticsLayout;
