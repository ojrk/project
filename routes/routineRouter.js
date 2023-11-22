// const express = require("express");
// const router = express.Router();
// const Routine = require("../schemas/routine");

// router.post("/api/save-routine", async (req, res) => {
//   try {
//     const { routine } = req.body;

//     const userId = req.session.userId;

//     await Routine.findOneAndUpdate({ userId }, { routine }, { upsert: true });

//     res.json({ message: "루틴이 성공적으로 저장되었습니다." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.get("/api/get-routine", async (req, res) => {
//   try {
//     const userId = req.session.userId;

//     const userRoutine = await Routine.findOne({ userId });

//     res.json({ routine: userRoutine ? userRoutine.routine : {} });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Routine = require("../schemas/routine");

router.post("/api/save-routine", async (req, res) => {
  try {
    const { routine } = req.body;

    const userId = req.session.userId;

    const updatedRoutine = {
      Monday: routine.Monday.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
      Tuesday: routine.Tuesday.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
      Wednesday: routine.Wednesday.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
      Thursday: routine.Thursday.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
      Friday: routine.Friday.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
      Saturday: routine.Saturday.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
      Sunday: routine.Sunday.map((exercise) => ({
        name: exercise.name,
        sets: exercise.sets,
      })),
    };

    await Routine.findOneAndUpdate(
      { userId },
      { routine: updatedRoutine },
      { upsert: true }
    );

    res.json({ message: "루틴이 성공적으로 저장되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/api/get-routine", async (req, res) => {
  try {
    const userId = req.session.userId;

    const userRoutine = await Routine.findOne({ userId });

    // 변경된 스키마에 맞게 응답 포맷 변경
    res.json({ routine: userRoutine ? userRoutine.routine : {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
