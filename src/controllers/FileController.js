const Box = require("../models/Box");
const File = require("../models/File");

class FileController {
  async store(req, res) {
    const box = await Box.findById(req.params.id);
    const newFile = {
      name: req.file.originalname,
      path: req.file.key
    };

    if (!newFile.name || newFile.name === "")
      return res.json({ erro: "Campo name é obrigatório" });

    const file = await File.create(newFile);
    box.files.push(file);
    await box.save();

    req.io.sockets.in(box._id).emit("file", file);
    return res.json(file);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const files = await File.paginate({}, { page, limit: 10 });
    return res.json(files);
  }

  async show(req, res) {
    const file = await File.findById(req.params.id);
    return res.json(file);
  }

  async update(req, res) {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.json(file);
  }

  async destroy(req, res) {
    await File.findByIdAndRemove(req.params.id);
    return res.send();
  }
}

module.exports = new FileController();
