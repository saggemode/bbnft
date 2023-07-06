import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "John",
      email: "a@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
      isAuthorized: false,
    },
    {
      name: "Jane",
      email: "u@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
      isAuthorized: false,
    },
  ],
  posts: [
    {
      title: "Your most unhappy customers are your greatest source of learning",
      slug: "this-is-the-dummy-of-the-post-1",
      category: "News, Fashion",
      image: "/images/articles/posts/img1.jpg",
      description: `Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind 
      text by the name of Lorem Ipsum decided to leave for the far World of Grammar.`,
      published: "Jun 3,  2022",
      author: {
        name: "Flying High",
        img: "/images/author/author1.jpg",
        designation: "CEO and Founder",
      },
    },
    {
      title: "this is the dummy of the post 2",
      slug: "this-is-the-dummy-of-the-post-2",
      category: "News",
      image: "/images/articles/posts/img2.png",
      user: "787878797878787",
      description: `A small river named Duden flows by their place and supplies it with the necessary regelialia. 
        It is a paradisematic country, in which roasted parts of sentences fly into your mouth`,
      published: "Jun 5,  2022",
      author: {
        name: "Flying High",
        img: "/images/author/author1.jpg",
        designation: "CEO and Founder",
      },
    },
    {
      title: "this is the dummy of the post 3",
      slug: "this-is-the-dummy-of-the-post-3",
      category: "Politics",
      image: "/images/articles/posts/img3.png",
      user: "587878797878787",
      description:
        "g well frontend components the way youa are most likely used to. The advantages of this are numerous",
      published: "Jun 5,  2022",
      author: {
        name: "Flying High",
        img: "/images/author/author1.jpg",
        designation: "CEO and Founder",
      },
    },
    {
      title: "this is the dummy of the post 4",
      slug: "this-is-the-dummy-of-the-post-4",
      category: "Fashion",
      image: "/images/articles/posts/img4.png",
      user: "187878797878787",
      description: `A small river named Duden flows by their place and supplies it with the necessary regelialia. 
        It is a paradisematic country, in which roasted parts of sentences fly into your mouth`,
      published: "Jun 5,  2022",
      author: {
        name: "Flying High",
        img: "/images/author/author1.jpg",
        designation: "CEO and Founder",
      },
    },
    {
      title: "this is the dummy of the post 5",
      slug: "this-is-the-dummy-of-the-post-5",
      category: "Business, Travel",
      image: "/images/articles/posts/img5.png",

      user: "687878797878787",
      description: `A small river named Duden flows by their place and supplies it with the necessary regelialia. 
      It is a paradisematic country, in which roasted parts of sentences fly into your mouth`,
      published: "Jun 5,  2022",
      author: {
        name: "Flying High",
        img: "/images/author/author1.jpg",
        designation: "CEO and Founder",
      },
    },
    {
      title: "this is the dummy of the post 6",
      slug: "this-is-the-dummy-of-the-post-6",
      category: "Politics",
      image: "/images/articles/posts/img2.png",
      user: "287878797878787",
      description: `A small river named Duden flows by their place and supplies it with the necessary regelialia. 
      It is a paradisematic country, in which roasted parts of sentences fly into your mouth`,
      published: "Jun 5,  2022",
      author: {
        name: "Flying High",
        img: "/images/author/author1.jpg",
        designation: "CEO and Founder",
      },
    },
  ],
};
export default data;
