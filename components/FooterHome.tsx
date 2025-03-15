import Link from "next/link";
import { FaFacebook, FaTwitter, FaDribbble, FaInstagram, FaYoutube } from "react-icons/fa";

const HomeFooter = () => {
  return (
    <footer className="bg-[#0f1c47] text-gray-300 py-4 mb-0 pb-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Brand Section */}
        <div>
          {/*<Link href="/" className="text-white text-xl font-bold">
            <img src="/assets/images/logo-light.svg" width={74} height={24} alt="shaddyna" />
          </Link>*/}
          <Link href="/" className="text-white text-3xl font-bold">
            Shaddyna
          </Link>
          <p className="mt-4">&copy; {new Date().getFullYear()} shaddyna. All rights reserved.</p>
          <div className="flex space-x-4 mt-4">
            <FaFacebook className="text-white cursor-pointer hover:text-blue-500" size={24} />
            <FaTwitter className="text-white cursor-pointer hover:text-blue-400" size={24} />
            <FaDribbble className="text-white cursor-pointer hover:text-pink-500" size={24} />
            <FaInstagram className="text-white cursor-pointer hover:text-pink-400" size={24} />
            <FaYoutube className="text-white cursor-pointer hover:text-red-500" size={24} />
          </div>
        </div>

        {/* Get in Touch */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Get in Touch</h4>
          <p className="mb-2">Nairobi City, Nairobi CBD, KENYA</p>
          <Link href="mailto:info@email.com" className="text-[#bf2c7e] hover:text-[#bf2c7e]">shaddyna2211@gmail.com</Link>
          <br />
          <Link href="tel:0702714736" className="text-[#bf2c7e] hover:text-[#bf2c7e]">+254 (0) 702 714 736</Link>
        </div>

        {/* Learn More */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Learn More</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-white">About Us</Link></li>
            <li><Link href="#" className="hover:text-white">Our Story</Link></li>
            <li><Link href="#" className="hover:text-white">Projects</Link></li>
            <li><Link href="#" className="hover:text-white">Terms of Use</Link></li>
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-4">Our Newsletter</h4>
          <p className="mb-4">Subscribe to our newsletter to get our news & deals delivered to you.</p>
          <form className="relative">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-3 rounded-md bg-[#0f1c47] border border-gray-400 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 h-full px-5 bg-[#bf2c7e] text-white rounded-r-md hover:bg-[#bf2c7e]"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;

