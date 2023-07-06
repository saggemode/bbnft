import Image from "next/image";
import Link from "next/link";
import TimeAgo from "timeago-react";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

export default function Afirst({ posts }) {
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
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <Slide post={post}></Slide>
            </SwiperSlide>
          ))}
          ...
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ post }) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href={`/post/${post._id}/${post.slug}`}>
          <a>
            <Image
              src={post.image || "/"}
              width={600}
              height={600}
              alt="no picture"
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link href={`/post/${post._id}/${post.slug}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {post.category || "Unknown"}
            </a>
          </Link>
          <Link href={`/post/${post._id}/${post.slug}`}>
            <a className="text-gray-600 hover:text-gray-600">
              -{" "}
              <TimeAgo
                datetime={post.createdAt}
                className="text-xs dark:text-white/75 opacity-80"
              />
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/post/${post._id}/${post.slug}`}>
            <a className="text-2xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
              {post.title || "Title"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          {post.description.substring(1, 600) + "..." || "null"}
        </p>
      </div>
    </div>
  );
}
