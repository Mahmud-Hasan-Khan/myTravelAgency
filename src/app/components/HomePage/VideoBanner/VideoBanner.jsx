
const VideoBanner = () => {
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
      <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-32 text-white bg-black/20">
        <h1 className="text-xl md:text-5xl font-bold  mb-0 md:mb-2">
          Welcome to <strong>Wakia Travels!</strong>
        </h1>
        <p className="text-base md:text-3xl italic">
          The Travel Agency That Really Cares
        </p>
        
      </div>
    </section>
  );
};

export default VideoBanner;



