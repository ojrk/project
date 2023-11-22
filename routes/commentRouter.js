const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment");
router.post("/get", async (req, res) => {
  try {
    const board_id = req.body.board_id;

    if (!board_id) {
      return res.status(400).json({ message: "board_id is required." });
    }

    if (!Comment.modelName) {
      return res.status(500).json({ message: "Comment model is not defined." });
    }
    const comments = await Comment.find({ board: board_id });

    res.json({ comments: comments || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "댓글 조회 실패", error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { board_id, text } = req.body;
    if (!board_id || !text) {
      return res
        .status(400)
        .json({ message: "board_id and text are required." });
    }
    const newComment = new Comment({ board: board_id, text });
    await newComment.save();
    res.json({ message: "댓글이 추가되었습니다." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "댓글 추가 실패", error: err.message });
  }
});

module.exports = router;
