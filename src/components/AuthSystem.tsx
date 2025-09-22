import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Shield, 
  Lock, 
  Smartphone, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Users,
  Building2,
  KeyRound,
  Scan
} from 'lucide-react';

interface AuthSystemProps {
  onLogin: (user: UserProfile) => void;
}

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

const GOVERNMENT_DEPARTMENTS = [
  'Legal & Compliance',
  'Finance & Accounts', 
  'Human Resources',
  'Procurement & Contracts',
  'Operations & Maintenance',
  'IT & Security',
  'Administration',
  'Audit & Internal Control'
];

const SAMPLE_USERS: Record<string, UserProfile> = {
  'KMRL2024001': {
    employeeId: 'KMRL2024001',
    name: 'Dr. Rajesh Kumar',
    department: 'Legal & Compliance',
    role: 'Chief Legal Officer',
    clearanceLevel: 5,
    lastLogin: '2024-01-15 09:30 AM',
    mfaEnabled: true,
    govIdVerified: true
  },
  'KMRL2024002': {
    employeeId: 'KMRL2024002', 
    name: 'Ms. Priya Nair',
    department: 'Finance & Accounts',
    role: 'Finance Manager',
    clearanceLevel: 4,
    lastLogin: '2024-01-15 08:45 AM',
    mfaEnabled: true,
    govIdVerified: true
  },
  'KMRL2024003': {
    employeeId: 'KMRL2024003',
    name: 'Mr. Arun Menon',
    department: 'Procurement & Contracts',
    role: 'Procurement Officer',
    clearanceLevel: 3,
    lastLogin: '2024-01-14 04:20 PM',
    mfaEnabled: true,
    govIdVerified: true
  },
  'KMRL2024004': {
    employeeId: 'KMRL2024004',
    name: 'Mrs. Sita Reddy',
    department: 'Human Resources',
    role: 'HR Executive',
    clearanceLevel: 3,
    lastLogin: '2024-01-15 10:15 AM',
    mfaEnabled: true,
    govIdVerified: true
  },
  'KMRL2024005': {
    employeeId: 'KMRL2024005',
    name: 'Mr. Vishnu Pillai',
    department: 'IT & Security',
    role: 'System Administrator',
    clearanceLevel: 5,
    lastLogin: '2024-01-15 07:30 AM',
    mfaEnabled: true,
    govIdVerified: true
  }
};

export const AuthSystem: React.FC<AuthSystemProps> = ({ onLogin }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginProgress, setLoginProgress] = useState(0);
  const [authStep, setAuthStep] = useState<'credentials' | 'otp'>('credentials');
  const [otpCode, setOtpCode] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId || !password) {
      setError('Please enter both Employee ID and password');
      return;
    }

    setIsLoading(true);
    setError('');
    setLoginProgress(0);

    // Simulate authentication process
    const progressSteps = [
      { step: 20, message: 'Verifying Employee ID...' },
      { step: 40, message: 'Checking Government Database...' },
      { step: 60, message: 'Validating Security Clearance...' },
      { step: 80, message: 'Initializing Secure Session...' },
      { step: 100, message: 'Authentication Complete' }
    ];

    for (const { step, message } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoginProgress(step);
    }

    const user = SAMPLE_USERS[employeeId];
    if (user && password === 'secure123') {
      setSelectedUser(user);
      if (user.mfaEnabled) {
        setAuthStep('otp');
      } else {
        onLogin(user);
      }
    } else {
      setError('Invalid credentials or unauthorized access');
    }
    
    setIsLoading(false);
  };



  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (selectedUser) {
      onLogin(selectedUser);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                <Building2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-primary">KMRL</h1>
                <p className="text-muted-foreground">Kochi Metro Rail Limited</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                Document Intelligence Assistant
              </h2>
              <p className="text-muted-foreground text-lg">
                Government-grade AI platform for secure document management and analysis
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 border-l-4 border-l-primary">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Secure Access</h3>
                  <p className="text-sm text-muted-foreground">Government-grade security</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-l-4 border-l-secondary">
              <div className="flex items-center space-x-3">
                <Scan className="w-8 h-8 text-secondary" />
                <div>
                  <h3 className="font-semibold">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Intelligent document processing</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-l-4 border-l-accent">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-accent" />
                <div>
                  <h3 className="font-semibold">Multi-Department</h3>
                  <p className="text-sm text-muted-foreground">Cross-functional access</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-l-4 border-l-chart-4">
              <div className="flex items-center space-x-3">
                <Clock className="w-8 h-8 text-chart-4" />
                <div>
                  <h3 className="font-semibold">24/7 Access</h3>
                  <p className="text-sm text-muted-foreground">Always available</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right side - Authentication */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl">Secure Login</CardTitle>
                <CardDescription>
                  Enter your government-issued credentials to access the platform
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertTitle>Authentication Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="space-y-3">
                  <Progress value={loginProgress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    {loginProgress < 100 ? 'Authenticating...' : 'Login Successful!'}
                  </p>
                </div>
              )}

              <Tabs value={authStep} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="credentials" disabled={authStep !== 'credentials'}>
                    <KeyRound className="w-4 h-4 mr-2" />
                    Credentials
                  </TabsTrigger>
                  <TabsTrigger value="otp" disabled={authStep !== 'otp'}>
                    <Smartphone className="w-4 h-4 mr-2" />
                    OTP
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="credentials" className="space-y-4">
                  <form onSubmit={handleCredentialLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        placeholder="KMRL2024001"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
                        className="bg-input-background"
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your secure password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-input-background pr-10"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Authenticating...' : 'Sign In'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="otp" className="space-y-4">
                  <form onSubmit={handleOTPVerification} className="space-y-4">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                        <Smartphone className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="font-semibold">OTP Verification</h3>
                      <p className="text-sm text-muted-foreground">
                        Enter the 6-digit code sent to your registered mobile device
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="otp">OTP Code</Label>
                      <Input
                        id="otp"
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="bg-input-background text-center text-xl tracking-widest"
                        disabled={isLoading}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isLoading || otpCode.length !== 6}
                    >
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Demo credentials */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Badge variant="secondary" className="mr-2">Demo</Badge>
                  Sample Credentials
                </h4>
                <div className="text-sm space-y-1">
                  <p><strong>Employee ID:</strong> KMRL2024001</p>
                  <p><strong>Password:</strong> secure123</p>
                  <p className="text-muted-foreground mt-2">
                    * Try other employee IDs: KMRL2024002 to KMRL2024005
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security notice */}
          <div className="mt-6 text-center">
            <Alert>
              <Shield className="w-4 h-4" />
              <AlertDescription className="text-sm">
                This system is for authorized government personnel only. 
                All activities are monitored and logged for security purposes.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};