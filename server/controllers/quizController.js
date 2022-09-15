const { Quiz } = require("../models");

// 1. Create Quiz

const createQuiz = async (req, res) => {
  const question = req.body.question;
  const answer1 = req.body.answer1;
  const answer2 = req.body.answer2;
  const answer3 = req.body.answer3;
  const poiId = req.body.poiId;

  const found = await Quiz.findOne({
    where: { poiId: poiId },
  });

  if (!found) {
    await Quiz.create({
      question: question,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      poiId: poiId,
    });
    res.json({ quiz: true });
  } else {
    await Quiz.update(
      {
        question: question,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        poiId: poiId,
      },
      { where: { poiId: poiId } }
    );
    res.json({ quiz: false });
  }
};

// 1. Get Quiz

const getQuizFromPoi = async (req, res) => {
  const poiId = req.params.poiId;
  const found = await Quiz.findOne({
    where: { poiId: poiId },
  });

  if (found) {
    res.json({ found, status: true });
  } else {
    res.json({ status: false });
  }
};

module.exports = {
  createQuiz,
  getQuizFromPoi,
};
