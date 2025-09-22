import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import {
  Users,
  Shield,
  Settings,
  Database,
  Activity,
  Lock,
  Key,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Server,
  HardDrive,
  Cpu,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  Phone,
  Building,
  Calendar,
  FileText,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  role: string;
  clearanceLevel: number;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: Date;
  createdAt: Date;
  permissions: string[];
}

interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  result: 'success' | 'failure';
  details: string;
}

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'KMRL001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@kmrl.gov.in',
    department: 'Infrastructure',
    role: 'Senior Manager',
    clearanceLevel: 3,
    status: 'active',
    lastLogin: new Date('2025-01-10T14:30:00'),
    createdAt: new Date('2024-06-15'),
    permissions: ['document:read', 'document:write', 'ai:query', 'reports:generate']
  },
  {
    id: '2',
    employeeId: 'KMRL002',
    name: 'Priya Nair',
    email: 'priya.nair@kmrl.gov.in',
    department: 'Operations',
    role: 'Operations Manager',
    clearanceLevel: 4,
    status: 'active',
    lastLogin: new Date('2025-01-10T13:45:00'),
    createdAt: new Date('2024-05-20'),
    permissions: ['document:read', 'document:write', 'ai:query', 'compliance:manage']
  },
  {
    id: '3',
    employeeId: 'KMRL003',
    name: 'Arjun Menon',
    email: 'arjun.menon@kmrl.gov.in',
    department: 'Human Resources',
    role: 'HR Specialist',
    clearanceLevel: 2,
    status: 'active',
    lastLogin: new Date('2025-01-10T12:15:00'),
    createdAt: new Date('2024-08-10'),
    permissions: ['document:read', 'hr:manage', 'policies:update']
  }
];

const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: 'KMRL001',
    userName: 'Rajesh Kumar',
    action: 'Document Upload',
    resource: 'TD-2025-001',
    timestamp: new Date('2025-01-10T14:30:00'),
    ipAddress: '192.168.1.101',
    result: 'success',
    details: 'Uploaded Metro Line Extension Tender Documentation'
  },
  {
    id: '2',
    userId: 'KMRL002',
    userName: 'Priya Nair',
    action: 'AI Query',
    resource: 'Contract Analysis',
    timestamp: new Date('2025-01-10T13:45:00'),
    ipAddress: '192.168.1.102',
    result: 'success',
    details: 'Queried contract compliance for CX-891-2025'
  },
  {
    id: '3',
    userId: 'KMRL003',
    userName: 'Arjun Menon',
    action: 'Policy Update',
    resource: 'HR-POL-2025-003',
    timestamp: new Date('2025-01-10T12:15:00'),
    ipAddress: '192.168.1.103',
    result: 'success',
    details: 'Updated Employee Safety Guidelines v2.3'
  }
];

const systemMetrics: SystemMetric[] = [
  { name: 'CPU Usage', value: 23.4, unit: '%', status: 'healthy', trend: 'stable' },
  { name: 'Memory Usage', value: 68.2, unit: '%', status: 'healthy', trend: 'up' },
  { name: 'Disk Usage', value: 45.7, unit: '%', status: 'healthy', trend: 'up' },
  { name: 'Network I/O', value: 12.3, unit: 'MB/s', status: 'healthy', trend: 'stable' },
  { name: 'Database Connections', value: 87, unit: 'active', status: 'healthy', trend: 'stable' },
  { name: 'API Response Time', value: 234, unit: 'ms', status: 'healthy', trend: 'down' }
];

