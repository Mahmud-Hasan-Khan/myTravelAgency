"use client"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useEffect, useState } from "react";


const PreviousArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent text-white px-4 py-2 rounded-full">
    <p>❮</p>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-transparent text-white px-4 py-2 rounded-full">
    <p>❯</p>
  </button>
);

const Banner = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/banner.json');
      const json = await res.json();
      setData(json);
    };
    getData();
  }, []);
  // console.log(data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000, slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {data?.map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide?.imageLink} alt={`Slide ${index + 1}`} className="w-full h-[200px] lg:h-[468px] rounded-lg" />
            <div className="absolute inset-0 bg-black opacity-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="text-xl lg:text-4xl font-bold">{slide?.testName}</div>
              <div className="text-xs lg:text-lg font-medium w-1/2 text-center">{slide?.description}</div>
              <button className='btn bg-[#e00000] border-red-600 text-white hover:bg-orange-600 '>Book Now</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;