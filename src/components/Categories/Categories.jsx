import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import style from './Categories.module.scss';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Categories() {
  const [categoryList, setCategory] = useState([]);

  async function getCategory() {
    let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    setCategory(data.data);
  }

  useEffect(() => {
    getCategory();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className='container ' style={{ marginTop: '130px' }}>
      <h3 className='mb-4 fw-bold'>Shop by Category</h3>
      <Slider {...settings}>
        {categoryList.map((category, index) => (
          <div key={index} className="px-2">
            <Link to={`/categories/${category._id}`} className="text-decoration-none">
              <div className={`card border-0 shadow-sm text-center ${style.categoryCard}`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className={`rounded-circle mx-auto mt-3 ${style.categoryImg}`}
                />
                <div className="card-body">
                  <p className="fw-semibold text-dark mb-0 text-capitalize">{category.name}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
