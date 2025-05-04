import express from "express";
import {
    updatedUser,
    deleteUser,
    getAllUser,
    getSingleUser,
    getUserProfile,
    getMyAppointments,
    fixInsecurePhotoURLs, // ✅ New controller added
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// ✅ Routes
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", authenticate, restrict(["admin"]), getAllUser);
router.put("/:id", authenticate, restrict(["patient"]), updatedUser);
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);
router.get("/appointments/my-appointments", authenticate, restrict(["patient"]), getMyAppointments);

// ✅ New route to fix photo URLs
router.put("/fix/photo-urls", authenticate, restrict(["admin"]), fixInsecurePhotoURLs);

export default router;




