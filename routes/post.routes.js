const express = require("express");
const { PostModel } = require("../model/Post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const query = req.query;
  try {
    const posts = await PostModel.find(query);
    res.send(posts);
  } catch (error) {
    res.send({ msg: "Failed to get posts" });
    console.log("Failed to get posts");
    console.log(error);
  }
});
postRouter.post("/create", async (req, res) => {
  const { title, body, device, no_if_comments } = req.body;
  try {
    const post = new PostModel({ title, body, device, no_if_comments });
    await post.save();
    res.send({ msg: "post created successfully." });
  } catch (error) {
    res.send({ msg: "Failed to create post" });
    console.log("Failed to create post");
    console.log(error);
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  //   const { title, body, device, no_if_comments } = req.body;
  const payload = req.body;
  const ID = req.params.id;
  try {
    await PostModel.findByIdAndUpdate({ _id: ID }, payload);

    res.send({ msg: `post updated successfully with ID:${ID}` });
  } catch (error) {
    res.send({ msg: "Failed to updated post" });
    console.log("Failed to updated post");
    console.log(error);
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    await PostModel.findByIdAndDelete({ _id: ID });
    res.send({ msg: `post deleted successfully with ID:${ID}` });
  } catch (error) {
    res.send({ msg: "Failed to deleted post" });
    console.log("Failed to deleted post");
    console.log(error);
  }
});

module.exports = { postRouter };
