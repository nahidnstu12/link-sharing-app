"use client";

import Link from "next/link";
import React from "react";

const Index: React.FC = (): JSX.Element => {
  return (
    <main>
      <h1 className="text-center text-2xl my-4">Dev Link Share App</h1>
      <p className="text-center text-base my-4">
        If you logged in, go to{" "}
        <Link className="text-blue-500 underline" href="/home">
          Home
        </Link>{" "}
        or{" "}
        <Link href="/login" className="text-blue-500 underline">
          Login
        </Link>{" "}
        page
      </p>
    </main>
  );
};

export default Index;
