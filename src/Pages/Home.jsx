
import ManiSlider from "./ManiSlider/ManiSlider";
import { useState} from "react"
// import axios from "axios"
// import ProductCard from "./Test/ProductCard"
import LoadingSpinner from "./Test/LoadingSpinner"
// import CategoryFilter from "./Test/CategoryFilter"
// @ts-ignore
import img1 from '../assets/images/4e0477aa4f5dd4a25a45c18cd98b6c1952c42986.png'
// @ts-ignore
import img2 from '../assets/images/a38a454dc2a0e0b2e195e0e42acd739af81f67d6.png'
// @ts-ignore
import img3 from '../assets/images/image8.png'
// @ts-ignore
import img4 from '../assets/images/image7.png'
// @ts-ignore
import img5 from '../assets/images/9f961058d436744c716042ee9b8a08a28466452e.png'
// @ts-ignore
import img6 from '../assets/images/a33be4a8a339812deae723533bc81271dfa1cedb.png'
// @ts-ignore
import img7 from '../assets/images/47f86ab1566c980d681040836993fd5651e02d7b.png'
// @ts-ignore
import img8 from '../assets/images/45f8c8a340b2d725a6e40a4c69a5fd99e0132909.png'
// @ts-ignore
import img9 from '../assets/images/cdaaf97a2638b10fbd39fd591bc89b3a4316706e.png'
// @ts-ignore
import img10 from '../assets/images/a4ac2797a6c3a1c5b43e0d9d9dfa33206bf74409.png'
// @ts-ignore
import img11 from '../assets/images/cdaaf97a2638b10fbd39fd591bc89b3a4316706e.png'
// @ts-ignore
import img12 from '../assets/images/14ea876d180c5f743a16c3d2d073fb57765f1faf.png'
// @ts-ignore
import img13 from '../assets/images/eb5794cbc3a5a783f8fa5c16a02401415c252727.png'
// @ts-ignore
import img14 from '../assets/images/48784c2e18aaaacf9ba03299e4cc09a3ce17a422.png'
// @ts-ignore
import img15 from '../assets/images/38a872b0340350c3d500d09a3c0f405d19cb69a9.png'
// @ts-ignore
import img16 from '../assets/images/32faf0d962772939829c2a2a13f725d471c98300.png'
// @ts-ignore
import img17 from '../assets/images/2829b67ef8574dee8714c8eb66ad1abcfc09ef80.png'
// @ts-ignore
import img18 from '../assets/images/cff40d6a5a1e4904edd939805f835d04b2e2b281.png'
// @ts-ignore
import img19 from '../assets/images/8f780cf36f95a5f5df30585c3de9c184a66fb25c.png'
// @ts-ignore
import img20 from '../assets/images/5d4f94b214b64fe112c06c1a248f68afb6600ab7.png'
// @ts-ignore
import img21 from '../assets/images/e37241c00bd9b438681a4c2e9d21dbd760daf192.png'
// @ts-ignore
import img22 from '../assets/images/3e8f7c225296fd9e2115c870230434a44bf4c9c3.png'
// @ts-ignore
import img23 from '../assets/images/3984d8c69449a1e9d2affa36a71393e34b1efd4a.png'
// @ts-ignore
import img24 from '../assets/images/13fe5cbd1d4a91adff9ca7143d1810c05e570c3b.png'
// @ts-ignore
import img25 from '../assets/images/img25.png'
// @ts-ignore
import img26 from '../assets/images/img26.png'
// @ts-ignore
import img27 from '../assets/images/img27.png'
// @ts-ignore
import img28 from '../assets/images/img28.png'
// @ts-ignore
import img29 from '../assets/images/img29.png'
// @ts-ignore
import img30 from '../assets/images/img30.png'
// @ts-ignore
import img31 from '../assets/images/img31.png'
// @ts-ignore
import img32 from '../assets/images/img32.png'




import { Link } from "react-router-dom";
import Slider2 from "./ManiSlider/Slider2";



