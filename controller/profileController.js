const User = require("../model/User");
const Profile = require("../model/Profile");
 
const createProfile = async (req, res) => {
  try {
    const { profileName, userName, bio, image } = req.body;

    // Check if the username already exists
    const existsUserName = await Profile.findOne({ userName });
    if (existsUserName) {
      res.status(404).json({ message: "username already existed" });
    }

    // Check if the user already exists
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create and save the new profile
    const saveProfile = new Profile({
      profileName,
      userName,
      bio,
      image,
      user: user._id,
    });

    await saveProfile.save();

    res.status(200).json({ message: "profile created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

 


// finding profiles byid function

const findProfileById = async (req, res) => {
  try {
    const profileId = req.params.id
    const profile = await Profile.findById(profileId);
    if (!profile) {
      res.status(404).json({ message: "profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server Error" });
  }
};


// finding profile by userName function

const findAllProfiles = async (req, res) => {
  try {
   
    const getProfile = await Profile.find();
    if (!getProfile) {
      res.status(404).json({ message: "profiles not found" });
    }
    res.status(200).json(getProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

// delete profile controller code

const deleteProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    await Profile.findByIdAndDelete(profileId);
    res.status(200).json({ message: "profile has been deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

// updating profile photo function
const updatePhoto = async (req, res) => {
  try {
    const { user, image } = req.body;
    await Profile.findOneAndUpdate(
      { user: user },
      { $set: { image: image } },
      { new: true }
    );

    res.status(200).json({ message: "image updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server Error" });
  }
};

module.exports = {
  createProfile,
  findAllProfiles,
  deleteProfile,
  updatePhoto,
  findProfileById
};
