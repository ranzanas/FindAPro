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



export async  function editUser(req, res){
  try {
    const { id } = req.params;
    const { firstName, lastName, email, phone, address, profession } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { firstName, lastName, email, phone, address, profession },
      },
      {
        new: true,               
        
      }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({ message: "Server error while updating user" });
  }
}