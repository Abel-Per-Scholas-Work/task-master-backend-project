const router = require("express").Router();
const Task = require("../models/Task");
const Project = require("../models/Project");
const { authMiddleware } = require("../middleware/auth");

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /:projectId/tasks- Get all task for the given project ID
router.get("/projects/:projectId/tasks", async (req, res) => {
	try {
		//verify the ownership
		const getViewProject = await Project.findById(req.params.projectId);
		if (!getViewProject) {
			return res.status(400).json({ message: "Invalid Project ID" });
		}
		// check if the user field on that task matches the authenticated user’s _id.
		if (getViewProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to view this project tasks" });
		}
		//if all checks out
		const task = await Task.find({ project: req.params.projectId });
		res.json(task);
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST /:projectId/tasks - Create a new task
router.post("/projects/:projectId/tasks", async (req, res) => {
	try {
		//verify the ownership
		const getViewProject = await Project.findById(req.params.projectId);
		if (!getViewProject) {
			return res.status(400).json({ message: "Invalid Project ID" });
		}
		// check if the user field on that task matches the authenticated user’s _id.
		if (getViewProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to add task this project" });
		}
		const task = await Task.create({
			...req.body,
			// The user ID needs to be added here
			project: req.params.projectId,
		});
		res.status(201).json(task);
	} catch (err) {
		res.status(400).json(err);
	}
});

// PUT /api/tasks/:taskId - Update a task
router.put("/tasks/:taskId", async (req, res) => {
	try {
		// This needs an authorization check
		//get to be update task
		const getUpdateTask = await Task.findById(req.params.taskId);
		if (!getUpdateTask) {
			return res.status(400).json({ message: "Invalid Task ID" });
		}
		//find the project owner
		const projectId = getUpdateTask.project;
		console.log(projectId);
		const getUpdateProject = await Project.findById(projectId);
		if (!getUpdateProject) {
			return res.status(400).json({ message: "Invalid project ID" });
		}
		// check if the user field on that task matches the authenticated user’s _id.
		if (getUpdateProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to update this task" });
		}

		const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
			new: true,
		});
		if (!task) {
			return res.status(404).json({ message: "No task found with this id!" });
		}
		res.json(task);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// DELETE /api/projects/:id - Delete a task
router.delete("/tasks/:taskId", async (req, res) => {
	try {
		// This needs an authorization check
		//get to be update task
		const getDeleteTask = await Task.findById(req.params.taskId);
		if (!getDeleteTask) {
			return res.status(400).json({ message: "Invalid Task ID" });
		}
		//find the project owner
		const projectId = getDeleteTask.project;
		console.log(projectId);
		const getUpdateProject = await Project.findById(projectId);
		if (!getUpdateProject) {
			return res.status(400).json({ message: "Invalid project ID" });
		}
		// check if the user field on that task matches the authenticated user’s _id.
		if (getUpdateProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to update this task" });
		}
		const task = await Task.findByIdAndDelete(req.params.taskId);
		if (!task) {
			return res.status(404).json({ message: "No task found with this id!" });
		}
		res.json({ message: "task deleted!" });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
