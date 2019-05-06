const express = require("express");
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

//routes.get("/boxes", BoxController.index);
routes.get("/boxes/:id", BoxController.show);
routes.post("/boxes", BoxController.store);
//routes.put("/boxes/:id", BoxController.update);
//routes.delete("/boxes/:id", BoxController.destroy);

routes.get("/files", FileController.index);
routes.get("/files/:id", FileController.show);
routes.post(
  "/boxes/:id/files",
  multer(multerConfig).single("file"),
  FileController.store
);
routes.put("/files/:id", FileController.update);
routes.delete("/files/:id", FileController.destroy);

module.exports = routes;
