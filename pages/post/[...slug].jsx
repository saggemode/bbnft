import React from "react";
import Image from "next/image";
import Ralated from "../../components/_child/ralated";
import Layout from "../../components/Layout";
import Spinner from "../../components/_child/spinner";

import db from "../../lib/db";
import Post from "../../models/Post";
import Link from "next/link";

const PostScreen = ({ post, posts }) => {
  // const { post } = props;
  if (!post) return <Spinner></Spinner>;
  return (
    <Layout>
      <div className="pt-20">
        <div className="grid md:grid-cols-4 md:gap-4">
          <div className="md:col-span-2">
            <h3 className="font-bold text-3xl text-center pb-5">
              {post.title || "No Title"}
            </h3>
            <Image
              src={post.image || "/"}
              width={900}
              height={600}
              alt="no picture"
              layout="responsive"
            ></Image>
            <div className="content text-gray-600 text-lg flex flex-col gap-4">
              {post.description || "No Description"}
            </div>
            <div className="flex justify-start">
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

          <div className=" md:col-span-2">
            {/* <Ralated posts={posts} ></Ralated> */}
            Related post
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const post = await Post.findOne({ slug }, "-reviews").lean();
  //const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      post: post ? db.convertDocToObj(post) : null,
    },
  };
}

export default PostScreen;
