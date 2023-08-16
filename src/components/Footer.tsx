import Link from "next/link";
import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="border-t-2 text-white flex justify-between items-center p-5 ">
      <p>Andrei Ungureanu @{new Date().getFullYear()}</p>
      <div>
        <Link href="https://github.com/andiq123">Github</Link>
      </div>
    </div>
  );
}
