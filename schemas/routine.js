const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    default: 1, // 세트 수의 기본값은 1로 설정
  },
});

const routineSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  routine: {
    Monday: [exerciseSchema],
    Tuesday: [exerciseSchema],
    Wednesday: [exerciseSchema],
    Thursday: [exerciseSchema],
    Friday: [exerciseSchema],
    Saturday: [exerciseSchema],
    Sunday: [exerciseSchema],
  },
});

const Routine = mongoose.model("Routine", routineSchema);

module.exports = Routine;
