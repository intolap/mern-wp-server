const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    post_ID: {
      type: ObjectId,
      ref: "ItPosts",
    },
    comment_author_name: {
      type: String,
      require: true,
      default: "Core UI Guest User",
    },
    comment_author_email: {
      type: String,
      require: true,
      default: "null",
    },
    // comment_author_url: {
    //   type: String,
    //   require: true,
    // },
    comment_date: {
      type: String,
      require: true,
    },
    comment_date_gmt: {
      type: String,
      require: true,
    },
    comment_author_IP: {
      type: String,
      require: true,
    },
    comment_content: {
      type: String,
      require: true,
    },
    comment_approved: {
      type: Boolean,
      require: true,
    },
    comment_agent: {
      browser: {
        type: String,
        require: true,
      },
      device: {
        type: String,
        require: true,
      },
    },
    // comment_type: {
    //   type: String,
    //   enum: ["comment"],
    //   default: "comment",
    // },
    comment_parent: {
      type: String,
      require: true,
      default: 0,
    },
    user_id: {
      type: ObjectId,
      ref: "ItUsers",
      default: null,
    },
  },
  { timestamps: true, versionkey: false }
);

module.exports = mongoose.model("Comment", commentSchema);
