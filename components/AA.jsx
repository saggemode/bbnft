import Image from "next/image";
import Link from "next/link";
import Author from "./_child/author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

const Afirst = ({ post }) => {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2000,
      }}
    >
      <SwiperSlide>
        <div className="grid md:grid-cols-2">
          <div className="image">
            <Link href={`/post/${post._id}/${post.slug}`}>
              <a>
                <Image
                 src={post.image || "/"}
                  width={600}
                  height={400}
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
                  - {post.published || "Unknown"}
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
            <p className="text-gray-500 py-3">{post.description || "null"}</p>
            author
            {/* {author ? <Author {...author}></Author> : <></>} */}
          </div>
        </div>
      </SwiperSlide>
      ...
    </Swiper>
  );
};

export default Afirst;
