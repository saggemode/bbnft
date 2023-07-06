import Link from "next/link";
import Image from "next/image";
import Author from "./author";

export default function Ralated({ posts }) {
  return (
    <section className="">
      <h1 className="font-bold text-2xl py-10">Related</h1>
      <div className="flex flex-col gap-10">
      {posts.map((post, index) => (
          <Post key={index} post={post}></Post>
        ))}
      </div>
    </section>
  );
}

function Post({ post }) {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/post/${post._id}/${post.slug}`}>
          <a>
            <Image
              src={post.image || "/"}
              className="rounded"
              width={300}
              height={200}
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
            <a className="text-gray-400 hover:text-gray-600">
              - {post.published || ""}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/post/${post._id}/${post.slug}`}>
            <a className="text-sm font-bold text-gray-600 hover:text-gray-600">
              {post.title || "No Title"}
            </a>
          </Link>
        </div>
        {/* {author ? <Author {...author}></Author> : <></>} */}
      </div>
    </div>
  );
}
