const { Tour } = require("../models");
const { Op } = require("sequelize");
const path = require("path");
const multer = require("multer");

// 1. Create Tour

const createTour = async (req, res) => {
  let tour = {
    title: req.body.title,
    tourText: req.body.tourText,
    city: req.body.city,
    hashtag: req.body.hashtag,
    counter: req.body.counter,
    tourImg: req.file.filename,
    adminId: req.body.adminId,
  };

  const createTour = await Tour.create(tour);
  res.status(200).send(createTour);
  console.log(createTour);
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
}).single("tourImg");

// 2. Get Tour

const getAllTours = async (req, res) => {
  const listOfTours = await Tour.findAll();
  res.json(listOfTours);
};

const getAdminTours = async (req, res) => {
  const adminId = req.params.adminId;
  const listOfTours = await Tour.findAll({ where: { adminId: adminId } });
  res.json(listOfTours);
};

const getTourForAssemble = async (req, res) => {
  const tourId = req.params.tourId;
  const listOfTours = await Tour.findAll({ where: { id: tourId } });
  res.json(listOfTours);
};

const getFilteredTours = async (req, res) => {
  const adminId = req.params.adminId;
  const data = req.params.data;
  const listOfTours = await Tour.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.regexp]: data } },
        { city: { [Op.regexp]: data } },
        { createdAT: { [Op.regexp]: data } },
      ],
      adminId: adminId,
    },
  });
  res.json(listOfTours);
};

const getOrderedTours = async (req, res) => {
  const adminId = req.params.adminId;
  const data = req.params.data;
  const order = req.params.order;
  const listOfTours = await Tour.findAll({
    order: [[data, order]],
    where: { adminId: adminId },
  });
  res.json(listOfTours);
};

const getOrderedMobile = async (req, res) => {
  const data = req.params.data;
  const order = req.params.order;
  const listOfTours = await Tour.findAll({
    order: [[data, order]],
  });
  res.json(listOfTours);
};

const getToursFromMobileSearch = async (req, res) => {
  const term = req.params.term;
  const duration = req.params.duration;
  const distance = req.params.distance;

  if (term === "null" && duration === "0") {
    const listOfTours = await Tour.findAll({
      where: { distance: { [Op.lte]: distance } },
    });
    res.json(listOfTours);
  } else if (term === "null" && distance === "0") {
    const listOfTours = await Tour.findAll({
      where: { duration: { [Op.lte]: duration } },
    });
    res.json(listOfTours);
  } else if (duration === "0" && term !== "null" && distance !== "0") {
    const listOfTours = await Tour.findAll({
      where: {
        [Op.or]: [
          { city: { [Op.regexp]: term } },
          { hashtag: { [Op.regexp]: term } },
        ],
        distance: { [Op.lte]: distance },
      },
    });
    res.json(listOfTours);
  } else if (term === "null" && duration !== "0" && distance !== "0") {
    const listOfTours = await Tour.findAll({
      where: {
        [Op.and]: [
          { duration: { [Op.lte]: duration } },
          { distance: { [Op.lte]: distance } },
        ],
      },
    });
    res.json(listOfTours);
  } else if (distance === "0" && term !== "null" && duration !== "0") {
    const listOfTours = await Tour.findAll({
      where: {
        [Op.or]: [
          { city: { [Op.regexp]: term } },
          { hashtag: { [Op.regexp]: term } },
        ],
        duration: { [Op.lte]: duration },
      },
    });
    res.json(listOfTours);
  } else {
    const listOfTours = await Tour.findAll({
      where: {
        [Op.or]: [
          { city: { [Op.regexp]: term } },
          { hashtag: { [Op.regexp]: term } },
        ],
      },
    });
    res.json(listOfTours);
  }
};

// 3. Update Tour

const updateTour = async (req, res) => {
  let id = req.params.id;

  let newTour = {
    title: req.body.title,
    tourText: req.body.tourText,
    city: req.body.city,
    hashtag: req.body.hashtag,
    tourImg: req.body.tourImg,
  };

  const updateNewTour = await Tour.update(newTour, { where: { id: id } });

  res.status(200).send(updateNewTour);
};

const completeTour = async (req, res) => {
  let id = req.params.id;

  let data = {
    distance: req.body.distance,
    duration: req.body.duration,
  };

  const closeTour = await Tour.update(data, { where: { id: id } });

  res.status(200).send(closeTour);
};

const addCounter = async (req, res) => {
  let id = req.params.id;

  let data = {
    counter: 1,
  };

  const incrementTour = await Tour.increment(data, { where: { id: id } });

  res.status(200).send(incrementTour);
};

// 4. Delete Tour

const deleteTour = async (req, res) => {
  const tourId = req.params.tourId;
  const adminId = req.params.adminId;
  await Tour.destroy({
    where: {
      id: tourId,
      adminId: adminId,
    },
  });
  res.json("Deleted");
};

module.exports = {
  createTour,
  getAllTours,
  getAdminTours,
  getTourForAssemble, // Tourcontent & EditTour
  getFilteredTours,
  getOrderedTours,
  getOrderedMobile,
  getToursFromMobileSearch,
  updateTour,
  completeTour,
  addCounter,
  upload,
  deleteTour,
};
