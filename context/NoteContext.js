import { createContext, useState } from "react"

const NoteContext = createContext()

export function NoteProvider({children}) {

  /* Array of Notes */
  const [notes, setNotes] = useState([])

  /* Note Item */
  const [note, setNote] = useState({title: '', body: '', color:'', date:'', image: '', cameraImage:''})

  return (
    <NoteContext.Provider value={{ note, setNote, notes, setNotes }}>{children}</NoteContext.Provider>
  )
}

export default NoteContext