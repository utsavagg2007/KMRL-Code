import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Shield, 
  Clock, 
  AlertTriangle, 
  Lock,
  Activity,
  Eye,
  Wifi,
  WifiOff
} from 'lucide-react';

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

interface SecurityContextType {
  user: UserProfile | null;
  sessionTime: number;
  isOnline: boolean;
  securityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  logout: () => void;
  extendSession: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: ReactNode;
  user: UserProfile;
  onLogout: () => void;
}

const SESSION_TIMEOUT = 30 * 60; // 30 minutes in seconds
const WARNING_TIME = 5 * 60; // Show warning 5 minutes before timeout

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ 
  children, 
  user, 
  onLogout 
}) => {
  const [sessionTime, setSessionTime] = useState(SESSION_TIMEOUT);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showSessionWarning, setShowSessionWarning] = useState(false);
  const [activityLog, setActivityLog] = useState<string[]>([]);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Session timeout management
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => {
        if (prev <= 1) {
          onLogout();
          return 0;
        }
        
        if (prev <= WARNING_TIME && !showSessionWarning) {
          setShowSessionWarning(true);
        }
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onLogout, showSessionWarning]);

  // Activity monitoring
  useEffect(() => {
    const logActivity = (activity: string) => {
      const timestamp = new Date().toLocaleTimeString();
      setActivityLog(prev => [...prev.slice(-9), `${timestamp}: ${activity}`]);
    };

    const handleActivity = () => {
      setSessionTime(SESSION_TIMEOUT);
      setShowSessionWarning(false);
    };

    const handleMouseMove = () => logActivity('Mouse activity detected');
    const handleKeyPress = () => logActivity('Keyboard activity detected');
    const handleClick = () => logActivity('Click activity detected');

    // Reset session on activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);

    // Log activities (less frequently)
    const activityTimer = setInterval(() => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('keypress', handleKeyPress);
      window.addEventListener('click', handleClick);
      
      setTimeout(() => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('keypress', handleKeyPress);
        window.removeEventListener('click', handleClick);
      }, 1000);
    }, 30000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(activityTimer);
    };
  }, []);

  const extendSession = () => {
    setSessionTime(SESSION_TIMEOUT);
    setShowSessionWarning(false);
  };

  const getSecurityLevel = (): 'HIGH' | 'MEDIUM' | 'LOW' => {
    if (!isOnline) return 'LOW';
    if (user.clearanceLevel >= 4 && user.mfaEnabled && user.govIdVerified) return 'HIGH';
    if (user.clearanceLevel >= 3 && user.mfaEnabled) return 'MEDIUM';
    return 'LOW';
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const contextValue: SecurityContextType = {
    user,
    sessionTime,
    isOnline,
    securityLevel: getSecurityLevel(),
    logout: onLogout,
    extendSession
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {/* Security Status Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground px-4 py-2 text-sm">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>KMRL Secure Session</span>
              <Badge 
                variant={getSecurityLevel() === 'HIGH' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {getSecurityLevel()} SECURITY
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-400" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-400" />
              )}
              <span>{isOnline ? 'Online' : 'Offline'}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Session: {formatTime(sessionTime)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>{user.name} ({user.employeeId})</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-primary-foreground hover:bg-primary-foreground/10 h-6 px-2"
            >
              <Lock className="w-3 h-3 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Session Warning Modal */}
      {showSessionWarning && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-background border rounded-lg p-6 max-w-md w-full">
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="w-4 h-4" />
              <AlertTitle>Session Expiring Soon</AlertTitle>
              <AlertDescription>
                Your session will expire in {formatTime(sessionTime)}. 
                Click "Extend Session" to continue working.
              </AlertDescription>
            </Alert>
            
            <div className="flex space-x-2">
              <Button onClick={extendSession} className="flex-1">
                Extend Session
              </Button>
              <Button variant="outline" onClick={onLogout} className="flex-1">
                Logout Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Offline Warning */}
      {!isOnline && (
        <div className="fixed bottom-4 right-4 z-40">
          <Alert variant="destructive" className="w-80">
            <WifiOff className="w-4 h-4" />
            <AlertTitle>Connection Lost</AlertTitle>
            <AlertDescription>
              You are currently offline. Some features may not be available.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content with top padding for security bar */}
      <div className="pt-12">
        {children}
      </div>

      {/* Activity Monitor (Hidden - for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 z-40 bg-background border rounded-lg p-3 max-w-sm">
          <h4 className="font-semibold mb-2 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Activity Log
          </h4>
          <div className="text-xs space-y-1 max-h-32 overflow-y-auto">
            {activityLog.map((log, index) => (
              <div key={index} className="text-muted-foreground">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </SecurityContext.Provider>
  );
};

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};