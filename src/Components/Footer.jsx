import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#232f3e] text-white text-sm">
      <div id="home" className= " text-center bg-[#37475a] cursor-pointer md:text-lg hover:bg-[#485769] h-16 flex items-center justify-center">
        Back to Top
      </div>

      <div className="flex justify-around text-sm font-light md:font-normal md:text-lg md:leading-7  gap-8 px-8 md:px-16 py-10 border-b border-gray-600 md:h-80 mt-auto">
        <div className="flex flex-col gap-4 ">
          <h3 className="font-bold mb-2">Get to Know Us</h3>
          <ul className="space-y-1" >
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
            <li>Amazon Science</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 ">
          <h3 className="font-bold mb-2">Connect with Us</h3>
          <ul className="space-y-1">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 ">
          <h3 className="font-bold mb-2">Make Money with Us</h3>
          <ul className="space-y-4">
            <li>Sell on Amazon</li>
            <li>Sell under Amazon Accelerator</li>
            <li>Protect and Build Your Brand</li>
            <li>Amazon Global Selling</li>
            <li>Supply to Amazon</li>
            <li>Become an Affiliate</li>
            <li>Fulfilment by Amazon</li>
            <li>Advertise Your Products</li>
            <li>Amazon Pay on Merchants</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 ">
          <h3 className="font-bold mb-2">Let Us Help You</h3>
          <ul className="space-y-1">
            <li>Your Account</li>
            <li>Returns Center</li>
            <li>Product Safety Alerts</li>
            <li>100% Purchase Protection</li>
            <li>Amazon App Download</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-24 border-t border-gray-600 md:h-16 ">
        <img src="/public/images/Amazon.png" alt="Amazon" className="w-24 " />
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

      <div className="flex justify-around items-center text-gray-400 bg-[#131A22] p-8 md:px-16 min-h-32 text-xs">
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
       <div className="flex justify-around items-center text-gray-400 bg-[#131A22] p-8 md:px-16 min-h-32 text-xs">
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

      <div className="text-center bg-[#131A22] text-gray-400 text-xs py-8 flex flex-col items-center gap-1 ">
        <p className="mb-1">Conditions of Use & Sale | Privacy Notice | Interest-Based Ads</p>
        <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;
