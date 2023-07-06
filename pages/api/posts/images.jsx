import Post from '../../../models/Post';
import db from '../../../utils/db';


const handler = async (req, res) => {
  await db.connect();
  const images = await Post.find().distinct('image');
  await db.disconnect();
  res.send(images);
};

export default handler;