export function WorldClassAdmin() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getClearanceBadge = (level: number) => {
    const colors = {
      1: 'bg-blue-100 text-blue-800',
      2: 'bg-green-100 text-green-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    };
    return (
      <Badge variant="secondary" className={colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        Level {level}
      </Badge>
    );
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const adminStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingApprovals: 3,
    systemHealth: 98.7,
    totalDocuments: 47562,
    apiCalls: 15420,
    storageUsed: 2.4,
    backupStatus: 'Complete'
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            System Administration Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive system management, user administration, and security controls
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            System Healthy
          </Badge>
          <Button className="bg-primary hover:bg-primary/90">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Admin Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-lg border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-primary">{adminStats.totalUsers}</p>
                <p className="text-xs text-green-600 mt-1">{adminStats.activeUsers} active</p>
              </div>
              <Users className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold text-secondary">{adminStats.systemHealth}%</p>
                <Progress value={adminStats.systemHealth} className="mt-2 h-1" />
              </div>
              <Activity className="w-8 h-8 text-secondary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold text-accent">{adminStats.storageUsed} TB</p>
                <p className="text-xs text-muted-foreground mt-1">of 10 TB total</p>
              </div>
              <HardDrive className="w-8 h-8 text-accent/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">API Calls Today</p>
                <p className="text-2xl font-bold text-green-600">{adminStats.apiCalls.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
              </div>
              <Zap className="w-8 h-8 text-green-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Server className="w-4 h-4" />
            <span>System</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Audit</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Management Header */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search users by name, email, or employee ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Senior Manager">Senior Manager</SelectItem>
                      <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                      <SelectItem value="HR Specialist">HR Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new user account with appropriate permissions and clearance level
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="employeeId">Employee ID</Label>
                          <Input id="employeeId" placeholder="KMRL001" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="john.doe@kmrl.gov.in" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="infrastructure">Infrastructure</SelectItem>
                              <SelectItem value="operations">Operations</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="hr">Human Resources</SelectItem>
                              <SelectItem value="legal">Legal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="senior-manager">Senior Manager</SelectItem>
                              <SelectItem value="specialist">Specialist</SelectItem>
                              <SelectItem value="analyst">Analyst</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="clearance">Clearance Level</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Level 1 - Basic</SelectItem>
                              <SelectItem value="2">Level 2 - Standard</SelectItem>
                              <SelectItem value="3">Level 3 - Elevated</SelectItem>
                              <SelectItem value="4">Level 4 - High</SelectItem>
                              <SelectItem value="5">Level 5 - Maximum</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            toast.success('User created successfully');
                            setIsAddUserOpen(false);
                          }}
                        >
                          Create User
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>
                {filteredUsers.length} users found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Clearance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-primary">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">ID: {user.employeeId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.department}</Badge>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{getClearanceBadge(user.clearanceLevel)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{user.lastLogin.toLocaleDateString()}</p>
                            <p className="text-muted-foreground">{user.lastLogin.toLocaleTimeString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Lock className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemMetrics.map((metric, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
                      <p className="text-2xl font-bold">
                        {metric.value} {metric.unit}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      {getMetricStatus(metric.status)}
                      <Badge variant="outline" className="text-xs">
                        {metric.trend === 'up' && '↑'}
                        {metric.trend === 'down' && '↓'}
                        {metric.trend === 'stable' && '→'}
                      </Badge>
                    </div>
                  </div>
                  {metric.name.includes('Usage') && (
                    <Progress value={metric.value} className="mt-2 h-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* System Controls */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-primary" />
                <span>System Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Database Management</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="w-4 h-4 mr-2" />
                      Backup Database
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Restore from Backup
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Database Statistics
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">System Maintenance</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Cpu className="w-4 h-4 mr-2" />
                      System Diagnostics
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <HardDrive className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="w-4 h-4 mr-2" />
                      Performance Monitor
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary" />
                <span>Audit Trail</span>
              </CardTitle>
              <CardDescription>
                Complete system activity log and security audit trail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{log.userName}</p>
                            <p className="text-sm text-muted-foreground">{log.userId}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{log.action}</Badge>
                        </TableCell>
                        <TableCell>{log.resource}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{log.timestamp.toLocaleDateString()}</p>
                            <p className="text-muted-foreground">{log.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                        <TableCell>
                          {log.result === 'success' ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">Success</Badge>
                          ) : (
                            <Badge variant="destructive">Failure</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">System Integrity</span>
                    <Badge className="bg-green-600 hover:bg-green-700">SECURE</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Data Encryption</span>
                    <Badge className="bg-green-600 hover:bg-green-700">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Firewall Status</span>
                    <Badge className="bg-green-600 hover:bg-green-700">PROTECTED</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Intrusion Detection</span>
                    <Badge className="bg-green-600 hover:bg-green-700">MONITORING</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5 text-accent" />
                  <span>Access Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Multi-Factor Authentication</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Session Timeout (minutes)</span>
                    <Input type="number" defaultValue="30" className="w-20" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Password Complexity</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Login Attempt Limit</span>
                    <Input type="number" defaultValue="3" className="w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">General Settings</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Maintenance Mode</span>
                      <Switch />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Auto Backup</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Email Notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Debug Mode</span>
                      <Switch />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Performance Settings</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Cache Duration (hours)</Label>
                      <Input type="number" defaultValue="24" />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Upload Size (MB)</Label>
                      <Input type="number" defaultValue="50" />
                    </div>
                    <div className="space-y-2">
                      <Label>API Rate Limit (per minute)</Label>
                      <Input type="number" defaultValue="1000" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}