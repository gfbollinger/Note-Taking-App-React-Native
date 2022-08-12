import { createContext, useState } from "react"

const NoteContext = createContext()

export function NoteProvider({children}) {

  /* Array of Notes */
  const [notes, setNotes] = useState([])

  /* TODO improve ID setting (currently using timestamp) */
  const noteNewId = new Date().getTime();

  /* Note Item */
  const [note, setNote] = useState({id: noteNewId, title: '', body: '', color:'', date:'', image: '', cameraImage:'', location: '', address: '', audios: ''})

  return (
    <NoteContext.Provider value={{ note, setNote, notes, setNotes, noteNewId }}>{children}</NoteContext.Provider>
  )
}

export default NoteContext