'use client';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className='bg-[#e2e8f0]'>
      <div className='bg-[#222d32] h-10 md:h-12 text-white px-1 md:px-96 flex items-center justify-between'>
        <h4 className='text-xs md:text-xl'>{card.title}</h4>
        <div>
          <Link href={'/'} className="text-xs md:text-base px-1 md:px-2 py-1 bg-[#1882ff] text-white rounded-md font-semibold  translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200 hover:bg-[#126fde]">GO HOME</Link>
        </div>
      </div>
      <div className="max-w-3xl h-dvh mx-auto p-6 bg-white">
        <div className='max-w-xl'>
          <h1 className="text-base md:text-2xl">{card.title}</h1>
          <div className="divider my-1"></div>
          <div className="relative w-full h-40 md:h-56 rounded-lg overflow-hidden">
            <Image
              src={card.image}
              alt={card.title || 'Card Image'}
              fill
              className="object-fill"
            />
          </div>
          {/* <p className="text-gray-700 mt-2 text-[14px] py-2 whitespace-pre-line">{card.description}</p>
       */}
          <div className="text-gray-700 mt-2 text-sm">
            {card.description.split('\n').map((line, index) => (
              <p key={index} className="py-1">
                {line}
              </p>
            ))}
          </div>
          <div className='text-sm pt-1'>
            <p>যদি কোনো প্রশ্ন থাকে বা সাহায্য প্রয়োজন হয়, দয়া করে আমাদের ইমেইল করুন wakia.info@gmail -তে অথবা যোগাযোগ করুন +8801913509561 হটলাইনে।</p>
            <p>ধন্যবাদ</p>
            <p>টিম ওয়াকিয়া ট্রাভেলস</p>
          </div>
        </div>
      </div>

    </div>
  );
}
