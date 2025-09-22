import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Settings, 
  Key, 
  Database,
  Activity,
  UserPlus,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Globe,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  RefreshCw,
  FileText,
  Monitor,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Zap,
  Brain,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';

const users = [
  {
    id: 1,
    name: 'Anand Kumar',
    email: 'anand.kumar@kmrl.gov.in',
    role: 'Legal Officer',
    department: 'Legal',
    status: 'Active',
    lastLogin: '2025-09-09 09:15',
    loginCount: 247,
    permissions: ['read', 'write', 'approve'],
    avatar: 'AK',
    phone: '+91 9876543210',
    location: 'Kochi',
    joinDate: '2023-01-15',
    securityLevel: 'High',
    twoFactorEnabled: true,
    documentsAccessed: 1247,
    sessionsToday: 3
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@kmrl.gov.in',
    role: 'Engineering Manager',
    department: 'Engineering',
    status: 'Active',
    lastLogin: '2025-09-09 08:45',
    loginCount: 189,
    permissions: ['read', 'write', 'approve'],
    avatar: 'RK',
    phone: '+91 9876543211',
    location: 'Kochi',
    joinDate: '2022-08-20',
    securityLevel: 'High',
    twoFactorEnabled: true,
    documentsAccessed: 987,
    sessionsToday: 2
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya.sharma@kmrl.gov.in',
    role: 'Security Officer',
    department: 'Security',
    status: 'Active',
    lastLogin: '2025-09-08 16:30',
    loginCount: 156,
    permissions: ['read', 'write'],
    avatar: 'PS',
    phone: '+91 9876543212',
    location: 'Kochi',
    joinDate: '2023-03-10',
    securityLevel: 'Medium',
    twoFactorEnabled: false,
    documentsAccessed: 654,
    sessionsToday: 1
  },
  {
    id: 4,
    name: 'Meera Menon',
    email: 'meera.menon@kmrl.gov.in',
    role: 'IT Administrator',
    department: 'IT',
    status: 'Active',
    lastLogin: '2025-09-09 07:20',
    loginCount: 342,
    permissions: ['read', 'write', 'admin', 'delete'],
    avatar: 'MM',
    phone: '+91 9876543213',
    location: 'Kochi',
    joinDate: '2021-11-05',
    securityLevel: 'Maximum',
    twoFactorEnabled: true,
    documentsAccessed: 2156,
    sessionsToday: 4
  },
  {
    id: 5,
    name: 'Suresh Nair',
    email: 'suresh.nair@kmrl.gov.in',
    role: 'Operations Head',
    department: 'Operations',
    status: 'Inactive',
    lastLogin: '2025-09-05 14:10',
    loginCount: 98,
    permissions: ['read', 'write', 'approve'],
    avatar: 'SN',
    phone: '+91 9876543214',
    location: 'Kochi',
    joinDate: '2024-01-12',
    securityLevel: 'Medium',
    twoFactorEnabled: false,
    documentsAccessed: 432,
    sessionsToday: 0
  }
];

const systemMetrics = {
  cpuUsage: 23,
  memoryUsage: 67,
  diskUsage: 45,
  networkLoad: 78,
  uptime: '23 days, 14 hours',
  lastBackup: '2025-09-09 02:00',
  totalDocuments: 12547,
  totalUsers: 62,
  activeSessions: 24,
  securityAlerts: 3,
  systemHealth: 97
};

const securityLogs = [
  {
    id: 1,
    timestamp: '2025-09-09 09:15:23',
    action: 'Successful Login',
    user: 'Anand Kumar',
    ipAddress: '192.168.1.45',
    userAgent: 'Chrome 118.0.0',
    riskLevel: 'Low',
    location: 'Kochi, Kerala'
  },
  {
    id: 2,
    timestamp: '2025-09-09 08:45:12',
    action: 'Document Access',
    user: 'Rajesh Kumar',
    ipAddress: '192.168.1.67',
    userAgent: 'Firefox 119.0.0',
    riskLevel: 'Low',
    location: 'Kochi, Kerala'
  },
  {
    id: 3,
    timestamp: '2025-09-09 03:22:15',
    action: 'Failed Login Attempt',
    user: 'Unknown',
    ipAddress: '203.123.45.67',
    userAgent: 'Unknown',
    riskLevel: 'High',
    location: 'Unknown'
  },
  {
    id: 4,
    timestamp: '2025-09-08 16:30:45',
    action: 'Permission Escalation',
    user: 'System Admin',
    ipAddress: '192.168.1.10',
    userAgent: 'Chrome 118.0.0',
    riskLevel: 'Medium',
    location: 'Kochi, Kerala'
  },
  {
    id: 5,
    timestamp: '2025-09-08 14:22:33',
    action: 'Bulk Document Download',
    user: 'Meera Menon',
    ipAddress: '192.168.1.25',
    userAgent: 'Edge 118.0.0',
    riskLevel: 'Medium',
    location: 'Kochi, Kerala'
  }
];

