import React from "react";
import Layout from "../components/Layout";
import MetaTag from "../components/MetaTag";
import ImageWrapper, { sizes } from '../components/ImageWrapper'
import SocialIcon from '../components/social-icons'
import { PageSeo } from "../components/SEO";
import global from "../data/global.json";
import siteMetadata from '../data/siteMetadata'

const About = () => {
  return (
    <div>
      <Layout>
      <MetaTag
        title={"Create Post"}
        description={"A Full Stack Developer who try to write technical blogs."}
        siteUrl={"https://next-ecomtailwin.vercel.app/"}
        previewImage={
          "https://next-ecomtailwin.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fnext-ecom-tailwind%2Fimage%2Fupload%2Fv1657406132%2Fppdbacwi02hqwbwhttjp.jpg&w=1920&q=75"
        }
      />
       

        <div className="divide-y pt-20">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <ImageWrapper
              size={sizes.small}
              details={global.writer.picture}
              className="w-48 h-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              {global.writer.name}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">{global.writer.jobtitle}</div>
            <div className="text-gray-500 dark:text-gray-400">{global.writer.company}</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${global.writer.email}`} />
              <SocialIcon kind="github" href={global.writer.github} />
              <SocialIcon kind="youtube" href={global.writer.youtube} />
              <SocialIcon kind="linkedin" href={global.writer.linkedin} />
              <SocialIcon kind="twitter" href={global.writer.twitter} />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">

            hello
          
          </div>
        </div>
      </div>
      </Layout>
    </div>
  );
};

export default About;
