"use client";
import { usePathname } from "next/navigation";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div>
      <h1 className={pathname === "/about/a" ? "text-green-500" : ""}>
        About Layout {pathname} ( /about/a 展示绿色)
      </h1>
      {children}
    </div>
  );
};

export default AboutLayout;
