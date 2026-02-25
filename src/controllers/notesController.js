import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in get all notes controller");
        res.status(500).json({ message: "interval server error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in get note by id controller", error);
        res.status(500).json({ message: "interval server error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content });

        await newNote.save();
        res.status(201).json({ message: "note created successfully" });
    } catch (error) {
        console.log("Error in create note controller", error);
        res.status(500).json({ message: "interval server error" });
    }
}

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body;
        const updateNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

        if (!updateNote) {
            return res.status(404).json({ message: "note not found" });
        }
        res.status(200).json(updateNote);
    } catch (error) {
        console.error("Error in update note controller", error);
        res.status(500).json({ message: "interval server error" });
    }

}
export async function deleteNote(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id);
        if (!deleteNote) {
            return res.status(404).json({ message: "note not found" });
        }
        res.status(200).json({ message: "note deleted successfully", deleteNote });
    } catch (error) {
        console.log("Error in delete note controller", error);
        res.status(500).json({ message: "interval server error" });
    }
}