const router = require("express").Router();
const Project = require("../models/Project");
const { authMiddleware } = require("../middleware/auth");

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/projects - Get all projects for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get("/", async (req, res) => {
	// This currently finds all projects in the database.
	// It should only find projects owned by the logged in user.
	try {
		const projects = await Project.find({ user: req.user._id });
		res.json(projects);
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET /api/projects/:id - Get a projects
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get("/:id", async (req, res) => {
	// This currently finds a projects in the database with an ID.
	// the owner is only one with permission to view it.
	try {
		// This needs an authorization check
		//get to be update note
		const project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(400).json({ message: "Invalid ID" });
		}
		// check if the user field on that note matches the authenticated user’s _id.
		if (project.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to view this project" });
		}

		res.json(project);
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST /api/projects - Create a new note
router.post("/", async (req, res) => {
	try {
		const note = await Project.create({
			...req.body,
			// The user ID needs to be added here
			user: req.user._id,
		});
		res.status(201).json(note);
	} catch (err) {
		res.status(400).json(err);
	}
});

// PUT /api/projects/:id - Update a note
router.put("/:id", async (req, res) => {
	try {
		// This needs an authorization check
		//get to be update note
		const getUpdateProject = await Project.findById(req.params.id);
		if (!getUpdateProject) {
			return res.status(400).json({ message: "Invalid ID" });
		}
		// check if the user field on that note matches the authenticated user’s _id.
		if (getDeleteProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to update this note" });
		}

		const note = await Project.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!note) {
			return res.status(404).json({ message: "No note found with this id!" });
		}
		res.json(note);
	} catch (err) {
		res.status(500).json(err);
	}
});

// DELETE /api/projects/:id - Delete a note
router.delete("/:id", async (req, res) => {
	try {
		// This needs an authorization check
		//get to be update note
		const getDeleteProject = await Project.findById(req.params.id);
		if (!getDeleteProject) {
			return res.status(400).json({ message: "Invalid ID" });
		}
		// check if the user field on that note matches the authenticated user’s _id.
		if (getDeleteProject.user.toString() !== req.user._id) {
			return res
				.status(403)
				.json({ message: "Not Authorize to delete this note" });
		}
		const note = await Project.findByIdAndDelete(req.params.id);
		if (!note) {
			return res.status(404).json({ message: "No note found with this id!" });
		}
		res.json({ message: "Note deleted!" });
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
