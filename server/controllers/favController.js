const { Favorite } = require("../models");

// 1. Create Favorite

const createFav = async (req, res) => {
  const touristId = req.body.touristId;
  const tourId = req.body.tourId;

  const found = await Favorite.findOne({
    where: { touristId: touristId, tourId: tourId },
  });

  if (!found) {
    await Favorite.create({ touristId: touristId, tourId: tourId });
    res.json({ fav: true });
  } else {
    await Favorite.destroy({
      where: { touristId: touristId, tourId: tourId },
    });
    res.json({ fav: false });
  }
};

// 2. Get Favorite

const getListedFavs = async (req, res) => {
  const touristId = req.params.touristId;
  const listOfFavs = await Favorite.findAll({
    where: { touristId: touristId },
  });
  res.json(listOfFavs);
};

const getCheckedFavs = async (req, res) => {
  const tourId = req.params.tourId;
  const touristId = req.params.touristId;
  const found = await Favorite.findOne({
    where: { touristId: touristId, tourId: tourId },
  });

  if (found) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
};

// 3. Delete Favorite

const deleteFav = async (req, res) => {
  const tourId = req.params.tourId;
  const touristId = req.params.touristId;
  await Favorite.destroy({
    where: {
      tourId: tourId,
      touristId: touristId,
    },
  });
  res.json("Deleted");
};

module.exports = {
  createFav,
  getListedFavs,
  getCheckedFavs,
  deleteFav,
};
