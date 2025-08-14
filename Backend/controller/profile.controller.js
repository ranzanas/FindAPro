import Experience  from "../models/experience.model";

export async function addExperience(){
    const {jobTitle, startDate, endDate, companyName, companyAddress, employmentType} = req.body;

    const experience = new Experience({
        jobTitle,
        startDate,
        endDate,
        companyName,
        companyAddress,
        employmentType
    })

    await experience.save();
    res.status(201).json({ message: 'Experience added successfully' });
}

