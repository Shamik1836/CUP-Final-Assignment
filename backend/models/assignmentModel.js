import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema(
  {
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isEvaluated: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Assignment =
  mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);
export default Assignment;
