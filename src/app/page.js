import GoogleReviews from "./components/GoogleReviews/GoogleReviews";
import OfferNoticeSlider from "./components/HomePage/OfferNoticeSlider/OfferNoticeSlider";
import SearchForm from "./components/HomePage/SearchForm/SearchForm";
import VideoBanner from "./components/HomePage/VideoBanner/VideoBanner";

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
        <div className="relative z-10 -mt-[430px] md:-mt-80 flex justify-center">
          <div className=" px-4">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* Offer Notice */}
      <div className="bg-[#ecf0f5] mx-auto md:px-32 sm:px-0 mt-0 py-6">
        <OfferNoticeSlider />
      </div>
    </div>
  );
}

