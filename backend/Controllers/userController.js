import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

// ✅ Update user and force HTTPS in the photo field
export const updatedUser = async (req, res) => {
    const id = req.params.id;

    try {
        // Replace http with https in the photo field, if necessary
        if (req.body.photo && req.body.photo.startsWith('http://')) {
            req.body.photo = req.body.photo.replace('http://', 'https://');
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};

// ❌ Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

// 🔎 Get user by ID
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select("-password");

        res.status(200).json({
            success: true,
            message: "User found",
            data: user,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "No user found" });
    }
};

// 🔎 Get all users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({
            success: true,
            message: "Users found",
            data: users,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};

// 🔒 Get profile of the authenticated user
export const getUserProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const { password, ...rest } = user._doc;

        res.status(200).json({
            success: true,
            message: 'Profile info is retrieved',
            data: { ...rest },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get profile" });
    }
};

// 📅 Get appointments of the authenticated user
export const getMyAppointments = async (req, res) => {
    try {
        // Step 1 - retrieve bookings for the user
        const bookings = await Booking.find({ user: req.userId });

        // Step 2 - extract doctor IDs from bookings
        const doctorIds = bookings.map(el => el.doctor.id);

        // Step 3 - find doctors by IDs
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select('-password');

        res.status(200).json({ success: true, message: 'Appointments retrieved', data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get appointments" });
    }
};

// 🛠️ New endpoint: Fix photo URLs that use http:// instead of https://
export const fixInsecurePhotoURLs = async (req, res) => {
    try {
        const users = await User.find({});
        let count = 0;

        for (let user of users) {
            if (user.photo?.startsWith("http://")) {
                user.photo = user.photo.replace("http://", "https://");
                await user.save();
                count++;
            }
        }

        res.status(200).json({
            success: true,
            message: `${count} users updated with secure photo URLs.`,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fix photo URLs." });
    }
};
