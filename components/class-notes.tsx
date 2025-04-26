"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, BookOpen, Edit, Trash2, Save } from "lucide-react"

type Note = {
  id: string
  title: string
  content: string
  className: string
  date: Date
}

type Class = {
  id: string
  name: string
}

export function ClassNotes() {
  const [classes, setClasses] = useState<Class[]>([
    { id: "cs101", name: "Computer Science 101" },
    { id: "math202", name: "Advanced Mathematics" },
    { id: "psych110", name: "Introduction to Psychology" },
  ])

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "note1",
      title: "Data Structures Overview",
      content:
        "Covered arrays, linked lists, and binary trees. Need to review time complexity for different operations.",
      className: "Computer Science 101",
      date: new Date(Date.now() - 86400000),
    },
    {
      id: "note2",
      title: "Cognitive Biases",
      content:
        "Discussed confirmation bias, anchoring, and availability heuristic. Examples of how these affect decision making in everyday life.",
      className: "Introduction to Psychology",
      date: new Date(Date.now() - 172800000),
    },
  ])

  const [activeTab, setActiveTab] = useState("all")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    className: classes[0]?.name || "",
  })

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: `note${Date.now()}`,
        title: newNote.title,
        content: newNote.content,
        className: newNote.className,
        date: new Date(),
      }

      setNotes([note, ...notes])
      setNewNote({
        title: "",
        content: "",
        className: classes[0]?.name || "",
      })
      setIsAddingNote(false)
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const filteredNotes = activeTab === "all" ? notes : notes.filter((note) => note.className === activeTab)

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 shadow-md bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-blue-700">Class Notes</CardTitle>
            <Button onClick={() => setIsAddingNote(!isAddingNote)} className="bg-blue-600 hover:bg-blue-700">
              {isAddingNote ? (
                "Cancel"
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Note
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isAddingNote && (
            <div className="mb-6 p-4 border border-blue-100 rounded-lg bg-blue-50">
              <Input
                placeholder="Note Title"
                className="mb-3 border-blue-200"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />

              <select
                className="w-full mb-3 p-2 rounded-md border border-blue-200 bg-white text-gray-700"
                value={newNote.className}
                onChange={(e) => setNewNote({ ...newNote, className: e.target.value })}
              >
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </select>

              <Textarea
                placeholder="Note content..."
                className="mb-3 min-h-[150px] border-blue-200"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />

              <Button onClick={addNote} className="w-full bg-teal-600 hover:bg-teal-700">
                <Save className="mr-2 h-4 w-4" /> Save Note
              </Button>
            </div>
          )}

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 bg-blue-100">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                All Notes
              </TabsTrigger>
              {classes.map((cls) => (
                <TabsTrigger
                  key={cls.id}
                  value={cls.name}
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  {cls.name.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredNotes.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotes.map((note) => (
                    <div key={note.id} className="p-4 rounded-lg bg-white border border-blue-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-blue-700">{note.title}</h3>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {note.className} • {note.date.toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => deleteNote(note.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{note.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="mx-auto h-12 w-12 text-blue-300 mb-2" />
                  <p>No notes found for this class</p>
                  <Button
                    onClick={() => setIsAddingNote(true)}
                    variant="outline"
                    className="mt-2 border-blue-200 text-blue-600"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Create your first note
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
