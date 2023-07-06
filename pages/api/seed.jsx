
import Post from '../../models/Post';
import data from '../../utils/data';
import User from '../../models/User';
import db from '../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Post.deleteMany();
  await Post.insertMany(data.posts);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;