function Home() {
  return (
    <>
      <ManiSlider/>

      <div className="bg-gray-700">
       <div className="pat grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 p-6 mx-aut">
             <Link to='products'>
                   <div className="flex justify-around w-fit rounded">
                      <div className="item bg-white">
                     <p className="font-bold text-[22px]">Revamp your home in style</p>
                    <div className="flex flex-wrap  justify-space-between align-center "> 
                      {/* img */}
                          <div >
                            <img src={img3}/>
                            <p>Figurines</p>
                          </div>
                          <div>
                            <img src={img4}/>
                            <p>Lighting solutions</p>
                          </div>
                          <div >
                            <img src={img1} className="w-[135px] h-[116px] object-cover"/>
                            <p>Home storage</p>
                          </div>
                          <div>
                            <img src={img2} className="w-[135px] h-[116px] object-cover"/>
                            <p>Cushion covers</p>
                          </div>
                          
                    </div>
                   </div>
                    </div> 
             </Link>  
             <Link to='products'>
                   <div className="flex justify-between w-fit rounded">
                      <div className="item bg-white">
                     <p className="font-bold text-[22px]"> Up to 55% off</p>
                    <div className="flex flex-wrap  justify-center align-center "> 
                      {/* img */}
                          <div >
                            <img src={img7} className="w-[135px] h-[116px] object-cover"/>
                            <p>Figurines</p>
                          </div>
                          <div>
                            <img src={img8} className="w-[135px] h-[116px] object-cover"/>
                            <p>Lighting solutions</p>
                          </div>
                          <div >
                            <img src={img6} className="w-[135px] h-[116px] object-cover"/>
                            <p>Home storage</p>
                          </div>
                          <div>
                            <img src={img5} className="w-[135px] h-[116px] object-cover"/>
                            <p>Cushion covers</p>
                          </div>
                          
                    </div>
                   </div>
                    </div> 
             </Link>  
             <Link to='products'>
                   <div className="flex justify-between w-fit rounded">
                      <div className="item bg-white">
                     <p className="font-bold text-[22px]">Starting $149 | Headphones</p>
                    <div className="flex flex-wrap  justify-center align-center "> 
                      {/* img */}
                          <div >
                            <img src={img9} className="w-[135px] h-[116px] object-cover"/>
                            <p>Figurines</p>
                          </div>
                          <div>
                            <img src={img10} className="w-[135px] h-[116px] object-cover"/>
                            <p>Lighting solutions</p>
                          </div>
                          <div >
                            <img src={img11} className="w-[135px] h-[116px] object-cover"/>
                            <p>Home storage</p>
                          </div>
                          <div>
                            <img src={img12} className="w-[135px] h-[116px] object-cover"/>
                            <p>Cushion covers</p>
                          </div>
                          
                    </div>
                   </div>
                    </div> 
             </Link>  
             <Link to='products'>
                   <div className="flex justify-between w-fit rounded">
                      <div className="item bg-white">
                     <p className="font-bold text-[22px]">Starting $99</p>
                    <div className="flex flex-wrap  justify-center align-center "> 
                      {/* img */}
                          <div >
                            <img src={img13} className="w-[135px] h-[116px] object-cover"/>
                            <p>Figurines</p>
                          </div>
                          <div>
                            <img src={img14} className="w-[135px] h-[116px] object-cover"/>
                            <p>Lighting solutions</p>
                          </div>
                          <div >
                            <img src={img15} className="w-[135px] h-[116px] object-cover"/>
                            <p>Home storage</p>
                          </div>
                          <div>
                            <img src={img16} className="w-[135px] h-[116px] object-cover"/>
                            <p>Cushion covers</p>
                          </div>
                          
                    </div>
                   </div>
                    </div> 
             </Link>  
             <Link to='products'>
                   <div className="flex justify-between w-fit rounded">
                      <div className="item bg-white">
                     <p className="font-bold text-[22px]">Starting $99</p>
                    <div className="flex flex-wrap  justify-center align-center "> 
                      {/* img */}
                          <div >
                            <img src={img17} className="w-[135px] h-[116px] object-cover"/>
                            <p>Figurines</p>
                          </div>
                          <div>
                            <img src={img18} className="w-[135px] h-[116px] object-cover"/>
                            <p>Lighting solutions</p>
                          </div>
                          <div >
                            <img src={img19} className="w-[135px] h-[116px] object-cover"/>
                            <p>Home storage</p>
                          </div>
                          <div>
                            <img src={img20} className="w-[135px] h-[116px] object-cover"/>
                            <p>Cushion covers</p>
                          </div>
                          
                    </div>
                   </div>
                    </div> 
             </Link>  
             <Link to='products'>
                   <div className="flex justify-between w-fit rounded">
                      <div className="item bg-white">
                     <p className="font-bold text-[22px]">Starting $99</p>
                    <div className="flex flex-wrap  justify-center align-center "> 
                      {/* img */}
                          <div >
                            <img src={img21} className="w-[135px] h-[116px] object-cover"/>
                            <p>Figurines</p>
                          </div>
                          <div>
                            <img src={img22} className="w-[135px] h-[116px] object-cover"/>
                            <p>Lighting solutions</p>
                          </div>
                          <div >
                            <img src={img23} className="w-[135px] h-[116px] object-cover"/>
                            <p>Home storage</p>
                          </div>
                          <div>
                            <img src={img24} className="w-[135px] h-[116px] object-cover"/>
                            <p>Cushion covers</p>
                          </div>
                          
                    </div>
                   </div>
                    </div> 
             </Link>  
             <Link to='products'>
                   <div className="flex justify-between w-fit rounded">
                      <div className="item bg-white">
                     <p className="font-bold text-[22px]">Starting $99</p>
                    <div className="flex flex-wrap  justify-center align-center "> 
                      {/* img */}
                          <div >
                            <img src={img25} className="w-[135px] h-[116px] object-cover"/>
                            <p>Figurines</p>
                          </div>
                          <div>
                            <img src={img26} className="w-[135px] h-[116px] object-cover"/>
                            <p>Lighting solutions</p>
                          </div>
                          <div >
                            <img src={img27} className="w-[135px] h-[116px] object-cover"/>
                            <p>Home storage</p>
                          </div>
                          <div>
                            <img src={img28} className="w-[135px] h-[116px] object-cover"/>
                            <p>Cushion covers</p>
                          </div>
                          
                    </div>
                   </div>
                    </div> 
             </Link>  
             <Link to='products'>
                   <div className="flex justify-between w-fit rounded">
                      <div className="item bg-white">
                     <p className="font-bold text-[22px]">Starting $99</p>
                    <div className="flex flex-wrap  justify-center align-center "> 
                      {/* img */}
                          <div >
                            <img src={img29} className="w-[135px] h-[116px] object-cover"/>
                            <p>Figurines</p>
                          </div>
                          <div>
                            <img src={img30} className="w-[135px] h-[116px] object-cover"/>
                            <p>Lighting solutions</p>
                          </div>
                          <div >
                            <img src={img31} className="w-[135px] h-[116px] object-cover"/>
                            <p>Home storage</p>
                          </div>
                          <div>
                            <img src={img32} className="w-[135px] h-[116px] object-cover"/>
                            <p>Cushion covers</p>
                          </div>
                          
                    </div>
                   </div>
                    </div> 
             </Link>  
              
       </div>
        <Slider2/>
       </div>
    </>
  )
}

export default Home

