// @ts-ignore
import img34 from '../../assets/images/img34.png'
// @ts-ignore
import img35 from '../../assets/images/img35.png'
// @ts-ignore
import img36 from '../../assets/images/img36.png'
// @ts-ignore
import img37 from '../../assets/images/img37.png'
// @ts-ignore
import img40 from '../../assets/images/img40.png'


const testimonials = [
  {
    id: 2,
    image: img34,
  },
  {
    id: 3,
    image: img35,
  },
  {
    id: 4,
    image: img36,
  },

  {
    id: 5,
    image: img37,
  },
  {
    id: 8,
    image: img40,
  },


];

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function Slider2() {
  return (
    <div className="bg-white">
      <section className="py-10 px-4 max-w-7xl my-0 mx-auto">
        <div className="text fw-bold text-2xl">
          <h2 className="">Best Sellers in Clothing & Accessories</h2>
        </div>


        {/*  cars*/}
        <div className="relative mx-auto cards">
          {/* swiper cards */}
          <Swiper
            navigation={
              {
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }
            }
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            // centeredSlides={true}
            modules={[Navigation]}
            className="testimonials-swiper md:mb-12"
          >
            {
              testimonials.map((testimonial, index) => (

                <SwiperSlide key={index} className='p-0 m-0 flex justify-center'>
                  <div className='text-center m-auto bg-white rounded-lg shadow-md h-full w-fit rr'>
                    <img src={testimonial.image} alt="" className='w-full h-full  object-cover' />
                  </div>
                </SwiperSlide>
              ))
            }

          </Swiper>


          {/* navigation buttons*/}
          <div className='flex justify-center gap-4 md:mt-8 mt-4 btnna'>
            <button className='swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-amber-400 hover:text-white transition-all duration-200 cursor-pointer'>
              <BsChevronLeft className='size-6' />
            </button>
            <button className='swiper-button-next-custom w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-amber-400 hover:text-white transition-all duration-200 cursor-pointer'>
              <BsChevronRight className='size-6' />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
