const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);
    return res.json(box);
  }

  async show(req, res) {
    const boxe = await Box.findById(req.params.id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });
    return res.json(boxe);
  }

  async index(req, res) {
    const boxes = await Box.paginate();
    return res.json(boxes);
  }
}

module.exports = new BoxController();
