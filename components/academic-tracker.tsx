"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  BookOpen,
  Edit,
  Trash2,
  Save,
  BarChart,
  FileText,
  Award,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Course = {
  id: string;
  name: string;
  code: string;
};

type Assignment = {
  id: string;
  title: string;
  courseId: string;
  score: number;
  maxScore: number;
  date: Date;
  notes: string;
};

type Note = {
  id: string;
  title: string;
  content: string;
  courseId: string;
  date: Date;
};

export function AcademicTracker() {
  const [courses] = useState<Course[]>([
    { id: "cs101", name: "Computer Science", code: "CS101" },
    { id: "math202", name: "Advanced Mathematics", code: "MATH202" },
    { id: "psych110", name: "Introduction to Psychology", code: "PSYCH110" },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "assign1",
      title: "Algorithm Analysis",
      courseId: "cs101",
      score: 85,
      maxScore: 100,
      date: new Date(Date.now() - 604800000),
      notes: "Need to improve on time complexity analysis.",
    },
    {
      id: "assign2",
      title: "Linear Algebra Quiz",
      courseId: "math202",
      score: 92,
      maxScore: 100,
      date: new Date(Date.now() - 1209600000),
      notes: "Did well on matrix operations, need to review eigenvalues.",
    },
    {
      id: "assign3",
      title: "Cognitive Biases Essay",
      courseId: "psych110",
      score: 78,
      maxScore: 100,
      date: new Date(Date.now() - 1814400000),
      notes: "Professor suggested more examples and case studies.",
    },
    {
      id: "assign4",
      title: "Data Structures Project",
      courseId: "cs101",
      score: 90,
      maxScore: 100,
      date: new Date(Date.now() - 2419200000),
      notes: "Implemented binary search tree successfully.",
    },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "note1",
      title: "Sorting Algorithms",
      content:
        "Quick sort, merge sort, bubble sort. Time complexity analysis and implementation details.",
      courseId: "cs101",
      date: new Date(Date.now() - 86400000),
    },
    {
      id: "note2",
      title: "Matrix Operations",
      content:
        "Addition, subtraction, multiplication of matrices. Determinants and inverses.",
      courseId: "math202",
      date: new Date(Date.now() - 172800000),
    },
    {
      id: "note3",
      title: "Behavioral Psychology",
      content:
        "Classical and operant conditioning. Pavlov's experiments and Skinner's contributions.",
      courseId: "psych110",
      date: new Date(Date.now() - 259200000),
    },
  ]);

  const [activeTab, setActiveTab] = useState("notes");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  // New assignment form state
  const [isAddingAssignment, setIsAddingAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    courseId: courses[0]?.id || "",
    score: 0,
    maxScore: 100,
    notes: "",
  });

  // New note form state
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    courseId: courses[0]?.id || "",
  });

  const addAssignment = () => {
    if (newAssignment.title.trim() && newAssignment.courseId) {
      const assignment: Assignment = {
        id: `assign${Date.now()}`,
        title: newAssignment.title,
        courseId: newAssignment.courseId,
        score: newAssignment.score,
        maxScore: newAssignment.maxScore,
        date: new Date(),
        notes: newAssignment.notes,
      };

      setAssignments([assignment, ...assignments]);
      setNewAssignment({
        title: "",
        courseId: courses[0]?.id || "",
        score: 0,
        maxScore: 100,
        notes: "",
      });
      setIsAddingAssignment(false);
    }
  };

  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim() && newNote.courseId) {
      const note: Note = {
        id: `note${Date.now()}`,
        title: newNote.title,
        content: newNote.content,
        courseId: newNote.courseId,
        date: new Date(),
      };

      setNotes([note, ...notes]);
      setNewNote({
        title: "",
        content: "",
        courseId: courses[0]?.id || "",
      });
      setIsAddingNote(false);
    }
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getCourseById = (id: string) => {
    return courses.find((course) => course.id === id);
  };

  const getAssignmentsByCourse = (courseId: string) => {
    return courseId === "all"
      ? assignments
      : assignments.filter((assignment) => assignment.courseId === courseId);
  };

  const getNotesByCourse = (courseId: string) => {
    return courseId === "all"
      ? notes
      : notes.filter((note) => note.courseId === courseId);
  };

  const calculateCourseAverage = (courseId: string) => {
    const courseAssignments = assignments.filter(
      (assignment) => assignment.courseId === courseId
    );
    if (courseAssignments.length === 0) return 0;

    const totalScore = courseAssignments.reduce(
      (sum, assignment) => sum + assignment.score,
      0
    );
    return Math.round((totalScore / courseAssignments.length) * 10) / 10;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="border-blue-200 shadow-md bg-white/90 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-blue-700 text-lg">
            Academic Tracker
          </CardTitle>
          <div className="flex space-x-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 h-8">
                  <PlusCircle className="mr-1 h-3.5 w-3.5" /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Content</DialogTitle>
                  <DialogDescription>
                    Choose what you want to add to your academic tracker.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button
                    onClick={() => {
                      setIsAddingNote(true);
                      setIsAddingAssignment(false);
                    }}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <FileText className="mr-2 h-4 w-4" /> Add Class Note
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingAssignment(true);
                      setIsAddingNote(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Award className="mr-2 h-4 w-4" /> Add Assignment Score
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isAddingAssignment && (
          <div className="mb-6 p-4 border border-blue-100 rounded-lg bg-blue-50">
            <h3 className="font-medium text-blue-700 mb-3">
              Add New Assignment Score
            </h3>

            <div className="space-y-3">
              <Input
                placeholder="Assignment Title"
                className="border-blue-200"
                value={newAssignment.title}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, title: e.target.value })
                }
              />

              <select
                className="w-full p-2 rounded-md border border-blue-200 bg-white text-gray-700"
                value={newAssignment.courseId}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    courseId: e.target.value,
                  })
                }
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code}: {course.name}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-blue-700 mb-1 block">
                    Your Score
                  </label>
                  <Input
                    type="number"
                    className="border-blue-200"
                    value={newAssignment.score}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        score: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm text-blue-700 mb-1 block">
                    Max Score
                  </label>
                  <Input
                    type="number"
                    className="border-blue-200"
                    value={newAssignment.maxScore}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        maxScore: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <Textarea
                placeholder="Notes about this assignment..."
                className="border-blue-200"
                value={newAssignment.notes}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, notes: e.target.value })
                }
              />

              <div className="flex space-x-2">
                <Button
                  onClick={addAssignment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingAssignment(false)}
                  className="border-blue-200 text-blue-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {isAddingNote && (
          <div className="mb-6 p-4 border border-teal-100 rounded-lg bg-teal-50">
            <h3 className="font-medium text-teal-700 mb-3">
              Add New Class Note
            </h3>

            <div className="space-y-3">
              <Input
                placeholder="Note Title"
                className="border-teal-200"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
              />

              <select
                className="w-full p-2 rounded-md border border-teal-200 bg-white text-gray-700"
                value={newNote.courseId}
                onChange={(e) =>
                  setNewNote({ ...newNote, courseId: e.target.value })
                }
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.code}: {course.name}
                  </option>
                ))}
              </select>

              <Textarea
                placeholder="Note content..."
                className="min-h-[150px] border-teal-200"
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
              />

              <div className="flex space-x-2">
                <Button
                  onClick={addNote}
                  className="flex-1 bg-teal-600 hover:bg-teal-700"
                >
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingNote(false)}
                  className="border-teal-200 text-teal-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <Tabs
          defaultValue="notes"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 mb-4 bg-blue-100/50">
            <TabsTrigger
              value="notes"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Class Notes
            </TabsTrigger>
            <TabsTrigger
              value="assignments"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Assignment Scores
            </TabsTrigger>
          </TabsList>

          <div className="mb-3">
            <select
              className="w-full p-2 rounded-md border border-blue-200 bg-white text-gray-700"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code}: {course.name}
                </option>
              ))}
            </select>
          </div>

          <TabsContent value="notes" className="mt-0">
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {getNotesByCourse(selectedCourse).length > 0 ? (
                getNotesByCourse(selectedCourse).map((note) => {
                  const course = getCourseById(note.courseId);
                  return (
                    <Accordion type="single" collapsible key={note.id}>
                      <AccordionItem
                        value={note.id}
                        className="border border-teal-100 rounded-lg bg-teal-50 px-3"
                      >
                        <AccordionTrigger className="py-2 hover:no-underline">
                          <div className="flex flex-col items-start text-left">
                            <h3 className="font-medium text-teal-700">
                              {note.title}
                            </h3>
                            <div className="flex items-center text-xs text-gray-500">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {course?.code} • {note.date.toLocaleDateString()}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-1 pb-3">
                          <div className="bg-white p-3 rounded-md border border-teal-100 mb-2">
                            <p className="text-sm text-gray-700 whitespace-pre-line">
                              {note.content}
                            </p>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-blue-600"
                            >
                              <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-red-600"
                              onClick={() => deleteNote(note.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="mx-auto h-10 w-10 text-blue-300 mb-2" />
                  <p>No notes found for this course</p>
                  <Button
                    onClick={() => setIsAddingNote(true)}
                    variant="outline"
                    className="mt-2 border-teal-200 text-teal-600"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add your first note
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="mt-0">
            {selectedCourse !== "all" && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100 flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-blue-700">
                    {getCourseById(selectedCourse)?.code}:{" "}
                    {getCourseById(selectedCourse)?.name}
                  </h3>
                  <p className="text-sm text-gray-600">Course Average</p>
                </div>
                <div
                  className={`text-2xl font-bold ${getScoreColor(
                    calculateCourseAverage(selectedCourse)
                  )}`}
                >
                  {calculateCourseAverage(selectedCourse)}%
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {getAssignmentsByCourse(selectedCourse).length > 0 ? (
                getAssignmentsByCourse(selectedCourse).map((assignment) => {
                  const course = getCourseById(assignment.courseId);
                  const percentage = Math.round(
                    (assignment.score / assignment.maxScore) * 100
                  );

                  return (
                    <div
                      key={assignment.id}
                      className="p-3 rounded-lg bg-blue-50 border border-blue-100"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-blue-700">
                            {assignment.title}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {course?.code} •{" "}
                            {assignment.date.toLocaleDateString()}
                          </div>
                        </div>
                        <div
                          className={`text-lg font-bold ${getScoreColor(
                            percentage
                          )}`}
                        >
                          {percentage}%
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getScoreColor(
                              percentage
                            ).replace("text-", "bg-")}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>
                            Score: {assignment.score}/{assignment.maxScore}
                          </span>
                        </div>
                      </div>

                      {assignment.notes && (
                        <p className="text-xs text-gray-600 bg-white p-2 rounded border border-blue-100">
                          {assignment.notes}
                        </p>
                      )}

                      <div className="flex justify-end space-x-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-blue-600"
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2 text-red-600"
                          onClick={() => deleteAssignment(assignment.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Award className="mx-auto h-10 w-10 text-blue-300 mb-2" />
                  <p>No assignments found for this course</p>
                  <Button
                    onClick={() => setIsAddingAssignment(true)}
                    variant="outline"
                    className="mt-2 border-blue-200 text-blue-600"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add your first
                    assignment
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-3 text-center">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-700 border-blue-200"
              >
                <BarChart className="mr-1 h-3.5 w-3.5" /> View Performance
                Analytics
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
