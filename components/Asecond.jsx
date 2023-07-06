import Link from "next/link";
import Image from "next/image";
import TimeAgo from "timeago-react";

const Ascond = ({ post }) => {
  return (
    <div className="item">
      <div className="images">
        <Link href={`/post/${post.slug}`}>
          <a>
            <Image
              src={post.image || "/"}
              className="rounded"
              width={500}
              height={350}
              alt="no pic"
            />
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
              -  <TimeAgo
                datetime={post.createdAt}
                className="text-xs dark:text-white/75 opacity-80"
              />
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/post/${post._id}/${post.slug}`}>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
            {post.title.substring(1, 50) + "..."|| "null"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{post.description.substring(1, 200) + "..." || "null"}</p>
        <div className="author flex py-5">
          <Image
            src={post.userImage || ""}
            width={50}
            height={50}
            className="rounded-full"
            alt="no picture"
          ></Image>
          <div className="flex flex-col justify-center px-4">
            <Link href={"/"}>
              <a className="text-xs font-bold text-gray-500 hover:text-gray-600">
                {post.userName || "No Name"}
              </a>
            </Link>
            <span className="text-xs text-gray-400">
              {post.userEmail || ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ascond;
