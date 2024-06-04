"use client";
import React, { useEffect } from "react";

import { navigate } from "@/app/actions";

const Redirect = ({ url }: { url: string }) => {
  useEffect(() => {
    setTimeout(() => {
      navigate(url);
    }, 100);
  }, [url]);

  return null; // This component doesn't render anything
};

export default Redirect;
