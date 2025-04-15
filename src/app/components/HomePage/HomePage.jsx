// import React from 'react';

// const HomePage = () => {
//   return (
//     <section className='relative overflow-hidden'>
//       <video className='object-cover' src="hero-bg-cover.mp4" autoPlay loop muted width="100%" height="100%"></video>
//       <div className='absolute pl-32 text-white bg-black bg-opacity-10 inset-0'>
//         <p className="pt-20 text-5xl  ">Welcome to <strong>Wakia Travels!</strong></p>
//         <p className='text-2xl italic'>The Travel Agency That Really Cares </p>
//       </div>
//     </section>
//   );
// };

// export default HomePage;

import React from 'react';

const HomePage = () => {
  return (
    <section className="relative w-full h-fit">
      <video
        className="object-cover w-full h-full"
        src="hero-bg-cover.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-32 text-white bg-black/30">
        <h1 className="text-xl md:text-5xl font-bold  mb-1 md:mb-3">
          Welcome to <strong>Wakia Travels!</strong>
        </h1>
        <p className="text-base md:text-3xl italic">
          The Travel Agency That Really Cares
        </p>
        
      </div>
    </section>
  );
};

export default HomePage;



