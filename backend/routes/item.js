const { Router } = require("express");
const itemController = require("../controllers/itemControllers");
const router = Router();
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/items", itemController.get_items);
router.post("/items", upload.single("image"), itemController.post_item);
router.put("/items/:id", itemController.update_item);
router.delete("/items/:id", itemController.delete_item);

module.exports = router;
