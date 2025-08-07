
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export async function register(req, res) {
  const { username, password, email, firstName, lastName, phone, address, profession } = req.body;

  const existing = await User.findOne({ username });
  if (existing) return res.status(400).send({ message: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
    phone,
    address,
    profession
  });

  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
}


export async function login(req,res){
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(401).send("user not found");

    const isMatch =  await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: "1h" });

    res.json({ message: "Login successful", user, token});
}

