import { Schema, model, models } from "mongoose";

const LinkSchema = new Schema(
  {
    key: { type: "string", required: true },
    label: { type: "string", required: true },
    url: { type: "string", required: true },
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
