import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Bell, 
  Calendar,
  FileText,
  Users,
  DollarSign,
  Shield,
  Filter,
  Eye,
  MoreHorizontal,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
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
import { Progress } from './ui/progress';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Metro Rail Maintenance Contract Expiring',
    description: 'Critical maintenance contract expires in 5 days. Immediate renewal action required.',
    category: 'Contract Expiry',
    department: 'Engineering',
    priority: 'Critical',
    daysRemaining: 5,
    value: '₹2.4 crores',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    acknowledged: false,
    assignedTo: 'Rajesh Kumar'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Pending Document Review',
    description: 'Station Security Tender document requires legal review before submission deadline.',
    category: 'Compliance',
    department: 'Legal',
    priority: 'High',
    daysRemaining: 10,
    value: '₹1.8 crores',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    acknowledged: false,
    assignedTo: 'Anand Kumar'
  },
  {
    id: 3,
    type: 'warning',
    title: 'Missing Safety Compliance Certificate',
    description: 'Annual safety compliance certificate for Track Inspection Manual is missing.',
    category: 'Compliance',
    department: 'Safety',
    priority: 'High',
    daysRemaining: 15,
    value: null,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    acknowledged: true,
    assignedTo: 'Priya Sharma'
  },
  {
    id: 4,
    type: 'info',
    title: 'Tender Submission Deadline Approaching',
    description: 'Passenger Information System upgrade tender submission due in 20 days.',
    category: 'Tender',
    department: 'IT',
    priority: 'Medium',
    daysRemaining: 20,
    value: '₹5.2 crores',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    acknowledged: false,
    assignedTo: 'Meera Menon'
  },
  {
    id: 5,
    type: 'critical',
    title: 'Contract Performance Review Overdue',
    description: 'Station Cleaning Services contract performance review is 5 days overdue.',
    category: 'Performance',
    department: 'Operations',
    priority: 'Critical',
    daysRemaining: -5,
    value: '₹85 lakhs',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    acknowledged: false,
    assignedTo: 'Suresh Nair'
  },
  {
    id: 6,
    type: 'info',
    title: 'New Policy Document Uploaded',
    description: 'Updated Employee Safety Guidelines v2.1 has been uploaded and requires department review.',
    category: 'Policy Update',
    department: 'HR',
    priority: 'Low',
    daysRemaining: 30,
    value: null,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    acknowledged: true,
    assignedTo: 'Multiple'
  }
];

const alertStats = {
  critical: alerts.filter(a => a.type === 'critical').length,
  warning: alerts.filter(a => a.type === 'warning').length,
  info: alerts.filter(a => a.type === 'info').length,
  acknowledged: alerts.filter(a => a.acknowledged).length,
  total: alerts.length
};

export function Alerts() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = selectedFilter === 'all' || alert.type === selectedFilter;
    const deptMatch = selectedDepartment === 'all' || alert.department === selectedDepartment;
    return typeMatch && deptMatch;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-accent" />;
      case 'info':
        return <Bell className="w-4 h-4 text-primary" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-accent text-accent">Warning</Badge>;
      case 'info':
        return <Badge className="bg-primary text-primary-foreground">Info</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'High':
        return <Badge variant="outline" className="border-accent text-accent">High</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'Low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const handleAcknowledge = (alertId: number) => {
    // In a real app, this would update the backend
    console.log('Acknowledged alert:', alertId);
  };

  const handleSnooze = (alertId: number) => {
    // In a real app, this would snooze the alert
    console.log('Snoozed alert:', alertId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-primary" />
            Alerts & Notifications
          </h1>
          <p className="text-muted-foreground">
            Monitor critical deadlines, compliance requirements, and system notifications
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Acknowledge All
        </Button>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl text-destructive">{alertStats.critical}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warning</p>
                <p className="text-2xl text-accent">{alertStats.warning}</p>
              </div>
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Info</p>
                <p className="text-2xl text-primary">{alertStats.info}</p>
              </div>
              <Bell className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Acknowledged</p>
                <p className="text-2xl text-secondary">{alertStats.acknowledged}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-muted-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl">{alertStats.total}</p>
              </div>
              <div className="text-right">
                <Progress 
                  value={(alertStats.acknowledged / alertStats.total) * 100} 
                  className="w-16 h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.round((alertStats.acknowledged / alertStats.total) * 100)}% handled
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="Safety">Safety</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts ({filteredAlerts.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                      alert.acknowledged ? 'opacity-60' : ''
                    }`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm">{alert.title}</h3>
                            {getAlertBadge(alert.type)}
                            {alert.acknowledged && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Acknowledged
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {alert.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {alert.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {alert.daysRemaining > 0 
                                ? `${alert.daysRemaining} days remaining`
                                : `${Math.abs(alert.daysRemaining)} days overdue`
                              }
                            </span>
                            {alert.value && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {alert.value}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(alert.priority)}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Detail Sidebar */}
        <div>
          {selectedAlert ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Alert Details</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedAlert(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getAlertIcon(selectedAlert.type)}
                    <h3 className="text-lg">{selectedAlert.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedAlert.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Priority:</span>
                    {getPriorityBadge(selectedAlert.priority)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Department:</span>
                    <span>{selectedAlert.department}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Assigned to:</span>
                    <span>{selectedAlert.assignedTo}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{selectedAlert.timestamp.toLocaleString()}</span>
                  </div>
                  
                  {selectedAlert.value && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Contract Value:</span>
                      <span>{selectedAlert.value}</span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={() => handleAcknowledge(selectedAlert.id)}
                    disabled={selectedAlert.acknowledged}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {selectedAlert.acknowledged ? 'Acknowledged' : 'Acknowledge'}
                  </Button>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Related Document
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => handleSnooze(selectedAlert.id)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Snooze for 24h
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Select an alert to view details and take action
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}