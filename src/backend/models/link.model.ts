import { Schema, model, models } from "mongoose";

const LinkSchema = new Schema(
  {
   
    platform: { type: "string", required: true },
    link: { type: "string", required: true },
    color: { type: "string", required: true },
    order_no: { type: "number", required: false },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Link = models.Link || model("Link", LinkSchema);

export default Link;
