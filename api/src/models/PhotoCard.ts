import mongoose, {Schema} from "mongoose";
import {PhotoCard} from "../type";

const PhotoCardSchema = new Schema<PhotoCard>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: String || null,
});

const PhotoCard = mongoose.model("PhotoCard", PhotoCardSchema);

export default PhotoCard;