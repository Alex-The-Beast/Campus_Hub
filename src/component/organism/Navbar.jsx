import { useState } from "react";
import { Menu, X, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Notes", href: "#notes" },
    { name: "PYQs", href: "/pyqs" },
     { name: "Events", href: "#events" },
    { name: "Discussion", href: "/discussion" },
   
    { name: "Resources", href: "/resources" },
  ];

  return (
    <nav className="sticky top-4 mx-4 md:mx-8 lg:mx-16 z-50 bg-black backdrop-blur-md rounded-full shadow-lg px-6 py-4 flex items-center justify-between text-white font-secondary">
      {/* Logo */}
      <div className="text-2xl md:text-3xl font-primary tracking-tight cursor-pointer font-bold">
      <Link to="/">CAMPUS HUB</Link>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-10 text-base md:text-lg font-secondary">
        {links.map((link) => (
          <li key={link.name} className="relative group">
            <a
              href={link.href}
              className="transition-colors hover:text-[var(--accent-violet)]"
            >
              {link.name}
            </a>
            {/* Optional gradient underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[var(--gradient-violet)] group-hover:w-full transition-all"></span>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="hidden md:flex items-center space-x-6">
        <Search className="w-6 h-6 cursor-pointer hover:text-[var(--accent-violet)] transition-colors" />
        <User className="w-6 h-6 cursor-pointer hover:text-[var(--accent-violet)] transition-colors" />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-[90%] bg-[var(--primary-black)] rounded-2xl flex flex-col items-center py-4 space-y-4 shadow-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-white font-secondary text-lg hover:text-[var(--accent-violet)] transition"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center space-x-6 mt-2">
            <Search className="w-5 h-5 cursor-pointer hover:text-[var(--accent-violet)] transition-colors" />
            <User className="w-5 h-5 cursor-pointer hover:text-[var(--accent-violet)] transition-colors" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
