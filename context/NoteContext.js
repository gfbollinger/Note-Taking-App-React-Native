import { createContext, useState } from "react"

const NoteContext = createContext()

export function NoteProvider({children}) {

  const [notes, setNotes] = useState([])

  const a = 1

  return (
    <NoteContext.Provider value={{ notes, setNotes, item : 1 }}>{children}</NoteContext.Provider>
  )
}

export default NoteContext