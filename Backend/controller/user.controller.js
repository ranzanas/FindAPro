import mongoose from "mongoose";
import User from "../models/user.model.js";

export async function getUsers(req, res) {
  try {
    const { name } = req.query;

    let query = {};

    if (name) {
  const regex = new RegExp(name, "i");

  if (mongoose.Types.ObjectId.isValid(name)) {
   
    query = { _id: name };
  } else {
  
    query = {
      $or: [
        { username: { $regex: regex } },
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", " ", "$lastName"] },
              regex: regex,
            },
          },
        },
        { profession: { $regex: regex } },
      ],
    };
  }
}


    const users = await User.find(query, { password: 0 });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getUsers:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
}
