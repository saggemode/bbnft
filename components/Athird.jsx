import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";

export default function Athird({ posts }) {
  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      {/* swiper */}
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
         {posts.map((post, index) => (
          <SwiperSlide key={index}>
            <Post post={post}></Post>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function Post({ post }) {

  return (
    <div className="grid">
      <div className="images">
      <Link href={`/post/${post._id}/${post.slug}`}>
          <a>
            <Image src={post.image || "/"} width={600} height={400} alt="no picture" />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
        <Link href={`/post/${post._id}/${post.slug}`}>
            <a className="text-orange-600 hover:text-orange-800">
            {post.category || "Unknown"}
            </a>
          </Link>
          <Link href={`/post/${post._id}/${post.slug}`}>
            <a className="text-gray-800 hover:text-gray-600">
             - {post.published || "Unknown"}
            </a>
          </Link>
        </div>
        <div className="title">
        <Link href={`/post/${post._id}/${post.slug}`}>
            <a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
            {post.title || "null"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{post.description.substring(1, 200) + " ...." || "null"}</p>
        {/* {author ? <Author {...author}></Author> : <></>} */}
      </div>
    </div>
  );
}
