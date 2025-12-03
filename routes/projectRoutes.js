const router = require("express").Router();
const Project = require("../models/Project");
const { authMiddleware } = require("../middleware/auth");

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/notes - Get all notes for the logged-in user
// THIS IS THE ROUTE THAT CURRENTLY HAS THE FLAW
router.get("/", async (req, res) => {
	// This currently finds all notes in the database.
	// It should only find notes owned by the logged in user.
	try {
		const notes = await Project.find({ user: req.user._id });
		res.json(notes);
	} catch (err) {
		res.status(500).json(err);
	}
});

// POST /api/notes - Create a new note
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

// PUT /api/notes/:id - Update a note
router.put("/:id", async (req, res) => {
	try {
		// This needs an authorization check
		//get to be update note
		const getNote = await Project.findById(req.params.id);
		if (!getNote) {
			return res.status(400).json({ message: "Invalid ID" });
		}
		// check if the user field on that note matches the authenticated user’s _id.
		if (getNote.user.toString() !== req.user._id) {
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

// DELETE /api/notes/:id - Delete a note
router.delete("/:id", async (req, res) => {
	try {
		// This needs an authorization check
		//get to be update note
		const getNote = await Project.findById(req.params.id);
		if (!getNote) {
			return res.status(400).json({ message: "Invalid ID" });
		}
		// check if the user field on that note matches the authenticated user’s _id.
		if (getNote.user.toString() !== req.user._id) {
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
