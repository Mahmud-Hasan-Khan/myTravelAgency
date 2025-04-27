import React from 'react';

const OfferNoticeCard = ({card, onClick}) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
        >
            <img src={card.image} alt={card.title} className="h-48 w-full object-cover" />
            <div className="p-4">
                <h3 className="font-bold text-lg">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.description}</p>
            </div>
        </div>
    );
};

export default OfferNoticeCard;