"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const AirlinesPartnerMarquee = () => {

  // State to store airlinesLogo data
  const [airlinesLogo, setAirlinesLogo] = useState([]);

  // Fetch airlinesLogo data from local JSON file
  useEffect(() => {
    const fetchAirlinesLogo = async () => {
      const response = await fetch('/airlinesPartnerLogo.json');
      const data = await response.json();
      console.log(data);
      setAirlinesLogo(data);
    };
    fetchAirlinesLogo();
  }, []);


  return (
    <div className="my-3">
      <div className='divider'>
      <h1 className='text-center md:text-2xl font-semibold text-[#1a2b3d]'>Key Airlines Partner</h1>
      </div>
      <div className="">
        <Marquee pauseOnHover speed={80}>
          {airlinesLogo.map((logo, index) => (
            <div key={index} className='mx-6'>
              <Image
                src={logo.image}
                alt={logo.name || 'Airline Logo'}
                width={80}
                height={40}
                className="object-contain h-12 w-auto"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default AirlinesPartnerMarquee;