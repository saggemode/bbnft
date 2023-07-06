import React from "react";
import db from "../lib/db";

import Post from "../models/Post";
import Layout from "../components/Layout";
import Afirst from "../components/Afirst";
import Asecond from "../components/Asecond";

import Athird from "../components/Athird";
// import Afourth from "../components/Afourth";

export default function Home({ posts }) {
  const bg = {
    background: "url('/images/banner.png') no-repeat",
    backgroundPosition: "right",
    //height: "400"
  };
  return (
    <Layout>
      <section className="py-16" style={bg}>
        <div className="container mx-auto md:px-20">
          <Afirst posts={posts} key={posts.slug}></Afirst>
        </div>
      </section>

      <section className="container mx-auto md:px-20 py-10">
        <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {posts.map((post) => (
            <Asecond
              post={post}
              key={post.slug}
              addToCartHandler={"addToCartHandler"}
            ></Asecond>
          ))}
        </div>
      </section>

      <Athird posts={posts} key={posts.slug}></Athird>

     
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const posts = await Post.find().lean();
  return {
    props: {
      posts: posts.map(db.convertDocToObj),
    },
  };
}
