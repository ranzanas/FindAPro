
import Experience from "../models/experience.model.js";
import Education from "../models/education.model.js";

export async function addExperience(req, res) {
  try {
    
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

  
    const { jobTitle, startDate, endDate, companyName, companyAddress, employmentType } = req.body;

    const experience = new Experience({
      user: userId,
      jobTitle,
      startDate,
      endDate,
      companyName,
      companyAddress,
      employmentType,
    });
    await experience.save();
    return res.status(201).json({ message: "Experience added successfully", experience });
  } catch (err) {
    console.error("addExperience error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function getExperiences(req, res) {
  try {
    const userId = req.user?.id; 
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const experiences = await Experience.find({ user: userId });

    return res.status(200).json({ experiences });
  } catch (err) {
    console.error("getExperiences error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getExperiencesByUserId(req, res) {
  try {
    const { userId } = req.params;
    const experiences = await Experience
      .find({ user: userId });

    return res.status(200).json({ experiences });
  } catch (err) {
    console.error("getExperiencesByUserId error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}





export async function editExperience(req, res) {
  try {
    const userId = req.user?.id;           
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;                  
    const { jobTitle, startDate, endDate, companyName, companyAddress, employmentType } = req.body;

    
    const updated = await Experience.findOneAndUpdate(
      { _id: id, user: userId },
      {
        $set: {
          jobTitle,
          startDate,
          endDate,
          companyName,
          companyAddress,
          employmentType,
        },
      },
      { new: true } 
    );

    if (!updated) return res.status(404).json({ message: "Experience not found" });

    return res.status(200).json({ message: "Experience updated successfully", experience: updated });
  } catch (err) {
    console.error("editExperience error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function deleteExperience(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;

    const deleted = await Experience.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) return res.status(404).json({ message: "Experience not found" });

    return res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    console.error("deleteExperience error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}


export  async function addEducation(req, res) {
  
  try{
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { schoolName, startDate, endDate, degreeName, schoolLocation } = req.body;

    const education = new Education({
      user: userId,
      schoolName,
      startDate,
      endDate,
      degreeName,
      schoolLocation
    });
    await education.save();
    return res.status(201).json({message: "Education Added Successfully" , education})
  }
  
  catch(err){
    console.error("addExperience error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function getEducations(req, res) {
  try {
    const userId = req.user?.id; 
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const educations = await Education
      .find({ user: userId })
      

    return res.status(200).json({ educations });
  } catch (err) {
    console.error("getEducations error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}


export async function getEducationsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const educations = await Education.find({ user: userId })
    return res.status(200).json({ educations });
  } catch (err) {
    console.error("getEducationsByUserId error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
