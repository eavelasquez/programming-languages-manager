"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Trash2 } from "lucide-react"

interface Language {
  id: number
  name: string
  extension: string
}

export default function LanguageManager() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [nextId, setNextId] = useState(1)
  const [name, setName] = useState("")
  const [extension, setExtension] = useState("")
  const [error, setError] = useState("")

  // Load languages from localStorage on component mount
  useEffect(() => {
    const storedLanguages = localStorage.getItem("programmingLanguages")
    if (storedLanguages) {
      const parsedLanguages = JSON.parse(storedLanguages)
      setLanguages(parsedLanguages)

      // Find the highest ID to set nextId correctly
      const maxId = parsedLanguages.reduce((max: number, lang: Language) => (lang.id > max ? lang.id : max), 0)
      setNextId(maxId + 1)
    } else {
      // Initialize with some default languages if none exist
      const defaultLanguages = [
        { id: 1, name: "C", extension: "c" },
        { id: 2, name: "C++11", extension: "cc" },
        { id: 3, name: "Java", extension: "java" },
        { id: 4, name: "Python2", extension: "py2" },
        { id: 5, name: "Python3", extension: "py3" },
      ]
      setLanguages(defaultLanguages)
      setNextId(6)
      localStorage.setItem("programmingLanguages", JSON.stringify(defaultLanguages))
    }
  }, [])

  // Save languages to localStorage whenever they change
  useEffect(() => {
    if (languages.length > 0) {
      localStorage.setItem("programmingLanguages", JSON.stringify(languages))
    }
  }, [languages])

  const handleAddLanguage = () => {
    // Validate inputs
    if (!name.trim()) {
      setError("Language name is required")
      return
    }

    if (!extension.trim()) {
      setError("Extension is required")
      return
    }

    // Add new language
    const newLanguage = {
      id: nextId,
      name: name.trim(),
      extension: extension.trim(),
    }

    setLanguages([...languages, newLanguage])
    setNextId(nextId + 1)

    // Clear form
    setName("")
    setExtension("")
    setError("")
  }

  const handleDeleteLanguage = (id: number) => {
    setLanguages(languages.filter((lang) => lang.id !== id))
  }

  const handleClear = () => {
    setName("")
    setExtension("")
    setError("")
  }

  return (
    <div className="space-y-8">
      {/* Languages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Programming Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24">Language #</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Extension</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {languages.map((language) => (
                <TableRow key={language.id}>
                  <TableCell>{language.id}</TableCell>
                  <TableCell>{language.name}</TableCell>
                  <TableCell>{language.extension}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteLanguage(language.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add/Edit Language</CardTitle>
          <p className="text-sm text-gray-500">Enter the details below to add a new language or edit an existing one</p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
            <div className="flex gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-medium">Warning:</p>
                <p className="text-sm">
                  It is NOT recommended to change anything while the contest is running. Any changes will overwrite the
                  already defined data.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="number" className="block text-sm font-medium mb-1">
                Number:
              </label>
              <Input id="number" value={nextId} disabled className="bg-gray-100" />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name:
              </label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. JavaScript" />
            </div>
            <div>
              <label htmlFor="extension" className="block text-sm font-medium mb-1">
                Extension:
              </label>
              <Input
                id="extension"
                value={extension}
                onChange={(e) => setExtension(e.target.value)}
                placeholder="e.g. js"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
            <Button onClick={handleAddLanguage}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

