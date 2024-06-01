import mongoose, {Schema} from "mongoose";
import {PhotoCardFront} from "../type";

const PhotoCardSchema = new Schema<PhotoCardFront>({
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