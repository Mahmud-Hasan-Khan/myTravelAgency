import SearchForm from "./components/HomePage/SearchForm/SearchForm";
import VideoBanner from "./components/HomePage/VideoBanner/VideoBanner";


export default function Home() {
  return (
    <div>
      <div className="relative">
        <VideoBanner></VideoBanner>
        <div className="absolute lg:top-48 left-1/2 transform -translate-x-1/2">
          <SearchForm></SearchForm>
        </div>
      </div>
      {/* <div className="container px-4 md:px-32 py-6">
        <Banner />
      </div> */}



    </div>
  );
}
