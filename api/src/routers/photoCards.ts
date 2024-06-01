import express from "express";
import {clearImages, imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import {PhotoCardFront} from "../type";
import PhotoCard from "../models/PhotoCard";

const photoCardsRouter = express.Router();

photoCardsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req, res, next) => {
    const user = (req as RequestWithUser).user!;
    try {
      const whiteList: PhotoCardFront = {
        userID: user.id,
        title: req.body.title,
        image: req.file ? req.file.filename : null,
      };

      const photoCard = new PhotoCard(whiteList);
      await photoCard.save();

      return res.send(photoCard);
    } catch (e) {
      if (req.file) {
        clearImages(req.file.filename);
      }
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }
      next(e);
    }
  });

photoCardsRouter.get("/", async (req, res, next) => {
  const query = req.query.user as string;
  try {
    if (query) {
      if (!mongoose.Types.ObjectId.isValid(query)) {
        return res.status(422).send({error: "Not found User!!"});
      }
      const photoCardsByQuery = await PhotoCard.find({userID: query});

      return res.send(photoCardsByQuery);
    }

    const photoCards = await PhotoCard.find().populate(
      "userID",
      "displayName"
    );

    return res.send(photoCards);
  } catch (e) {
    next(e);
  }
});

photoCardsRouter.delete("/:id", auth, async (req, res, next) => {
  const id = req.params.id;
  const user = (req as RequestWithUser).user!;

  try {
    const check = await PhotoCard.findById({_id: id});
    if (!check) {
      return res.status(404).send({error: "Not found Photo card!"});
    } else if(user._id.toString() === check.userID.toString() || user.role === "admin") {
      await PhotoCard.findOneAndDelete({_id: id});
      return res.send({ message: 'Deleted!', id: id });
    }

    return res.status(403).send({ error: "Access is denied!!" });
  } catch (e) {
    next(e);
  }
});

export default photoCardsRouter;