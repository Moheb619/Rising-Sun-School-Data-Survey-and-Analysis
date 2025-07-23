import { Link } from "react-router-dom";

export default function FormNavigation() {
  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-3">
        <img src="/schoolLogo.png" alt="School Logo" className="h-20 w-auto" />
        <h1 className="text-2xl font-bold text-gray-800">
          Rising Sun School Survey Portal
        </h1>
      </div>

      <nav className="flex flex-wrap justify-center gap-3 mb-10">
        <Link
          to="/student"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Student Form
        </Link>
        <Link
          to="/parent"
          className="px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Parent Form
        </Link>
        <Link
          to="/teacher"
          className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          Teacher Form
        </Link>
        <Link
          to="/data"
          className="px-5 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
        >
          View Data
        </Link>
        <Link
          to="/analysis"
          className="px-5 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Analysis Dashboard
        </Link>
      </nav>
    </div>
  );
}
