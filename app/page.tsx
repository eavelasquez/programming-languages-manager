import LanguageManager from "@/components/language-manager"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Programming Languages</h1>
            <div className="text-red-500 text-sm">Contest not running</div>
          </div>
          <p className="text-gray-600">Manage the programming languages available for the contest</p>
        </header>

        <LanguageManager />
      </div>
    </main>
  )
}

