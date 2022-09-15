const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController.js");

router.post("/", quizController.createQuiz);

router.get("/:poiId", quizController.getQuizFromPoi);

module.exports = router;
