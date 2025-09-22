import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  MessageSquare, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Search, 
  Globe, 
  User, 
  LogOut,
  ChevronDown,
  Menu,
  X,
  Shield,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface UserProfile {
  employeeId: string;
  name: string;
  department: string;
  role: string;
  clearanceLevel: number;
  lastLogin: string;
  mfaEnabled: boolean;
  govIdVerified: boolean;
}

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  user: UserProfile;
  onLogout: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'ai-qa', label: 'AI Q&A', icon: MessageSquare },
  { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: 5 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'admin', label: 'Admin', icon: Settings },
];

export function EnhancedLayout({ children, currentPage, onPageChange, user, onLogout }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState('English');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'hi', name: 'हिंदी' },
  ];

  const getClearanceBadge = (level: number) => {
    if (level >= 5) return { label: 'TOP SECRET', variant: 'destructive' as const };
    if (level >= 4) return { label: 'SECRET', variant: 'default' as const };
    if (level >= 3) return { label: 'CONFIDENTIAL', variant: 'secondary' as const };
    return { label: 'RESTRICTED', variant: 'outline' as const };
  };

  const clearanceBadge = getClearanceBadge(user.clearanceLevel);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border lg:translate-x-0 lg:static lg:inset-0"
          >
            <div className="flex flex-col h-full">
              {/* Logo and App Name */}
              <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
                <motion.div 
                  className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </motion.div>
                <div>
                  <h1 className="text-lg text-sidebar-foreground font-semibold">KMRL Document</h1>
                  <p className="text-sm text-muted-foreground">Intelligence Assistant</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        onPageChange(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Badge variant="destructive" className="text-xs animate-pulse">
                            {item.badge}
                          </Badge>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* User Info */}
              <div className="p-4 border-t border-sidebar-border space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <motion.div 
                    className="w-2 h-2 bg-secondary rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-muted-foreground">System Online</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <Shield className="w-3 h-3 text-muted-foreground" />
                  <Badge {...clearanceBadge} className="text-xs">
                    {clearanceBadge.label}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:block w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex flex-col h-full">
          {/* Logo and App Name */}
          <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
            <motion.div 
              className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-lg text-sidebar-foreground font-semibold">KMRL Document</h1>
              <p className="text-sm text-muted-foreground">Intelligence Assistant</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge variant="destructive" className="text-xs animate-pulse">
                        {item.badge}
                      </Badge>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-sidebar-border space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <motion.div 
                className="w-2 h-2 bg-secondary rounded-full"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-muted-foreground">System Online</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <Shield className="w-3 h-3 text-muted-foreground" />
              <Badge {...clearanceBadge} className="text-xs">
                {clearanceBadge.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              {/* Global Search */}
              <motion.div 
                className="relative w-96 max-w-sm"
                whileFocus={{ scale: 1.02 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents instantly..."
                  className="pl-10 bg-input-background transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </motion.div>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{language}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.name)}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button variant="ghost" className="gap-2 px-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.role}</div>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <div className="px-3 py-2 border-b">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.employeeId}</div>
                    <div className="text-sm text-muted-foreground">{user.department}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge {...clearanceBadge} className="text-xs">
                        {clearanceBadge.label}
                      </Badge>
                      {user.mfaEnabled && (
                        <Badge variant="outline" className="text-xs">
                          MFA Enabled
                        </Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Activity className="w-4 h-4 mr-2" />
                    Activity Log
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={onLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Secure Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}