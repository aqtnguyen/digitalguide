const { Poi } = require("../models");
const { Op } = require("sequelize");
const path = require("path");
const multer = require("multer");

// 1. Create Poi

const createPoi = async (req, res) => {
  let poi = {
    title: req.body.title,
    poiText: req.body.poiText,
    hashtag: req.body.hashtag,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    counter: req.body.counter,
    poiImg: req?.file?.filename,
    tourTitle: req.body.tourTitle,
    adminId: req.body.adminId,
    tourId: req.body.tourId,
  };

  const createPoi = await Poi.create(poi);
  res.status(200).send(createPoi);
  console.log(createPoi);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("poiImg");

// 2. Get Poi

const getAllPois = async (req, res) => {
  const listOfPois = await Poi.findAll();
  res.json(listOfPois);
};

const getAdminPois = async (req, res) => {
  const adminId = req.params.adminId;
  const listOfPois = await Poi.findAll({ where: { adminId: adminId } });
  res.json(listOfPois);
};

const getPoiFromTour = async (req, res) => {
  const tourId = req.params.tourId;
  const poi = await Poi.findAll({ where: { tourId: tourId } });
  res.json(poi);
};

const getFilteredPois = async (req, res) => {
  const adminId = req.params.adminId;
  const data = req.params.data;
  const listOfTours = await Poi.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.regexp]: data } },
        { tourTitle: { [Op.regexp]: data } },
        { createdAT: { [Op.regexp]: data } },
      ],
      adminId: adminId,
    },
  });
  res.json(listOfTours);
};

const getOrderedPois = async (req, res) => {
  const adminId = req.params.adminId;
  const data = req.params.data;
  const order = req.params.order;
  const listOfTours = await Poi.findAll({
    order: [[data, order]],
    where: { adminId: adminId },
  });
  res.json(listOfTours);
};

const getPoiDetail = async (req, res) => {
  const id = req.params.id;
  const poi = await Poi.findAll({ where: { id: id } });
  res.json(poi);
};

// 3. Update a Poi

const updatePoi = async (req, res) => {
  const id = req.params.id;

  const newPoi = {
    title: req.body.title,
    poiText: req.body.poiText,
    hashtag: req.body.hashtag,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    poiImg: req.body.poiImg,
    tourTitle: req.body.tourTitle,
    tourId: req.body.tourId,
  };

  const updateNewPoi = await Poi.update(newPoi, { where: { id: id } });

  res.status(200).send(updateNewPoi);
};

const removePoi = async (req, res) => {
  const id = req.params.id;

  const removePoi = {
    tourTitle: req.body.tourTitle,
    tourId: req.body.tourId,
  };

  const updateNewPoi = await Poi.update(removePoi, { where: { tourId: id } });

  res.status(200).send(updateNewPoi);
};

const addCounter = async (req, res) => {
  const id = req.params.id;

  const data = {
    counter: 1,
  };

  const incrementPoi = await Poi.increment(data, { where: { id: id } });

  res.status(200).send(incrementPoi);
};

// 4. Delete a Poi

const deletePoi = async (req, res) => {
  const poiId = req.params.poiId;
  const adminId = req.params.adminId;
  await Poi.destroy({
    where: {
      id: poiId,
      adminId: adminId,
    },
  });
  res.json("Deleted");
};

// const deletePoiFromTour = async (req, res) => {
//   const tourId = req.params.tourId;
//   const deletedItem = await Poi.destroy({
//     where: {
//       tourId: tourId,
//     },
//   });
//   res.json(deletedItem);
// };

module.exports = {
  createPoi,
  getAllPois,
  getAdminPois,
  getPoiFromTour,
  getFilteredPois,
  getOrderedPois,
  getPoiDetail, // Mobile PoiScreen
  updatePoi,
  removePoi,
  addCounter,
  upload,
  deletePoi,
};
