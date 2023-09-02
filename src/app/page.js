"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FileImage, Video } from "lucide-react";

export default function Home() {
  const [hoveredOption, setHoveredOption] = useState(null);
  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-300 min-h-[calc(100vh-60px)] flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">
          Trouvez votre inspiration avec Pixabay
        </h1>
        <div className="flex justify-center space-x-8">
          <Link
            href={"/image"}
            className={`group relative cursor-pointer h-48 w-64 p-4 rounded-lg transition-transform duration-300 ${
              hoveredOption === "photo" ? "transform scale-110 " : ""
            }`}
            onMouseEnter={() => setHoveredOption("photo")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="relative w-full h-full mx-auto mb-2 overflow-hidden rounded-md">
              <Image
                src={"/ship.jpg"}
                alt="Photo"
                width={300}
                height={300}
                priority={true}
                className="w-full h-full"
              />
            </div>
            <span
              className={`absolute top-1/2 left-1/2 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-300 ${
                hoveredOption === "photo" ? "opacity-100" : ""
              }`}
            >
              <FileImage size={32} />
              <p className="uppercase font-bold">Photo</p>
            </span>
          </Link>

          <Link
            href={"/video"}
            className={`group relative h-48 w-64 cursor-pointer p-4 rounded-lg transition-transform duration-300 ${
              hoveredOption === "video" ? "transform scale-110 " : ""
            }`}
            onMouseEnter={() => setHoveredOption("video")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <div className="relative w-full h-full mx-auto mb-2 overflow-hidden rounded-md ">
              <Image
                src={"/foret.jpg"}
                alt="Video"
                width={300}
                height={300}
                priority={true}
                className="w-full h-full"
              />
            </div>
            <span
              className={`absolute top-1/2 left-1/2 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity duration-300 ${
                hoveredOption === "video" ? "opacity-100" : ""
              }`}
            >
              <Video size={32} />
              <p className="uppercase font-bold">Video</p>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
