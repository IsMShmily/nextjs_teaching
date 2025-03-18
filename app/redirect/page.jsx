"use client";
import { usePathname, redirect } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname == "/redirect") {
      setTimeout(() => {
        redirect("/about/a");
      }, 2000);
    }
  }, []);

  return <div>Redirect</div>;
};

export default Redirect;
