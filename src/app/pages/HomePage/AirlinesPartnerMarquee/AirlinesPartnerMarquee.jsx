"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import airlinesData from '../../../../../public/airlinesPartnerLogo.json'
import SectionTitle from '@/app/components/SectionTitle/SectionTitle';

const AirlinesPartnerMarquee = () => {

  // State to store airlinesLogo data
  const [airlinesLogo, setAirlinesLogo] = useState(airlinesData);

  // Fetch airlinesLogo data from local JSON file
  // useEffect(() => {
  //   const fetchAirlinesLogo = async () => {
  //     const response = await fetch('/airlinesPartnerLogo.json');
  //     const data = await response.json();
  //     console.log(data);
  //     setAirlinesLogo(data);
  //   };
  //   fetchAirlinesLogo();
  // }, []);

  return (
    <div className="my-3">
      <SectionTitle heading="Top Airlines Partner" subheading="Wakia Travels connects all top airlines. Enjoy a comfortable and hassle-free journey on any destination and get tickets of top airlines easily." />
      <div className="">
        <Marquee pauseOnHover speed={60} gradient={false}>
          {airlinesLogo.map((logo, index) => (
            <div key={index} className='mx-6 h-12 flex items-center justify-center'>
              <Image
                src={logo.image}
                alt={logo.name || 'Airline Logo'}
                width={80}
                height={40}
                className="object-contain h-12 w-auto"
                priority
                loading="eager"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default AirlinesPartnerMarquee;