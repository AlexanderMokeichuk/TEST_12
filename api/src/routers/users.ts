import express from "express";
import mongoose, {mongo} from "mongoose";
import User from "../models/User";
import {clearImages, imagesUpload} from "../multer";
import {OAuth2Client} from "google-auth-library";
import config from "../config";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null,
      googleID: null,
    });

    user.generateToken();
    await user.save();

    return res.send({message: "Registered successfully!", user});
  } catch (e) {
    if (req.file) {
      clearImages(req.file.filename);
    }
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    if (e instanceof mongo.MongoServerError && e.code === 11000) {
      return res.status(422).send({error: "This login is already in use!!"});
    }

    next(e);
  }
});

usersRouter.post("/sessions", async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({error: "Incorrect data!!"});
  }
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).send({error: "email or password are not correct!!"});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: "Email or password are not correct!!"});
    }

    user.generateToken();
    user.save();
    return res.send({message: "Email and password correct!", user});
  } catch (e) {
    next();
  }
});

usersRouter.post("/google", async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: "Google login failed."});
    }

    const email = payload["email"];
    const id = payload["sub"];
    const displayName = payload["name"];
    const avatar = payload["picture"];

    if (!email) {
      return res.status(400).send({error: "Email is required."});
    }

    let user = await User.findOne({googleID: id});

    if (!user) {
      user = new User({
        email: email,
        password: crypto.randomUUID(),
        googleID: id,
        displayName: displayName,
        avatar: avatar,
      });
    }

    user.generateToken();
    await user.save();

    return res.send({message: "Logged in via google", user});
  } catch (e) {
    console.log(e);
    next(e);
  }
});

usersRouter.delete("/sessions", async (req, res, next) => {
  try {
    const headerValue = req.get("Authorization");
    const successMessage = {message: "Successfully logout"};

    if (!headerValue) {
      return res.send(successMessage);
    }

    const [, token] = headerValue.split(" ");

    const user = await User.findOne({token});

    if (!user) {
      return res.send(successMessage);
    }

    user.generateToken();
    await user.save();

    return res.send(successMessage);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;