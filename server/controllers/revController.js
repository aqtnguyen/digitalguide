const { Review } = require("../models");

// 1. Create Review

const createReview = async (req, res) => {
  const tourId = req.body.tourId;
  const touristId = req.body.touristId;
  const touristName = req.body.touristName;
  const reviewText = req.body.reviewText;
  const reviewRating = req.body.reviewRating;

  const found = await Review.findOne({
    where: { tourId: tourId, touristId: touristId },
  });

  if (!found) {
    await Review.create({
      tourId: tourId,
      touristId: touristId,
      touristName: touristName,
      reviewText: reviewText,
      reviewRating: reviewRating,
    });
    res.json({ fav: true });
  } else {
    await Review.update(
      {
        tourId: tourId,
        touristId: touristId,
        touristName: touristName,
        reviewText: reviewText,
        reviewRating: reviewRating,
      },
      { where: { tourId: tourId, touristId: touristId } }
    );
    res.json({ fav: false });
  }
};

// 2. Get Review

const getListedReviews = async (req, res) => {
  const tourId = req.params.tourId;
  const listOfRevs = await Review.findAll({
    order: [["createdAt", "DESC"]],
    where: { tourId: tourId },
  });
  res.json(listOfRevs);
};

const getTouristReview = async (req, res) => {
  const tourId = req.params.tourId;
  const touristId = req.params.touristId;
  const found = await Review.findOne({
    where: { touristId: touristId, tourId: tourId },
  });

  if (found) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
};

// 3. Delete Review

const deleteReview = async (req, res) => {
  const tourId = req.params.tourId;
  const touristId = req.params.touristId;
  await Review.destroy({
    where: {
      tourId: tourId,
      touristId: touristId,
    },
  });
  res.json("Deleted");
};

module.exports = {
  createReview,
  getListedReviews,
  getTouristReview,
  deleteReview,
};
