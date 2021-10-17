import asyncHandler from "express-async-handler";
import Assignment from "../models/assignmentModel.js";
//@desc Fetch All Assignments
//@route GET /api/assignments
//@access Public

const getAssignments = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({}).populate("user", "id name");
  res.json(assignments);
});
//@desc Get an assignment with a particular id
//@route GET /api/assignments/:id
//@access Public

const getAssignmentById = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (assignment) {
    res.json(assignment);
  } else {
    res.status(404);
    throw new Error("Assignment Not Found");
  }
});

//@desc Delete an Assignment
//@route DELETE /api/assignments/:id
//@access Private/Admin

const deleteAssignment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (assignment) {
    await assignment.remove();
    res.json({ message: "Assignment Removed" });
  } else {
    res.status(404);
    throw new Error("Assignment Not Found");
  }
});

//@desc Create an Assignment
//@route POST /api/assignments
//@access Private/Admin

const createAssignment = asyncHandler(async (req, res) => {
  const assignment = new Assignment({
    name: "Sample Name",

    assignedBy: req.user._id,
    file: "/files/sample.docx",

    description: "Sample Description",
  });
  const createdAssignment = await assignment.save();
  res.status(201).json(createdAssignment);
});

//@desc Update an Assignment
//@route PUT /api/assignments/:id
//@access Private/Admin

const updateAssignment = asyncHandler(async (req, res) => {
  const { name, description, file, assignedBy, isEvaluated } = req.body;

  const assignment = await Assignment.findById(req.params.id);
  if (assignment) {
    assignment.name = name;
    assignment.description = description;
    assignment.file = file;
    assignment.isEvaluated = isEvaluated;
    assignment.assignedBy = assignedBy;
    const updatedAssignment = await assignment.save();
    res.status(201).json(updatedAssignment);
  } else {
    res.status(404);
    throw new Error("Assignment Not Found");
  }
});

export {
  getAssignments,
  getAssignmentById,
  deleteAssignment,
  createAssignment,
  updateAssignment,
};
