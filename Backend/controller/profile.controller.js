
import Experience from "../models/experience.model.js";

export async function addExperience(req, res) {
  try {
    
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

  
    const { jobTitle, startDate, endDate, companyName, companyAddress, employmentType } = req.body;

    const experience = await Experience.create({
      user: userId,
      jobTitle,
      startDate,
      endDate,
      companyName,
      companyAddress,
      employmentType,
    });

    return res.status(201).json({ message: "Experience added successfully", experience });
  } catch (err) {
    console.error("addExperience error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
