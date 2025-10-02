const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title:    { type: String, required: true },
    content:  { type: String, required: true },
    tags:     { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    // REMOVED: createdOn is no longer needed, as timestamps will handle it.
}, {
    // ADDED: This option tells Mongoose to automatically manage createdAt and updatedAt fields.
    timestamps: true 
});

module.exports = mongoose.model("Note", noteSchema);