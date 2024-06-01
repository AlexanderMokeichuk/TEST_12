import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import PhotoCard from "./models/PhotoCard";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, sipping drop..`);
  }
};

const collections = ["users", "photoCards"];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [userOne, userTwo] = await User.create(
    {
      email: "Alex",
      password: "1234",
      token: crypto.randomUUID(),
      role: "admin",
      googleID: null,
      displayName: "Sasha",
    },
    {
      email: "Evgeny",
      password: "1234",
      token: crypto.randomUUID(),
      role: "user",
      googleID: null,
      displayName: "John",
    },
  );

  await PhotoCard.create(
    {
      userID: userOne,
      title: "Test(Alex)",
      image: "fixtures/2u4sj945d1favu9tzsh9vuxptzsslbrf.png",
    },
    {
      userID: userOne,
      title: "Test2(Alex)",
      image: "fixtures/3ybd14rqjo3x19wl1xz4grqg2oeybk4f.jpg",
    },
    {
      userID: userTwo,
      title: "Test1(Evgeny)",
      image: "fixtures/58hp90pstd6nksc10yefky63zh9mzd3i.jpg",
    },
    {
      userID: userTwo,
      title: "Test2(Evgeny)",
      image: "fixtures/31298_2500.jpg",
    }
  );


  await db.close();
};

void run();