import React, { useState } from 'react';
import { AuthSystem } from './components/AuthSystem';
import { SecurityProvider } from './components/SecurityProvider';
import { EnhancedLayout } from './components/EnhancedLayout';
import { LoadingSystem } from './components/LoadingSystem';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PerfectDashboard } from './components/PerfectDashboard';
import { PerfectDocuments } from './components/PerfectDocuments';
import { PerfectAIQAndA } from './components/PerfectAIQAndA';
import { PerfectAlerts } from './components/PerfectAlerts';
import { WorldClassAnalytics } from './components/WorldClassAnalytics';
import { WorldClassAdmin } from './components/WorldClassAdmin';

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

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (user: UserProfile) => {
    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <PerfectDashboard user={currentUser} />;
      case 'documents':
        return <PerfectDocuments />;
      case 'ai-qa':
        return <PerfectAIQAndA />;
      case 'alerts':
        return <PerfectAlerts />;
      case 'analytics':
        return <WorldClassAnalytics />;
      case 'admin':
        return <WorldClassAdmin />;
      default:
        return <PerfectDashboard user={currentUser} />;
    }
  };

  if (isLoading) {
    return <LoadingSystem />;
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <ErrorBoundary>
        <AuthSystem onLogin={handleLogin} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SecurityProvider user={currentUser} onLogout={handleLogout}>
        <EnhancedLayout 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          user={currentUser}
          onLogout={handleLogout}
        >
          {renderCurrentPage()}
        </EnhancedLayout>
      </SecurityProvider>
    </ErrorBoundary>
  );
}