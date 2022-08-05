import { createContext, useState } from "react"

const NoteContext = createContext()

export function NoteProvider({children}) {

  /* Array of Notes */
  const [notes, setNotes] = useState([])

  /* Note Elements */
  const [noteTitle, setNoteTitle] = useState("")
  const [noteBody, setNoteBody] = useState("")
  const [noteColor, setNoteColor] = useState("")
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [noteDate, setNoteDate] = useState();

  return (
    <NoteContext.Provider value={{ notes, setNotes, noteTitle, setNoteTitle, noteBody, setNoteBody, noteColor, setNoteColor, selectedImage, setSelectedImage, cameraImage, setCameraImage, noteDate, setNoteDate }}>{children}</NoteContext.Provider>
  )
}

export default NoteContext