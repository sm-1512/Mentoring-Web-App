import mentorModel from "../models/mentorModel.js";


const changeAvailablity = async(req, res) => {
    try {
        const {mentorId} = req.body;
        const mentorData = await mentorModel.findById(mentorId);
        await mentorModel.findByIdAndUpdate(mentorId, {available : !mentorData.available});
        res.json({success: true, message: 'Availability changed'});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const mentorList = async(req, res) => {
    try {
        const mentors = await mentorModel.find({}).select(['-password', '-email']);

        res.json({success: true, mentors});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export {changeAvailablity, mentorList}