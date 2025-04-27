'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CardDetails() {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      const response = await fetch('/OfferNoticeCard.json');
      const data = await response.json();
      const found = data.find((item) => item.id === id);
      setCard(found);
    };
    fetchCard();
  }, [id]);

  if (!card) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <img src={card.image} alt={card.title} className="w-full h-64 object-cover rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{card.title}</h1>
      <p className="text-gray-700 mt-2">{card.description}</p>
    </div>
  );
}
