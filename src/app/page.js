import AirlinesPartnerMarquee from "./HomePage/AirlinesPartnerMarquee/AirlinesPartnerMarquee";
import GoogleReviews from "./HomePage/GoogleReviews/GoogleReviews";
import OfferNoticeSlider from "./HomePage/OfferNoticeSlider/OfferNoticeSlider";
import SearchForm from "./HomePage/SearchForm/SearchForm";
import VideoBanner from "./HomePage/VideoBanner/VideoBanner";

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
        <div className="relative z-20 -mt-[450px] md:-mt-80 flex justify-center">
          <div className="px-4">
            <SearchForm />
          </div>
        </div>

        {/* Offer Notice */}
        <div className="bg-[#e2e8f0] mx-auto md:px-32 sm:px-0 mt-0 py-8 z-10">
          <OfferNoticeSlider />
        </div>

      </div>
      {/* Airlines Partner Logo */}
      <div className="mx-auto md:px-32 sm:px-0 mt-6">
        <AirlinesPartnerMarquee/>
      </div>
      <div className="mt-6 pt-4 md:px-32 sm:px-0 bg-[#e2e8f0]">
        <GoogleReviews/>
      </div>
    </div>
  );
}

