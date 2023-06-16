import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";
import { hashedPassword, verifyPassword } from "../utils/encryptPassword.js";
import { issueToken } from "../utils/jwtToken.js";

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
  const {email} = req.body // destructured
  // Check if the user is already in our database
  //CHECK!!!! Passwords and emails before saving (maybe use express validator pack, or regex, or your own solution)
  try {

    //checking if our user exists
    const existingUser = await userModel.findOne({ email: req.body.email });


    console.log("existingUser", existingUser);

    //пользователь с указанным email не существует в базе данных
    if (!existingUser) {
      //if our user doesn't exist in our database, we store it
      try {
        const encryptedPassword = await hashedPassword(req.body.password);

        if (encryptedPassword) {

          //создаем новый экземпляр userModel
          const newUser = new userModel({
            userName: req.body.userName,
            email: req.body.email,
            password: encryptedPassword,
            avatar: req.body.avatar,
          });

          //сохраняет новый экземпляр пользователя в базе данных с помощью метода save,
          // который возвращает сохраненный объект пользователя
          const savedUser = await newUser.save();

          console.log("savedUser", savedUser);
          //отправляет JSON-ответ с кодом состояния 201 (создан) и включает информацию о пользователе в теле ответа.
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

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await userModel.findOne({ email: email })
    console.log('existingUser', existingUser);
    if (!existingUser) {
      res.status(404).json({
        error: "Sorry, there is no user registered with this email",
      });
    } else {
      //if user exists-verify password
      try {
        const checkedPassword = await verifyPassword(
          password,
          existingUser.password
        );

        if (!checkedPassword) {
          //password is wrong
          res.status(401).json({
            error: "Wrong password please try again"
          });
        } else {
          //if credential are mathcing, we generate the JWT verifiedToken

          console.log('all Goog');

          const token = issueToken(existingUser._id);

          if (token) {
            res.status(200).json({
              msg: "Login successful!",
              //in this case we are sending user
              user: {
                userName: existingUser.userName,
                email: existingUser.email,
                avatar: existingUser.avatar,
              },
              token,
            });
          } else {
            console.log('PROBLEM WITH GENERATION TOKEN')
            res.status(500).json({
              msg: "Something went wrong during login",
            })
          }

        }
      } catch (error) {

      }
    }
  } catch (error) { }
};

const getProfile = async (req, res) => {
  console.log("req.user>>>", req.user);

  res.status(200).json({
    user: {
      userName: req.user.userName,
      email: req.user.email,
      avatar: req.user.avatar,
    },
  });
};

export { imageUpload, register, login, getProfile };