const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-2xl font-bold">
              My<span className="text-blue-600">Simplesoft</span>
            </a>
          </div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              {["Home", "Features", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Mysimplesoft. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
