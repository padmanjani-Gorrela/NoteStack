require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Assuming these models are in the correct path
const User = require('./models/user.model');
const Note = require('./models/note.model');

// CORRECTED: Import the authenticateToken function from your utilities file
const { authenticateToken } = require('./utilities');

const app = express();
const PORT = process.env.PORT || 8000;

// ---------------------- MIDDLEWARE ----------------------

app.use(cors({ origin: "*" }));
app.use(express.json());

// --- The authenticateToken function has been moved to utilities.js ---

// ---------------------- DATABASE ------------------------
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// ---------------------- ROUTES --------------------------

app.get('/', (req, res) => {
    res.json({ message: 'API is running!' });
});

// == User Routes ==
app.post("/create-account", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName) return res.status(400).json({ error: true, message: "Full Name is required" });
        if (!email) return res.status(400).json({ error: true, message: "Email is required" });
        if (!password) return res.status(400).json({ error: true, message: "Password is required" });

        const isUser = await User.findOne({ email: email.toLowerCase() });
        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        const user = new User({ fullName, email, password });
        await user.save();

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' });

        return res.status(201).json({
            error: false,
            message: "Account created successfully",
            accessToken
        });
    } catch (err) {
        console.error("Error creating account:", err);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ error: true, message: "Email is required" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required" });

    try {
        const userInfo = await User.findOne({ email: email.toLowerCase() });

        if (!userInfo || !(await userInfo.comparePassword(password))) {
            return res.status(400).json({ error: true, message: "Invalid email or password" });
        }

        const payload = { id: userInfo._id, email: userInfo.email };
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' });

        return res.status(200).json({
            error: false,
            message: "Login Successful",
            email: userInfo.email,
            accessToken
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.get("/get-user", authenticateToken, async (req, res) => {
    const userId = req.user.id;
    try {
        const isUser = await User.findOne({ _id: userId });
        if (!isUser) {
            return res.status(404).json({ error: true, message: "User not found" });
        }
        return res.json({
            error: false,
            user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn }
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

// == Note Routes ==

app.post("/add-note", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { id: userId } = req.user;

    if (!title) return res.status(400).json({ error: true, message: "Title is required" });
    if (!content) return res.status(400).json({ error: true, message: "Content is required" });

    try {
        const note = new Note({
            userId,
            title,
            content,
            tags: tags || [],
        });
        await note.save();
        return res.status(201).json({
            error: false,
            note,
            message: "Note added successfully"
        });
    } catch (err) {
        console.error("Error adding note:", err);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { title, content, tags, isPinned } = req.body;
    const { id: userId } = req.user;

    if (!title && !content && !tags && isPinned === undefined) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned !== undefined) note.isPinned = isPinned;
        await note.save();
        return res.status(200).json({ error: false, note, message: "Note updated successfully" });
    } catch (err) {
        console.error("Error editing note:", err);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { id: userId } = req.user;
    try {
        const notes = await Note.find({ userId }).sort({ isPinned: -1, updatedAt: -1 });
        return res.status(200).json({
            error: false,
            notes,
            message: "Notes fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { id: userId } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found or you don't have permission to delete it" });
        }
        await Note.deleteOne({ _id: noteId, userId });
        return res.status(200).json({ error: false, message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
    const { noteId } = req.params;
    const { isPinned } = req.body;
    const { id: userId } = req.user;

    try {
        const note = await Note.findOne({ _id: noteId, userId });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }
        note.isPinned = isPinned;
        await note.save();
        return res.status(200).json({ error: false, note, message: "Note pin status updated successfully" });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
});

// ---------------------- SERVER --------------------------
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;