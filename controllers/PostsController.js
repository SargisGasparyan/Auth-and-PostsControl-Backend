import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "We cant get all posts" });
  }
};

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((post) => post.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "We cant get all posts" });
  }
};

export const getOne = (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: "after" }
    )
      .then((post) => {
        if (!post) {
          return res.status(404).json({
            message: "статьтя не найдена",
          });
        }

        res.json(post);
      })
      .populate("user");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "We cant give one post..." });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "We cant create post" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.prams.id;
    PostModel.findOneAndDelete({ _id: postId }).then((res) => {
      if (!res) {
        return res.status(404).json({
          message: "статьтя не найдена",
        });
      }

      res.json({ success: true });
    });
  } catch (error) {
    res.status(500).json({ message: "We cant delete post" });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "We cant update post" });
  }
};
