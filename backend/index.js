require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const User = require('./models/user.model');
const Note = require('./models/note.model');
const { authenticateToken } = require('./utilities');

const app = express();
const PORT = process.env.PORT || 8000;

// This improved CORS setup is crucial for allowing authentication headers
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));


// --- PUBLIC ROUTES ---

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required." });
    }

    try {
        const isUser = await User.findOne({ email: email.toLowerCase() });
        if (isUser) {
            return res.status(400).json({ error: true, message: "An account with this email already exists." });
        }

        const user = new User({ fullName, email, password });
        await user.save();

        // Standardized token payload
        const userPayload = { user: { _id: user._id, fullName: user.fullName, email: user.email } };
        const accessToken = jwt.sign(userPayload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(201).json({ error: false, message: "Account created successfully", accessToken });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal server error during account creation." });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "Email and password are required." });
    }

    try {
        const userInfo = await User.findOne({ email: email.toLowerCase() });
        
        // FIXED: Using the secure bcrypt comparePassword method from your user model
        if (!userInfo || !(await userInfo.comparePassword(password))) {
            return res.status(400).json({ error: true, message: "Invalid email or password." });
        }

        // Standardized token payload
        const userPayload = { user: { _id: userInfo._id, fullName: userInfo.fullName, email: userInfo.email } };
        const accessToken = jwt.sign(userPayload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ error: false, message: "Login Successful", accessToken });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal Server Error during login." });
    }
});


// --- PROTECTED ROUTES (All routes below require a valid token) ---

app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;
    try {
        const isUser = await User.findById(user._id);
        if (!isUser) {
            return res.sendStatus(401);
        }
        return res.json({
            error: false,
            user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id }
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

// All note routes are now correctly protected by authenticateToken
app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    if (!title || !content) return res.status(400).json({ error: true, message: "Title and content are required." });
    try {
        const note = new Note({ userId: user._id, title, content, tags: tags || [] });
        await note.save();
        return res.status(201).json({ error: false, note, message: "Note added successfully." });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found." });
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;
        await note.save();
        return res.status(200).json({ error: false, note, message: "Note updated successfully." });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user;
    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1, updatedAt: -1 });
        return res.status(200).json({ error: false, notes });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { user } = req.user;
    try {
        const result = await Note.deleteOne({ _id: noteId, userId: user._id });
        if (result.deletedCount === 0) return res.status(404).json({ error: true, message: "Note not found." });
        return res.status(200).json({ error: false, message: "Note deleted successfully." });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { isPinned } = req.body;
    const { user } = req.user;
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found." });
        note.isPinned = isPinned;
        await note.save();
        return res.status(200).json({ error: false, note, message: "Note pin status updated." });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal server error." });
    }
});


// --- SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

