"use client";
import Link from "next/link";
import { useState } from "react";
import { FileImage, Video } from "lucide-react";

export default function Home() {
  const [hoveredOption, setHoveredOption] = useState(null);
  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-300 min-h-[calc(100vh-60px)] flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">
          Trouvez votre inspiration dans notre base de données :
        </h1>
        <div className="flex justify-center space-x-8">
          <Link
            href={"/image"}
            className={`group relative cursor-pointer p-4 rounded-lg transition-transform duration-300 ${
              hoveredOption === "photo"
                ? "transform scale-110 text-green-500"
                : ""
            }`}
            onMouseEnter={() => setHoveredOption("photo")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <FileImage size={24} className="w-16 h-16 mx-auto mb-2" />
            <div className="absolute inset-0 rounded-lg bg-opacity-0 group-hover:bg-opacity-25 transition-opacity duration-300"></div>
            <p className="text-lg font-semibold">Photo</p>
          </Link>

          <Link
            href={"/video"}
            className={`group relative cursor-pointer p-4 rounded-lg transition-transform duration-300 ${
              hoveredOption === "video"
                ? "transform scale-110 text-green-500"
                : ""
            }`}
            onMouseEnter={() => setHoveredOption("video")}
            onMouseLeave={() => setHoveredOption(null)}
          >
            <Video size={24} className="w-16 h-16 mx-auto mb-2" />
            <div className="absolute inset-0 rounded-lg bg-opacity-0 group-hover:bg-opacity-25 transition-opacity duration-300"></div>
            <p className="text-lg font-semibold">Vidéo</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
