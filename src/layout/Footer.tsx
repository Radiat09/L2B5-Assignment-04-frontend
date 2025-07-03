import { Logo } from "@/assets/Logo";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8 px-4 bg-[#004d57]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          {/* <!-- Contact Info --> */}

          <div className="mb-6">
            <p className="text-sm">Md. Abdul Hakim Shah</p>
            <p className="text-sm">Joint Librarian PABX No: 154 & 113</p>
            <p className="text-sm mt-2">Cell No: 01816332931</p>
            <p className="text-sm">E-mail: official: hakim.shah@bubt.edu.bd</p>
            <p className="text-sm">Personal: shunto43@gmail.com</p>
          </div>
          {/* <!-- Branding --> */}
          <div className="mb-6">
            <Logo />
          </div>
        </div>

        {/* <!-- Divider --> */}
        <hr className="border-gray-300 my-6" />

        {/* <!-- Bottom Section --> */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xs">Privacy Policy</span>
            <span className="text-xs mx-2">/</span>
            <span className="text-xs">
              This is a replica website - BUBT Central Library © 2025
            </span>
            <span className="text-xs mx-2">/</span>
            <span className="text-xs">All Rights Reserved</span>
          </div>

          {/* <!-- Navigation Links --> */}
          <nav className="flex flex-wrap gap-4 text-sm">
            <Link to="/">HOME</Link>
            <Link to="add-book">Add Book</Link>
            <Link to="borrow-summery">Borrow Summery</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
