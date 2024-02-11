import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-blue-200">
      <Link
        className="text-2xl font-bold text-gray-100 cursor-pointer hover:underline hover:text-blue-600"
        href="/"
      >
        FloodFinder
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
      </nav>
    </header>
  );
}
