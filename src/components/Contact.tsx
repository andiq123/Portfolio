import React from "react";

type Props = {};

export default function Contact({}: Props) {
  return (
    <div
      id="contact"
      className="text-white flex p-40 justify-between items-center text-4xl font-bold  gap-20 border-t-2"
    >
      <h1>Wanna get in touch?</h1>
      <div className="relative px-6 py-3 font-bold text-white rounded-lg group">
        <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-purple-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-pink-800 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
        <span className="relative">
          <p>andrei.ungureanu.work@gmail.com</p>
        </span>
      </div>
    </div>
  );
}
