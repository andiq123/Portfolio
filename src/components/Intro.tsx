"use client";
import { useState, useEffect } from "react";

type Props = {};

export default function Intro({}: Props) {
  const [transform, setTransform] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    setAge(calculateAge(new Date(1997, 8, 7)));
  }, []);

  const handleMouseMove = (event: any) => {
    const { currentTarget, clientX, clientY } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const normalizedX = (clientX - left) / width;
    const normalizedY = (clientY - top) / height;

    const tiltX = (normalizedY - 0.5) * 15;
    const tiltY = -(normalizedX - 0.5) * 15;

    setTransform(`rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
  };

  const calculateAge = (dob: Date) => {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div
      id="home"
      className="perspective flex justify-center py-32 lg:px-44 px-7 mt-20 rounded-xl border-4 mx-auto relative w-10/12 backdrop-blur-lg"
      onMouseMove={handleMouseMove}
      style={{ transform, transition: "transform 0.1s" }}
    >
      <div className="absolute inset-0 opacity-50 z-10"></div>
      <div className="flex flex-col justify-between items-center z-20 relative w-full">
        <div className="mb-10">
          <h1 className="text-6xl text-white">
            Hi, I&apos;m Andrei Ungureanu!
          </h1>
          <p className="text-2xl gradient-text">
            A passionate full stack developer.
          </p>
          <p className="text-xl text-white mt-4">
            I&apos;m {age} years old and I&apos;ve been working in the tech
            industry for 2.5 years.
          </p>
        </div>
        <div>
          <p className="text-xl text-white mt-4 lg:typewriter">
            I&apos;m skilled in languages like TypeScript, C#, and others!
          </p>
          <p className="text-xl text-white lg:typewriter-delayed">
            I&apos;ve worked with frameworks and tools such as Next.js, Angular,
            .NET, and Docker etc.
          </p>
        </div>
      </div>
    </div>
  );
}