const systemHealth = [
  { component: 'Web Server', status: 'Healthy', uptime: '99.97%', lastCheck: '2 min ago' },
  { component: 'Database', status: 'Healthy', uptime: '99.95%', lastCheck: '1 min ago' },
  { component: 'AI Services', status: 'Healthy', uptime: '99.89%', lastCheck: '3 min ago' },
  { component: 'File Storage', status: 'Warning', uptime: '98.23%', lastCheck: '5 min ago' },
  { component: 'Search Index', status: 'Healthy', uptime: '99.78%', lastCheck: '2 min ago' },
  { component: 'Backup System', status: 'Healthy', uptime: '99.92%', lastCheck: '10 min ago' }
];

export function EnhancedAdmin() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-secondary text-secondary-foreground"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'Inactive':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Inactive</Badge>;
      case 'Suspended':
        return <Badge variant="destructive"><Lock className="w-3 h-3 mr-1" />Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSecurityLevelBadge = (level: string) => {
    switch (level) {
      case 'Maximum':
        return <Badge variant="destructive">Maximum</Badge>;
      case 'High':
        return <Badge className="bg-accent text-accent-foreground">High</Badge>;
      case 'Medium':
        return <Badge variant="outline">Medium</Badge>;
      default:
        return <Badge variant="secondary">Basic</Badge>;
    }
  };

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'High':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="border-accent text-accent">Medium Risk</Badge>;
      case 'Low':
        return <Badge className="bg-secondary text-secondary-foreground">Low Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getHealthStatus = (status: string) => {
    switch (status) {
      case 'Healthy':
        return <Badge className="bg-secondary text-secondary-foreground"><CheckCircle className="w-3 h-3 mr-1" />Healthy</Badge>;
      case 'Warning':
        return <Badge variant="outline" className="border-accent text-accent"><AlertTriangle className="w-3 h-3 mr-1" />Warning</Badge>;
      case 'Critical':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Critical</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl tracking-tight text-foreground flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary" />
              <Settings className="w-4 h-4 text-secondary absolute -top-1 -right-1" />
            </div>
            System Administration Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Advanced user management, security controls, and system monitoring for KMRL
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1 bg-secondary/20 text-secondary">
            <Activity className="w-3 h-3" />
            System Health: {systemMetrics.systemHealth}%
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {systemMetrics.activeSessions} Active Sessions
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl text-primary">{systemMetrics.totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="w-3 h-3 text-secondary" />
              <span className="text-secondary">+3 this month</span>
            </div>
            <Progress value={85} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-secondary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl text-secondary">{systemMetrics.activeSessions}</p>
              </div>
              <Activity className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-xs text-muted-foreground">Peak today: 47 sessions</div>
            <Progress value={48} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Security Alerts</p>
                <p className="text-2xl text-accent">{systemMetrics.securityAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-accent" />
            </div>
            <div className="text-xs text-muted-foreground">1 high priority</div>
            <Progress value={15} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-destructive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-2xl">{systemMetrics.systemHealth}%</p>
              </div>
              <Server className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-xs text-secondary">All systems operational</div>
            <Progress value={systemMetrics.systemHealth} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Real-time System Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-sm">CPU Usage</span>
              </div>
              <span className="text-sm font-medium">{systemMetrics.cpuUsage}%</span>
            </div>
            <Progress value={systemMetrics.cpuUsage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MemoryStick className="w-4 h-4 text-secondary" />
                <span className="text-sm">Memory</span>
              </div>
              <span className="text-sm font-medium">{systemMetrics.memoryUsage}%</span>
            </div>
            <Progress value={systemMetrics.memoryUsage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-accent" />
                <span className="text-sm">Disk Usage</span>
              </div>
              <span className="text-sm font-medium">{systemMetrics.diskUsage}%</span>
            </div>
            <Progress value={systemMetrics.diskUsage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-destructive" />
                <span className="text-sm">Network</span>
              </div>
              <span className="text-sm font-medium">{systemMetrics.networkLoad}%</span>
            </div>
            <Progress value={systemMetrics.networkLoad} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Activity Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  User Activity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{user.sessionsToday} sessions</div>
                        <div className="text-xs text-muted-foreground">
                          {user.documentsAccessed} docs accessed
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-secondary" />
                  System Components Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemHealth.map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">{component.component}</div>
                        <div className="text-xs text-muted-foreground">
                          Uptime: {component.uptime} • Last check: {component.lastCheck}
                        </div>
                      </div>
                      {getHealthStatus(component.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <UserPlus className="w-5 h-5" />
              <span className="text-sm">Add New User</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm">Security Scan</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              <span className="text-sm">Backup System</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span className="text-sm">Generate Report</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="users">
          {/* Enhanced User Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Legal Officer">Legal Officer</SelectItem>
                    <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
                    <SelectItem value="Security Officer">Security Officer</SelectItem>
                    <SelectItem value="IT Administrator">IT Administrator</SelectItem>
                    <SelectItem value="Operations Head">Operations Head</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Showing {filteredUsers.length} of {users.length} users</span>
                <span>Last updated: {currentTime.toLocaleTimeString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Users Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Management ({filteredUsers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {filteredUsers.map((user) => (
                      <div 
                        key={user.id}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="text-lg">{user.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-sm font-medium">{user.name}</h3>
                                {getStatusBadge(user.status)}
                                {user.twoFactorEnabled && (
                                  <Badge variant="outline" className="text-xs">
                                    <Shield className="w-3 h-3 mr-1" />
                                    2FA
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground mb-2">
                                {user.email} • {user.department}
                              </div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">{user.role}</Badge>
                                {getSecurityLevelBadge(user.securityLevel)}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <span className="text-muted-foreground">Last Login:</span>
                                  <div>{user.lastLogin}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Sessions Today:</span>
                                  <div>{user.sessionsToday}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Key className="w-4 h-4 mr-2" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Activity
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                {user.status === 'Active' ? (
                                  <>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Suspend User
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="w-4 h-4 mr-2" />
                                    Activate User
                                  </>
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Detail Panel */}
            <div>
              {selectedUser ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      User Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarFallback className="text-lg">{selectedUser.avatar}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedUser.role}</p>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedUser.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedUser.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedUser.department}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedUser.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Joined {selectedUser.joinDate}</span>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-2">Activity Summary</h4>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-2 bg-muted/50 rounded">
                          <div className="text-lg font-medium">{selectedUser.loginCount}</div>
                          <div className="text-xs text-muted-foreground">Total Logins</div>
                        </div>
                        <div className="p-2 bg-muted/50 rounded">
                          <div className="text-lg font-medium">{selectedUser.documentsAccessed}</div>
                          <div className="text-xs text-muted-foreground">Docs Accessed</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Permissions</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedUser.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit User
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Select a user to view detailed information
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Security Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">
                      Require 2FA for all admin users
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Session Timeout</p>
                    <p className="text-xs text-muted-foreground">
                      Auto-logout after 4 hours of inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">IP Whitelisting</p>
                    <p className="text-xs text-muted-foreground">
                      Restrict access to approved IP ranges
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Advanced Threat Detection</p>
                    <p className="text-xs text-muted-foreground">
                      AI-powered anomaly detection
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Audit Logging</p>
                    <p className="text-xs text-muted-foreground">
                      Comprehensive activity logging
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Security Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  Security Alerts & Threats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>High Priority:</strong> 3 failed login attempts from unknown IP address in the last hour.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Medium Priority:</strong> Unusual file access pattern detected for user "Unknown User".
                    </AlertDescription>
                  </Alert>
                  
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Resolved:</strong> Security patch applied successfully to all systems.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityLogs.slice(0, 10).map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium">{log.action}</span>
                        {getRiskLevelBadge(log.riskLevel)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        User: {log.user} • IP: {log.ipAddress} • {log.location}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>{systemMetrics.cpuUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.cpuUsage} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>{systemMetrics.memoryUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.memoryUsage} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Disk Usage</span>
                      <span>{systemMetrics.diskUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.diskUsage} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Network Load</span>
                      <span>{systemMetrics.networkLoad}%</span>
                    </div>
                    <Progress value={systemMetrics.networkLoad} className="h-2" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span>{systemMetrics.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Backup:</span>
                    <span>{systemMetrics.lastBackup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Documents:</span>
                    <span>{systemMetrics.totalDocuments.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Component Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-secondary" />
                  Component Health Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemHealth.map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="text-sm font-medium">{component.component}</div>
                        <div className="text-xs text-muted-foreground">
                          Uptime: {component.uptime}
                        </div>
                      </div>
                      <div className="text-right">
                        {getHealthStatus(component.status)}
                        <div className="text-xs text-muted-foreground mt-1">
                          {component.lastCheck}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                System Activity Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {securityLogs.map((log) => (
                  <div key={log.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium">{log.action}</span>
                        {getRiskLevelBadge(log.riskLevel)}
                      </div>
                      <div className="text-xs text-muted-foreground grid grid-cols-2 gap-4">
                        <span>User: {log.user}</span>
                        <span>IP: {log.ipAddress}</span>
                        <span>Browser: {log.userAgent}</span>
                        <span>Location: {log.location}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      {log.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">System Name</label>
                    <Input defaultValue="KMRL Document Intelligence" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Session Timeout (hours)</label>
                    <Input defaultValue="4" type="number" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Max File Size (MB)</label>
                    <Input defaultValue="10" type="number" className="mt-1" />
                  </div>
                  <Button className="w-full">Save Configuration</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup & Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download System Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore from Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    System Maintenance
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Database Optimization
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}