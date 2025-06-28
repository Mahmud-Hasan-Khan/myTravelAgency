'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import useSWR from 'swr';
import SectionTitle from '@/app/components/SectionTitle/SectionTitle';

const fetcher = (url) => fetch(url).then((res) => res.json());

const SkeletonLogo = () => (
  <div className="mx-6 h-12 w-36 bg-gray-200 animate-pulse rounded" />
);

const AirlinesPartnerMarquee = () => {
  const { data: logos, error, isLoading } = useSWR('/api/airlines-nameWithLogo', fetcher);

  return (
    <div className="py-3 bg-white rounded-md">
      <SectionTitle
        heading="Top Airlines Partner"
        subheading="Wakia Travels connects all top airlines. Enjoy a comfortable and hassle-free journey on any destination and get tickets of top airlines easily."
      />

      <div>
        {isLoading ? (
          <Marquee pauseOnHover speed={60} gradient={false}>
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonLogo key={i} />
            ))}
          </Marquee>
        ) : error ? (
          <p className="text-center text-red-500 py-6">Failed to load airlines.</p>
        ) : logos.length === 0 ? (
          <p className="text-center py-6">No airline partners found.</p>
        ) : (
          <Marquee pauseOnHover speed={60} gradient={false}>
            {logos.map((logo) => (
              <div
                key={logo._id}
                className="mx-6 h-12 flex items-center justify-center"
              >
                <Image
                  src={logo.image}
                  alt={logo.name || 'Airline Logo'}
                  width={40}
                  height={40}
                  className="object-contain h-12 w-auto"
                  unoptimized
                  loading="eager"
                />
              </div>
            ))}
          </Marquee>
        )}
      </div>
    </div>
  );
};

export default AirlinesPartnerMarquee;
