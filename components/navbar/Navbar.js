import Link from "next/link";

export default function Pixabay() {
  return (
    <div className="flex flex-col items-center justify-center bg-green-700/70">
      <Link href="/">
        <p className="my-4 font-semibold text-xl text-white cursor-pointer">
          Pixabay Api
        </p>
      </Link>
    </div>
  );
}
