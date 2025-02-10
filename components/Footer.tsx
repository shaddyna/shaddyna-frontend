/*import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { contactInfo, quickLinks, socialLinks, supportItems } from "@/utils/footer-utils"


export default function Footer() {
  return (
    <footer className="bg-[#1a1b48] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-between mb-8 bg-[#ff3399] p-4 rounded-lg">
          {supportItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 justify-center">
              {item.icon}
              <div>
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-xs">{item.info}</div>
              </div>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="flex">
              <Input type="email" placeholder="Enter Email Address" className="rounded-none bg-white text-black" />
              <Button className="rounded-none bg-blue-900 hover:bg-blue-900/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-8 border-t border-gray-700">
        <div className="flex justify-center items-center">
        <div>
            <Image src="/logo.jpeg" alt="Shaddyna" width={150} height={50} className="mb-4" />
          </div>
          </div>


          <div>
            <h4 className="font-semibold mb-4">Follow us!</h4>
            <h5 className="text-sm mb-4">We&apos;re friendly:</h5>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} className="hover:text-[#ff3399]" aria-label={social.label}>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon}
                  </svg>
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold mb-4">Our Contacts</h4>
            {contactInfo.map((contact, index) => (
              <p key={index} className="text-sm">
                {contact.label}: {contact.value}
              </p>
            ))}
          </div>
          <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-[#ff3399]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 border-t border-gray-700 pt-8">
          <p>© Copyright {new Date().getFullYear()} shaddyna | Terms of use | Privacy Policy</p>
        </div>
      </div>
    </footer>
  )
}*/

import Link from "next/link";
import { FaFacebook, FaTwitter, FaDribbble, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 mb-16">
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
          <Link href="mailto:info@email.com" className="text-pink-400 hover:text-[#ff199c]">shaddyna2211@gmail.com</Link>
          <br />
          <Link href="tel:001234567890" className="text-pink-400 hover:text-[#ff199c]">+(254) 027 147 36</Link>
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
              className="w-full p-3 rounded-l-md bg-gray-800 border border-gray-600 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="absolute top-0 right-0 h-full px-5 bg-pink-400 text-white rounded-r-md hover:bg-[#ff199c]"
            >
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

