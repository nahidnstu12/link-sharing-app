import Link from "@/backend/models/link.model";
import { Types } from "mongoose";
import { BaseService } from "./base.service";

class LinkService extends BaseService {
  async linkList(userId: any) {
    return Link.find({ user_id: userId });
  }

  async findLink(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Provide valid link id");
    }
    return Link.findById(id);
  }

  async createLink(body: object) {
    const newLink = new Link(body);
    return await newLink.save();
  }

  async updateLink(body: any, id: string) {
    // TODO: need to validate body
    const modfiedBody = { ...body };
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Provide valid link id");
    }

    const updatedLink = await Link.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      modfiedBody,
      { new: true }
    );

    return updatedLink;
  }
  async deleteLink(id: string) {
    const link = await Link.findById(id);
    if (!link) return false;
    return await Link.findByIdAndDelete(new Types.ObjectId(id));
  }
}

export default LinkService;
