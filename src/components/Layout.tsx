import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from '@/components/ui/button'
import { LogOut, Home, Send } from 'lucide-react'

export function Layout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-black">
                O
              </div>
              Onda Finance
            </Link>
            
            {user && (
              <nav className="hidden md:flex gap-1 ml-6">
                <Button 
                  variant={location.pathname === '/' ? 'secondary' : 'ghost'} 
                  asChild
                >
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button 
                  variant={location.pathname === '/transfer' ? 'secondary' : 'ghost'} 
                  asChild
                >
                  <Link to="/transfer" className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Depósito / Pix
                  </Link>
                </Button>
              </nav>
            )}
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground hidden sm:block">
                Olá, <span className="text-foreground font-medium">{user.name}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </header>

      {user && (
         <div className="bg-white border-b md:hidden">
            <nav className="flex justify-around p-2">
              <Button 
                variant={location.pathname === '/' ? 'secondary' : 'ghost'} 
                size="sm"
                asChild
                className="flex-1"
              >
                <Link to="/" className="flex items-center justify-center gap-2">
                  <Home className="w-4 h-4" />
                  Início
                </Link>
              </Button>
              <Button 
                variant={location.pathname === '/transfer' ? 'secondary' : 'ghost'} 
                size="sm"
                asChild
                className="flex-1"
              >
                <Link to="/transfer" className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Pix
                </Link>
              </Button>
            </nav>
         </div>
      )}

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <Outlet />
      </main>
    </div>
  )
}
