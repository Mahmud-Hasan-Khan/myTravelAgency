import Image from 'next/image';
import React from 'react';

const OfferNoticeCard = ({ card, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform group border-t-2 border-t-brandBlue"
    >
      <div className="relative w-full h-40 rounded-lg overflow-hidden">
        <Image
          src={card.image}
          alt={card.title || 'Card Image'}
          fill
          className="object-fill"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>


      {/* Smooth Grow Overlay */}
      <div className="absolute inset-0 flex items-end overflow-hidden">
        <div className="w-full h-0 group-hover:h-full bg-transparent group-hover:bg-black group-hover:bg-opacity-80 transition-all duration-500 ease-in-out flex flex-col items-center justify-end p-6 rounded-b-lg">

          {/* Title */}
          <h3 className="text-white text-lg font-bold mb-5 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {card.title}
          </h3>

          {/* Button */}
          <button className="px-2 py-1 bg-[#1882ff] text-white rounded-md font-semibold opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 hover:bg-[#126fde]">
            View Details
          </button>

        </div>
      </div>
    </div>
  );
};

export default OfferNoticeCard;
