'use client';
import { useEffect, useRef } from 'react';

const VideoBanner = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video play prevented:', error);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-28 md:h-fit">
      <video
        ref={videoRef}
        className="object-cover w-full h-full"
        src="/hero-bg-cover.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-32 text-white bg-black/30">
        <h1 className="text-lg md:text-5xl font-semibold md:font-bold mb-0 md:mb-2">
          Welcome to <strong>Wakia Travels!</strong>
        </h1>
        <p className="text-sm md:text-3xl italic">
          The Travel Agency That Really Cares
        </p>
      </div>
    </section>
  );
};

export default VideoBanner;
