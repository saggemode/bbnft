import { getSession } from "next-auth/react";
import slugify from "slugify";
import Post from "../../../models/Post";
import db from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin required" });
  }

  const { title, category, image, description } = req.body;
  if (!title || !category || !image || !description) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await db.connect();


  const userId = session.user._id;
  const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });
    const existingSlug = await Post.findOne({ slug: slug });
  if (existingSlug) {
    res.status(422).json({ message: "Slug exists already!" });
    await db.disconnect();
    return;
  }

  const newPost = new Post({
    title,
    slug:slug.toLocaleLowerCase(),
    category,
    author: userId,
    image,
    description,
    userName:session.user.name,
    userEmail:session.user.email,
    userImage:session.user.image
  });

  const post = await newPost.save();
  await db.disconnect();
  res.status(201).send({
    message: "Created product!",
    title: post.title,
    slug: post.slug,
    category: post.category,
    image: post.image,
    description: post.description,
  });
}

export default handler;
