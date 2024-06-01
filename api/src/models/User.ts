import bcrypt from "bcrypt";
import mongoose, {HydratedDocument, Schema} from "mongoose";
import {User, UserMethods, UserModel} from "../type";
import {randomUUID} from 'crypto';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<User, UserModel, UserMethods>({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (this: HydratedDocument<User>, email: string): Promise<boolean> {
        if (!this.isModified("email")) return true;

        const user: HydratedDocument<User> | null = await User.findOne({email});
        const userBoolean = Boolean(user);
        return !userBoolean;
      },
      message: "This user is already registered!"
    },
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
  displayName: {
    type: String,
    required: true,
  },
  googleID: String || null,
  avatar: String || null,
}, {
  versionKey: false,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.set("toJSON", {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model<User, UserModel>("User", UserSchema);

export default User;