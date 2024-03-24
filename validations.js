import { body } from "express-validator";

export const loginValidation = [
  body("email", "Email is inValid").isEmail(),
  body("password", "Password is inValid").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Email is inValid").isEmail(),
  body("password", "Password is inValid").isLength({ min: 5 }),
  body("fullName", "FullName is inValid").isLength({ min: 3 }),
  body("avatarUrl", "AvatarURL is inValid").optional().isURL(),
];

export const postsCreateValidation = [
  body("title", "Title is inValid").isLength({ min: 3 }).isString(),
  body("text", "Text is inValid").isLength({ min: 10 }).isString(),
  body("tags", "Tags is inValid").optional().isArray(),
  body("imageUrl", "Image url is inValid").optional().isString(),
];
