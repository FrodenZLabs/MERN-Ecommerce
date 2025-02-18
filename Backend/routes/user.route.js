import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createClient,
  createGuarantor,
  deleteClient,
  deleteGuarantor,
  getAllClients,
  getAllGuarantors,
  getClientById,
  getGuarantorById,
  updateClient,
  updateGuarantor,
} from "../controllers/user.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/", verifyToken, getAllClients);
router.get("/get_guarantors", verifyToken, getAllGuarantors);
router.get("/:id", verifyToken, getClientById);
router.get("/get_guarantor/:id", verifyToken, getGuarantorById);
router.post(
  "/new_client",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "id_image", maxCount: 1 },
  ]),
  createClient
);
router.post("/new_guarantor", verifyToken, createGuarantor);
router.put("/update_client/:id", verifyToken, updateClient);
router.put("/update_guarantor/:id", verifyToken, updateGuarantor);
router.delete("/delete_client/:id", verifyToken, deleteClient);
router.delete("/delete_guarantor/:id", verifyToken, deleteGuarantor);

export default router;
