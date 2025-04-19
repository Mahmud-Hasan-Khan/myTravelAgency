import SearchForm from "./components/HomePage/SearchForm/SearchForm";
import VideoBanner from "./components/HomePage/VideoBanner/VideoBanner";


export default function Home() {
  return (
    <div>
      <div className="">
        <VideoBanner></VideoBanner>
        <SearchForm></SearchForm>
      </div>
      {/* <div className="container px-4 md:px-32 py-6">
        <Banner />
      </div> */}



    </div>
  );
}
