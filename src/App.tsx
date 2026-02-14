import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-primary text-xl font-bold">Water Tanker</h1>
        </div>
      </header>
      <Outlet />
      <footer className="mt-auto border-t border-primary/20">
        <div className="container mx-auto px-4 py-4 text-sm text-primary/80">
          © Water Tanker
        </div>
      </footer>
    </div>
  )
}

export default App
