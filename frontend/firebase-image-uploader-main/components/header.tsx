import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-black text-white">
      <Link
        className="text-2xl font-bold text-gray-100 cursor-pointer hover:underline hover:text-blue-600"
        href="/"
      >
        Easy Deep Learning
      </Link>
      <nav className="flex gap-4">
        <Link
          className="text-gray-200 cursor-pointer hover:underline hover:text-blue-600"
          href="/train"
        >
          Train
        </Link>
        <Link
          className="text-gray-100 cursor-pointer hover:underline hover:text-blue-600"
          href="/classify"
        >
          Classify
        </Link>
        <Link
          className="text-2xl font-bold text-gray-100 cursor-pointer hover:underline hover:text-blue-600"
          href="/pakistan"
        >
          Pakistan
        </Link>
      </nav>
    </header>
  );
}
