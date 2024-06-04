"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const Redirect = ({ url }: { url: string }) => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push(url);
    }, 100);
  }, [url]);

  return null; // This component doesn't render anything
};

export default Redirect;
