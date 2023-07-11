
import { FaHome, FaInfoCircle, FaEnvelope, FaFileAlt } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex justify-center items-center">
        <ul className="flex space-x-6">
          <li>
            <a href="/" className="text-sky-500 hover:text-sky-600 flex items-center">
              <FaHome className="text-3xl mr-2" />
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-sky-500 hover:text-sky-600 flex items-center">
              <FaInfoCircle className="text-3xl mr-2" />
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="text-sky-500 hover:text-sky-600 flex items-center">
              <FaEnvelope className="text-3xl mr-2" />
              Contact
            </a>
          </li>
          <li>
            <a href="/terms" className="text-sky-500 hover:text-sky-600 flex items-center">
              <FaFileAlt className="text-3xl mr-2" />
              Terms
            </a>
          </li>
        </ul>
      </div>
      <div className="h-1 bg-gradient-to-r from-sky-500 via-yellow-500 to-blue-600 mt-8"></div>
      <div className="container mx-auto mt-4 text-center">
        <p className="text-sm">© 2023 React Hub by Mila Alenina. All rights reserved.</p>
      </div>
    </footer>
  );
}
