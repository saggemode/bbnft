import Image from "next/image";
import Link from "next/link";
import Author from "./_child/author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/spinner";
import Error from "./_child/error";

export default function Afirst() {
  const { data, isLoading, isError } = fetcher("api/trending");

  if (isLoading) return <Spinner></Spinner>;
  if (isError) return <Error></Error>;

  SwiperCore.use([Autoplay]);

  const bg = {
    background: "url('/images/banner.png') no-repeat",
    backgroundPosition: "right",
    //height: "400"
  };

  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>

        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
        >
          {data.map((value, index) => (
            <SwiperSlide key={index}>
              <Slide data={value}></Slide>
            </SwiperSlide>
          ))}
          ...
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ data }) {
  const { slug, title, category, image, published, description, author } = data;

  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href={`/posts/${slug}`}>
          <a>
            <Image src={image || "/"} width={600} height={400} alt="no picture" />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/posts/${slug}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "Unknown"}
            </a>
          </Link>
          <Link href={`/posts/${slug}`}>
            <a className="text-gray-600 hover:text-gray-600">
              - {published || "Unknown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${slug}`}>
            <a className="text-2xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
              {title || "Unknown"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{description || "description"}</p>
        {author ? <Author {...author}></Author> : <></>}
      </div>
    </div>
  );
}
