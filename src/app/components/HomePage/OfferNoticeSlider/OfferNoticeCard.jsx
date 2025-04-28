import React from 'react';

const OfferNoticeCard = ({ card, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform group"
    >
      <img
        src={card.image}
        alt={card.title}
        className="h-48 w-full object-cover"
      />

      {/* Smooth Grow Overlay */}
      <div className="absolute inset-0 flex items-end overflow-hidden">
        <div className="w-full h-0 group-hover:h-full bg-transparent group-hover:bg-black group-hover:bg-opacity-60 transition-all duration-500 ease-in-out flex flex-col items-center justify-end p-6 rounded-b-lg">
          
          {/* Title */}
          <h3 className="text-white text-lg font-bold mb-3 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
            {card.title}
          </h3>
          
          {/* Button */}
          <button className="px-2 py-1 text-black rounded-md font-semibold opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-300 hover:bg-gray-200">
            View Details
          </button>

        </div>
      </div>
    </div>
  );
};

export default OfferNoticeCard;
