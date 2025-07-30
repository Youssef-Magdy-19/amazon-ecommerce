
// @ts-ignore
import img from '../../assets/images/frame47.png'
import { useState, useEffect } from "react"

export default function ManiSlider() {

  const [currentSlide, setCurrentSlide] = useState(0) // البداية من الشريحة الثانية (active)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const images = [
    {
      
      id: 0,
      src: img,
      alt: "صورة المعرض 1",
    },
    {
      
      id: 1,
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
      alt: "صورة المعرض 1",
    },
    {
      id: 2,
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
      alt: "صورة المعرض 2",
    },
    {
      id: 3,
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
      alt: "صورة المعرض 3",
    },
    {
      id: 4,
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
      alt: "صورة المعرض 4",
    },
    {
      id: 5,
      src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
      alt: "صورة المعرض 5",
    },
  ]

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, images.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <div className="w-full  mx-auto">
      <div
        id="custom-controls-gallery"
        className="relative w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96 bg-gray-100">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0  transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.src || "/placeholder.svg"}
                className=" img absolute block w-full h-full  object-contain inset-0"
                alt={image.alt}
                loading="lazy"
              />
            </div>
          ))}

          
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center pt-4 gap-4">
          {/* <button
            type="button"
            className="flex justify-center items-center h-10 w-10 cursor-pointer group focus:outline-none hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={prevSlide}
            aria-label="الصورة السابقة"
          >
            <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
              <svg
                className="rtl:rotate-180 w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button> */}

          {/* Dots indicator */}
          {/* <div className="flex space-x-2 dots">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 marri ${
                  index === currentSlide ? "bg-amber-400 scale-110" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`الانتقال للصورة ${index + 1}`}
              />
            ))}
          </div> */}

          {/* <button
            type="button"
            className="flex justify-center items-center h-10 w-10 cursor-pointer group focus:outline-none hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={nextSlide}
            aria-label="الصورة التالية"
          >
            <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
              <svg
                className="rtl:rotate-180 w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button> */}
        </div>
      </div>
    </div>
  )
}

