'use client';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OfferNoticeCard from './OfferNoticeCard';

const OfferNoticeSlider = () => {

    const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1, loop: true });
    const [cards, setCards] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchOfferNoticeCards = async () => {
            const response = await fetch('/OfferNoticeCard.json');
            const data = await response.json();
            setCards(data);
            // console.log(data);
        };
        fetchOfferNoticeCards();
    }, []);

    // Set up Embla events for dot navigation
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };

        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        onSelect();

        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    // Autoplay logic
    useEffect(() => {
        if (!emblaApi) return;

        const autoplay = setInterval(() => {
            emblaApi.scrollNext();
        }, 3000); // 3 seconds

        return () => clearInterval(autoplay);
    }, [emblaApi]);

    const handleCardClick = useCallback((id) => {
        router.push(`/OfferNoticeCard/${id}`);
    }, [router]);


    return (
        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {cards.map((card) => (
                <div key={card.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] p-2">
                  <OfferNoticeCard card={card} onClick={() => handleCardClick(card.id)} />
                </div>
              ))}
            </div>
          </div>
    
          {/* Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`transition-all duration-300 w-3 h-3 rounded-full ${
                  selectedIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-300 scale-100'
                }`}
              />
            ))}
          </div>
        </div>
      );
    };
    
    export default OfferNoticeSlider;