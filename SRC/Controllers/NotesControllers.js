import { Note } from "../Models/Note.js"

export const GetNotes = async (req,res) =>{
    try {
        const notes = await Note.find({ user : req.user.id }).sort({ createdAt : -1}) //.sort({ createdAt : -1})  this is used to keep the lastest Note on the top
        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message : "There is a Internal Error"})
    }
}

export const PostNotes = async (req,res) =>{
    try {
        const {title, content} = req.body
        const NewNote = new Note({title, content, user : req.user.id})
        const SavedNote = await NewNote.save()
        res.status(200).json(SavedNote)
    } catch (error) {
        res.status(500).json({ message : "There is a Internal Error"})
    }
}

export const GetNotebyId = async (req,res) =>{
    try {
        const GetNote = await Note.findOne({ _id : req.params.id, user : req.user.id})
        if(!GetNote) {
            return res.status(500).json({ message : "Note is not found"})
        }
        res.status(200).json(GetNote)
    } catch (error) {
        res.status(500).json({ message : "There is a Internal Error"})
    }
}

export const UpdateNotes = async (req,res) =>{
    try {
        const {title, content} = req.body
        const UpdatedNote = await Note.findOneAndUpdate({ _id : req.params.id, user : req.user.id}, {title, content}, { new : true })
        if(!UpdatedNote) { 
            res.status(500).json({ message : "Note is not Found"})
        }
        res.status(200).json(UpdatedNote)
    } catch (error) {
        res.status(500).json({ message : "There is a Internal Error"})
    }
}

export const DeleteNotes = async (req,res) =>{
    try {
        const DeletedNote = await Note.findOneAndDelete({ _id : req.params.id, user : req.user.id})
        if(!DeletedNote) { 
            res.status(500).json({ message : "Note is not Found"})
        }
        res.status(200).json({ message : "Note is Deleted"})
    } catch (error) {
        res.status(500).json({ message: "Internal Error"})
    }
}