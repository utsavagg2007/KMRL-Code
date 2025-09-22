import React, { useState } from 'react';
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
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
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

const users = [
  {
    id: 1,
    name: 'Anand Kumar',
    email: 'anand.kumar@kmrl.gov.in',
    role: 'Legal Officer',
    department: 'Legal',
    status: 'Active',
    lastLogin: '2025-09-09 09:15',
    permissions: ['read', 'write', 'approve'],
    avatar: 'AK'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@kmrl.gov.in',
    role: 'Engineering Manager',
    department: 'Engineering',
    status: 'Active',
    lastLogin: '2025-09-09 08:45',
    permissions: ['read', 'write'],
    avatar: 'RK'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya.sharma@kmrl.gov.in',
    role: 'Security Officer',
    department: 'Security',
    status: 'Active',
    lastLogin: '2025-09-08 16:30',
    permissions: ['read', 'write'],
    avatar: 'PS'
  },
  {
    id: 4,
    name: 'Meera Menon',
    email: 'meera.menon@kmrl.gov.in',
    role: 'IT Administrator',
    department: 'IT',
    status: 'Active',
    lastLogin: '2025-09-09 07:20',
    permissions: ['read', 'write', 'admin'],
    avatar: 'MM'
  },
  {
    id: 5,
    name: 'Suresh Nair',
    email: 'suresh.nair@kmrl.gov.in',
    role: 'Operations Head',
    department: 'Operations',
    status: 'Inactive',
    lastLogin: '2025-09-05 14:10',
    permissions: ['read', 'write', 'approve'],
    avatar: 'SN'
  }
];

const roles = [
  {
    name: 'Administrator',
    permissions: ['read', 'write', 'delete', 'admin', 'approve'],
    userCount: 2,
    description: 'Full system access and user management'
  },
  {
    name: 'Legal Officer',
    permissions: ['read', 'write', 'approve'],
    userCount: 8,
    description: 'Document review and legal approval authority'
  },
  {
    name: 'Department Manager',
    permissions: ['read', 'write', 'approve'],
    userCount: 12,
    description: 'Department-level document management'
  },
  {
    name: 'Officer',
    permissions: ['read', 'write'],
    userCount: 25,
    description: 'Standard document access and editing'
  },
  {
    name: 'Viewer',
    permissions: ['read'],
    userCount: 15,
    description: 'Read-only access to documents'
  }
];

const systemLogs = [
  {
    id: 1,
    action: 'User Login',
    user: 'Anand Kumar',
    timestamp: '2025-09-09 09:15:23',
    ip: '192.168.1.45',
    status: 'Success'
  },
  {
    id: 2,
    action: 'Document Upload',
    user: 'Rajesh Kumar',
    timestamp: '2025-09-09 08:45:12',
    ip: '192.168.1.67',
    status: 'Success'
  },
  {
    id: 3,
    action: 'Failed Login Attempt',
    user: 'Unknown',
    timestamp: '2025-09-09 03:22:15',
    ip: '203.123.45.67',
    status: 'Failed'
  },
  {
    id: 4,
    action: 'Permission Change',
    user: 'System Admin',
    timestamp: '2025-09-08 16:30:45',
    ip: '192.168.1.10',
    status: 'Success'
  }
];

export function Admin() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-secondary text-secondary-foreground">Active</Badge>;
      case 'Inactive':
        return <Badge variant="outline">Inactive</Badge>;
      case 'Suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPermissionBadge = (permission: string) => {
    const colorMap = {
      'read': 'bg-primary text-primary-foreground',
      'write': 'bg-secondary text-secondary-foreground',
      'approve': 'bg-accent text-accent-foreground',
      'delete': 'bg-destructive text-destructive-foreground',
      'admin': 'bg-chart-4 text-white'
    };
    
    return (
      <Badge className={`text-xs ${colorMap[permission] || 'bg-muted'}`}>
        {permission}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            System Administration
          </h1>
          <p className="text-muted-foreground">
            Manage users, roles, permissions, and system configuration
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                <p className="text-2xl">62</p>
                <p className="text-xs text-secondary">+3 this month</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Sessions</p>
                <p className="text-2xl">24</p>
                <p className="text-xs text-muted-foreground">Current active users</p>
              </div>
              <Activity className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Security Alerts</p>
                <p className="text-2xl">3</p>
                <p className="text-xs text-accent">Requires attention</p>
              </div>
              <Shield className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-chart-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">System Health</p>
                <p className="text-2xl">98%</p>
                <p className="text-xs text-secondary">All systems operational</p>
              </div>
              <Database className="w-8 h-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* User Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Legal Officer">Legal Officer</SelectItem>
                    <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
                    <SelectItem value="Security Officer">Security Officer</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{user.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="w-4 h-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Roles List */}
            <Card>
              <CardHeader>
                <CardTitle>System Roles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {roles.map((role, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm">{role.name}</h3>
                      <Badge variant="outline">{role.userCount} users</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => 
                        getPermissionBadge(permission)
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Permission Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-2 text-xs">
                    <div></div>
                    <div className="text-center">Read</div>
                    <div className="text-center">Write</div>
                    <div className="text-center">Approve</div>
                    <div className="text-center">Delete</div>
                    <div className="text-center">Admin</div>
                  </div>
                  
                  {roles.map((role, index) => (
                    <div key={index} className="grid grid-cols-6 gap-2 items-center">
                      <div className="text-sm">{role.name}</div>
                      <div className="text-center">
                        {role.permissions.includes('read') && 
                          <div className="w-3 h-3 bg-primary rounded-full mx-auto" />
                        }
                      </div>
                      <div className="text-center">
                        {role.permissions.includes('write') && 
                          <div className="w-3 h-3 bg-secondary rounded-full mx-auto" />
                        }
                      </div>
                      <div className="text-center">
                        {role.permissions.includes('approve') && 
                          <div className="w-3 h-3 bg-accent rounded-full mx-auto" />
                        }
                      </div>
                      <div className="text-center">
                        {role.permissions.includes('delete') && 
                          <div className="w-3 h-3 bg-destructive rounded-full mx-auto" />
                        }
                      </div>
                      <div className="text-center">
                        {role.permissions.includes('admin') && 
                          <div className="w-3 h-3 bg-chart-4 rounded-full mx-auto" />
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Security Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground">
                      Require 2FA for all admin users
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Session Timeout</p>
                    <p className="text-xs text-muted-foreground">
                      Auto-logout after 4 hours of inactivity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">IP Whitelisting</p>
                    <p className="text-xs text-muted-foreground">
                      Restrict access to approved IP ranges
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">Audit Logging</p>
                    <p className="text-xs text-muted-foreground">
                      Log all user activities and system changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Password Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Password Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm">Minimum password length: 12 characters</p>
                  <p className="text-sm">Require uppercase and lowercase letters</p>
                  <p className="text-sm">Require numbers and special characters</p>
                  <p className="text-sm">Password expiry: 90 days</p>
                  <p className="text-sm">Prevent reuse of last 5 passwords</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  Update Password Policy
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm text-muted-foreground">
                        {log.timestamp}
                      </TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {log.ip}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={log.status === 'Success' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}