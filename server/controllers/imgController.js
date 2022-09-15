const { Image } = require("../models");
const path = require("path");
const multer = require("multer");

// 1. Create Image

const createImage = async (req, res) => {
  let img = {
    imgTitle: req.file.filename,
    tourId: req.body.tourId,
    poiId: req.body.poiId,
  };
  const saveImg = await Image.create(img);
  res.status(200).send(saveImg);
  console.log(saveImg);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    const date = new Date();
    cb(
      null,
      `${date.getDate()}` +
        `${date.getMonth() + 1}` +
        `${date.getFullYear()}` +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("imgTitle");

// 2. Get Image

const getAllImgs = async (req, res) => {
  const listOfImg = await Image.findAll();
  res.json(listOfImg);
};

const getTourImgs = async (req, res) => {
  const tourId = req.params.tourId;
  const listOfImg = await Image.findAll({ where: { tourId: tourId } });
  res.json(listOfImg);
};

const getPoiImgs = async (req, res) => {
  const poiId = req.params.poiId;
  const listOfImg = await Image.findAll({ where: { poiId: poiId } });
  res.json(listOfImg);
};

// 3. Delete Image

const deleteTourImg = async (req, res) => {
  const poiId = req.params.poiId;
  await Image.destroy({
    where: {
      id: poiId,
    },
  });
  res.json("Deleted");
};

const deletePoiImg = async (req, res) => {
  const poiId = req.params.poiId;
  await Image.destroy({
    where: {
      id: poiId,
    },
  });
  res.json("Deleted");
};

module.exports = {
  createImage,
  upload,
  getAllImgs,
  getTourImgs,
  getPoiImgs,
  deleteTourImg,
  deletePoiImg,
};
