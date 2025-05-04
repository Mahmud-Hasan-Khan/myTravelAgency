import AirlinesPartnerMarquee from "./pages/HomePage/AirlinesPartnerMarquee/AirlinesPartnerMarquee";
import OfferNoticeSlider from "./pages/HomePage/OfferNoticeSlider/OfferNoticeSlider";
import SearchForm from "./pages/HomePage/SearchForm/SearchForm";
import VideoBanner from "./pages/HomePage/VideoBanner/VideoBanner";


export default function Home() {
  return (
    <div className="">
      {/* Banner section */}
      <div className="relative w-full overflow-hidden">

        {/* Video Banner */}
        <div className="h-[500px]">
          <VideoBanner />
        </div>

        {/* Container that reserves space */}
        <div className="relative z-20 -mt-[430px] md:-mt-80 flex justify-center">
          <div className="px-4">
            <SearchForm />
          </div>
        </div>

        {/* Offer Notice */}
        <div className="bg-[#ecf0f5] mx-auto md:px-32 sm:px-0 mt-0 py-8 z-10">
          <OfferNoticeSlider />
        </div>

      </div>
      {/* Airlines Partner Logo */}
      <div className="mx-auto md:px-32 sm:px-0 mt-6 border-e-2">
        <AirlinesPartnerMarquee></AirlinesPartnerMarquee>
      </div>
    </div>
  );
}

