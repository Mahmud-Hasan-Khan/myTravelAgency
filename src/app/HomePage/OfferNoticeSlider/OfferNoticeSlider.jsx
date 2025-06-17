'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OfferNoticeCard from './OfferNoticeCard';
import SectionTitle from '@/app/components/SectionTitle/SectionTitle';
import useSWR from 'swr';
import OfferNoticeSkeleton from '@/app/components/OfferNoticeSkeleton/OfferNoticeSkeleton';

const fetcher = (...args)=> fetch(...args).then(res=>res.json());

const OfferNoticeSlider = () => {
  // Setup Embla carousel instance
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  // Fetch cards data from mongoDB API using SWR & State to store cards data
  const {data:cards=[], isLoading, error}= useSWR('/api/offer-notice', fetcher);

  // State to track selected slide index
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Update selected index when slide changes
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect(); // Set initial selected index

    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  // Setup autoplay functionality
  useEffect(() => {
    if (!emblaApi) return;

    let autoplayInterval;

    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000); // Change slide every 3 seconds
    };

    const stopAutoplay = () => clearInterval(autoplayInterval);

    const node = emblaApi.containerNode();

    // Pause autoplay on hover or focus
    node.addEventListener('mouseenter', stopAutoplay);
    node.addEventListener('mouseleave', startAutoplay);
    node.addEventListener('focusin', stopAutoplay);
    node.addEventListener('focusout', startAutoplay);

    startAutoplay(); // Start autoplay initially

    // Cleanup event listeners and interval
    return () => {
      stopAutoplay();
      node.removeEventListener('mouseenter', stopAutoplay);
      node.removeEventListener('mouseleave', startAutoplay);
      node.removeEventListener('focusin', stopAutoplay);
      node.removeEventListener('focusout', startAutoplay);
    };
  }, [emblaApi]);

  // Handle clicking on a card to navigate to its page
  const handleCardClick = useCallback(
    (_id) => {
      router.push(`/offer-notice/${_id}`);
    },
    [router]
  );

  // Handle clicking on a dot to navigate to specific slide
  const handleDotClick = (index) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  if (isLoading) return <OfferNoticeSkeleton />;


  return (
    <div className="relative w-full bg-white rounded-md py-2">
      <SectionTitle heading="Travel Updates & Exclusive Offers" subheading="Stay up to date with official airline Updates and promotional fares" ></SectionTitle>
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {cards.map((card) => (
            <div
              key={card._id}
              className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] p-2"
            >
              <OfferNoticeCard card={card} onClick={() => handleCardClick(card._id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      {cards.length > 1 && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 mt-4">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className="w-4 h-4 flex items-center justify-center rounded-full border-2 border-gray-300 transition-all duration-300"
            >
              {/* Inner dot */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? 'bg-[#1882ff] scale-100' : 'bg-transparent scale-75'
                  }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfferNoticeSlider;
