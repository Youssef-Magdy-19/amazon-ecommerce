import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
      <footer className="bg-[#232f3e] text-white text-sm">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-center bg-[#37475a] cursor-pointer md:text-lg hover:bg-[#485769] h-16 flex items-center justify-center"
        >
          Back to Top
        </div>


        <div className="flex justify-around text-sm font-light md:font-normal md:text-lg md:leading-7  gap-8 px-8 md:px-16 py-10 border-b border-gray-600">
          <div className="hidden md:flex flex-col gap-4 ">
            <h3 className="font-bold ">Get to Know Us</h3>
            <ul className="space-y-2" >
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
              <li>Amazon Science</li>
            </ul>
          </div>
          <div className="hidden md:flex flex-col gap-4 ">
            <h3 className="font-bold ">Connect with Us</h3>
            <ul className="space-y-2">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 ">
            <h3 className="font-bold ">Make Money with Us</h3>
            <ul className="space-y-2">
              <li>Sell on Amazon</li>
              <li>Sell under Amazon Accelerator</li>
              <li>Protect and Build Your Brand</li>
              <li>Amazon Global Selling</li>
              <li>Supply to Amazon</li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 ">
            <h3 className="font-bold ">Let Us Help You</h3>
            <ul className="space-y-2">
              <li>Your Account</li>
              <li>Returns Center</li>
              <li>Product Safety Alerts</li>
              <li>Amazon App Download</li>
              <li>Help</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 py-3  md:py-10 border-t border-gray-600 md:h-16 ">
          <Link to='/'><img src="/images/AmazonNavbar.png" alt="Amazon" className="w-24 " /></Link>
          <div className="flex items-center gap-4 text-gray-300">
            <select className="bg-[#232f3e] border border-gray-600 px-2 py-1 rounded">
              <option>English</option>
              <option>العربية</option>
            </select>
            {/* <button className="border border-gray-600 w-24 h-8 rounded">India</button> */}
            <select className="bg-[#232f3e] border border-gray-600 px-2 py-1 rounded ">
              <option>Egypt</option>
              <option>India</option>
              <option>USA</option>
              <option>KSA</option>
              <option>Australia</option>
              <option>Switzerland</option>
              <option>Kanada</option>
            </select>
          </div>
        </div>

        <div className="hidden md:flex justify-around items-center text-gray-400 bg-[#131A22] p-8 md:px-16 min-h-32 text-xs">
          <div>
            <h4 className="font-semibold mb-1">AbeBooks</h4>
            <p>Books, art & collectibles</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Amazon Web Services</h4>
            <p>Scalable Cloud Computing Services</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Prime Now</h4>
            <p>2-Hour Delivery on Everyday Items</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Amazon Business</h4>
            <p>Everything For Your Business</p>
          </div>
        </div>
        <div className="hidden md:flex justify-around items-center text-gray-400 bg-[#131A22] py-5 px-8 md:px-16 min-h-32 text-xs border-b border-gray-600">
          <div>
            <h4 className="font-semibold mb-1">AbeBooks</h4>
            <p>Books, art & collectibles</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Amazon Web Services</h4>
            <p>Scalable Cloud Computing Services</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Prime Now</h4>
            <p>2-Hour Delivery on Everyday Items</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Amazon Business</h4>
            <p>Everything For Your Business</p>
          </div>
        </div>
        
        <div className="text-center bg-[#131A22] text-gray-400 text-xs py-4 flex flex-col items-center gap-1 ">
          <p className="mb-1">Conditions of Use & Sale | Privacy Notice | Interest-Based Ads</p>
          <p>© 1996-2024, Amazon.com, Inc. by <span className="font-semibold">ENG.Youssef Magdy</span></p>
        </div>
      </footer>
      );
};

export default Footer;
