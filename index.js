import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  postsCreateValidation,
} from "./validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostsController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://sargisgasparyan081991:sargis.91@cluster0.1jcgkj9.mongodb.net/blog"
  )
  .then(() => {
    console.log("DB is connected");
  })
  .catch((err) => console.log(err, "error"));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file?.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//upload
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({ url: `/uploads/${req.file?.originalname}` });
});

//User model
app.get("/auth/me", checkAuth, UserController.getMe);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

//Posts model
app.get("/posts", PostsController.getAll);
app.get("/tags", PostsController.getLastTags);
app.get("/posts/:id", PostsController.getOne);
app.post("/posts", checkAuth, postsCreateValidation, PostsController.create);
app.delete("/posts/:id", checkAuth, PostsController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postsCreateValidation,
  handleValidationErrors,
  PostsController.update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(error);
  }
  console.log("server is connected");
});
