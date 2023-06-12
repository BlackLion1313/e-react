import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import { hashedPassword } from "../utils/encryptPassword.js";

const imageUpload = async (req, res) => {
  console.log("req.file", req.file);

  if (req.file) {
    //Upload file
    try {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "travelApp",
      });
      console.log("uploadImage", uploadImage);
      res.status(201).json({
        msg: "picture upload success",
        avatar: uploadImage.url,
      });
    } catch (error) {
      console.log("error uploading file", error);
    }
  } else {
    res.status(500).json({
      message: "Sorry file type not accepted",
    });
  }
};

const register = async (req, res) => {
  console.log("req.body", req.body);
  // const {email} = req.body // destructured
  // Check if the user is already in our database
  //CHECK Passwords and emails before saving (maybe use express validator pack, or regex, or your own solution)
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    console.log("existingUser", existingUser);
    if (!existingUser) {
      //if our user doesn't exist in our database, we store it
      try {
        const encryptedPassword = await hashedPassword(req.body.password);

        if (encryptedPassword) {
          const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: encryptedPassword,
            avatar: req.body.avatar,
          });
          const savedUser = await newUser.save();

          console.log("savedUser", savedUser);
          res.status(201).json({
            user: {
              userName: savedUser.userName,
              email: savedUser.email,
              avatar: savedUser.avatar,
            },
          });
        }
      } catch (error) {
        console.log("error saving user", error);
        res.status(500).json({
          msg: "error saving user",
        });
      }
    } else {
      res.status(200).json({
        msg: "sorry that email is already registered.",
      });
    }
  } catch (error) {
    console.log("error", error)
  }
};

export { imageUpload, register };