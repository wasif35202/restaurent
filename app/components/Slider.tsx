'use client';
import Wrapper from '@/Components/Wrapper';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

const slides = [
  {
    id: 1,
    title: 'always fresh & always crispy & always hot',
    image: '/slides/slide1.png',
  },
  {
    id: 2,
    title: 'we deliver your order wherever you are in NY',
    image: '/slides/slide2.png',
  },
  {
    id: 3,
    title: 'the best pizza to share with your family',
    image: '/slides/slide3.png',
  },

];

const Slider = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [fade, setFade] = useState(true); // State to control fade effect

  // Automatically change the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5000 milliseconds (5 seconds)

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const handleNext = () => {
    setFade(false); 
    setTimeout(() => {
      setCurrentSlideIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
      setFade(true); 
    }, 500); 
  };

  const handlePrevious = () => {
    setFade(false); 
    setTimeout(() => {
      setCurrentSlideIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
      setFade(true); 
    }, 500); 
  };

  return (
    <Wrapper className="relative  flex items-center justify-center ">
      <div
        className={`transition-opacity ${fade ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image
          src={slides[currentSlideIndex].image}
          alt={slides[currentSlideIndex].title}
          width={1170}
          height={520}
          className="border border-gray-200 bg-white bg-opacity-30 backdrop-blur-lg shadow-lg"
        />
      </div>

      <div
        className="absolute bottom-[0%] left-0 top-[0%] flex cursor-pointer items-center justify-center text-yellow-500 duration-300 hover:bg-yellow-100 hover:opacity-50"
        onClick={handlePrevious}
      >
        <MdOutlineKeyboardArrowLeft size={100} className="" />
      </div>

      <div
        className="absolute bottom-[0%] right-0 top-[0%] flex cursor-pointer items-center justify-center text-yellow-500 duration-300 hover:bg-yellow-100 hover:opacity-50"
        onClick={handleNext}
      >
        <MdOutlineKeyboardArrowRight size={100} />
      </div>
    </Wrapper>
  );
};

export default Slider;
