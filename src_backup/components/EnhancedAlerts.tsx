import React, { useState, useEffect } from 'react';
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
  X,
  Zap,
  Target,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Info,
  Scale,
  Lock,
  Globe,
  RefreshCw,
  Download,
  Settings,
  Bookmark,
  Share2,
  Mail,
  Phone,
  MessageSquare,
  Activity,
  Timer,
  Flag,
  Archive,
  Search,
  SortDesc,
  Star,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
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
import { Alert, AlertDescription } from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';

const alerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Metro Rail Maintenance Contract Expiring',
    description: 'Critical infrastructure maintenance contract expires in 5 days. Service disruption risk if not renewed immediately.',
    category: 'Contract Expiry',
    department: 'Engineering',
    priority: 'Critical',
    severity: 5,
    daysRemaining: 5,
    value: '₹2.4 crores',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    acknowledged: false,
    assignedTo: 'Rajesh Kumar',
    assignedEmail: 'rajesh.kumar@kmrl.org',
    complianceRisk: 'High',
    businessImpact: 'Service Disruption',
    recommendedAction: 'Immediate contract renewal initiation',
    relatedDocuments: ['Metro_Maintenance_Contract_2024.pdf', 'Renewal_Terms_Draft.pdf'],
    escalationLevel: 3,
    slaHours: 24,
    tags: ['maintenance', 'critical', 'infrastructure'],
    riskScore: 95,
    autoEscalated: true
  },
  {
    id: 2,
    type: 'warning',
    title: 'Pending Legal Review - Security Tender',
    description: 'Station Security Services tender document requires urgent legal compliance review before submission deadline.',
    category: 'Compliance',
    department: 'Legal',
    priority: 'High',
    severity: 4,
    daysRemaining: 10,
    value: '₹1.8 crores',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    acknowledged: false,
    assignedTo: 'Anand Kumar',
    assignedEmail: 'anand.kumar@kmrl.org',
    complianceRisk: 'Medium',
    businessImpact: 'Tender Rejection Risk',
    recommendedAction: 'Schedule immediate legal review meeting',
    relatedDocuments: ['Security_Tender_Draft_v2.pdf', 'Compliance_Checklist.pdf'],
    escalationLevel: 2,
    slaHours: 48,
    tags: ['legal', 'tender', 'compliance'],
    riskScore: 78,
    autoEscalated: false
  },
  {
    id: 3,
    type: 'critical',
    title: 'Safety Compliance Certificate Missing',
    description: 'Annual safety compliance certificate for Track Inspection Manual is overdue. Regulatory violation imminent.',
    category: 'Regulatory Compliance',
    department: 'Safety',
    priority: 'Critical',
    severity: 5,
    daysRemaining: -3,
    value: null,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    acknowledged: true,
    assignedTo: 'Priya Sharma',
    assignedEmail: 'priya.sharma@kmrl.org',
    complianceRisk: 'Critical',
    businessImpact: 'Regulatory Penalty',
    recommendedAction: 'Obtain certificate within 24 hours',
    relatedDocuments: ['Track_Inspection_Manual_v3.pdf', 'Safety_Certification_Requirements.pdf'],
    escalationLevel: 4,
    slaHours: 8,
    tags: ['safety', 'compliance', 'overdue'],
    riskScore: 98,
    autoEscalated: true
  },
  {
    id: 4,
    type: 'warning',
    title: 'Contract Performance Review Overdue',
    description: 'Station Cleaning Services contract quarterly performance review is 5 days overdue.',
    category: 'Performance Management',
    department: 'Operations',
    priority: 'High',
    severity: 3,
    daysRemaining: -5,
    value: '₹85 lakhs',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    acknowledged: false,
    assignedTo: 'Suresh Nair',
    assignedEmail: 'suresh.nair@kmrl.org',
    complianceRisk: 'Medium',
    businessImpact: 'Service Quality Risk',
    recommendedAction: 'Complete performance evaluation',
    relatedDocuments: ['Cleaning_Services_Contract.pdf', 'Performance_Metrics_Q2.pdf'],
    escalationLevel: 1,
    slaHours: 72,
    tags: ['performance', 'review', 'overdue'],
    riskScore: 65,
    autoEscalated: false
  },
  {
    id: 5,
    type: 'info',
    title: 'Tender Submission Deadline Approaching',
    description: 'Passenger Information System upgrade tender submission due in 20 days. Preparation status tracking required.',
    category: 'Tender Management',
    department: 'IT',
    priority: 'Medium',
    severity: 2,
    daysRemaining: 20,
    value: '₹5.2 crores',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    acknowledged: false,
    assignedTo: 'Meera Menon',
    assignedEmail: 'meera.menon@kmrl.org',
    complianceRisk: 'Low',
    businessImpact: 'Project Delay Risk',
    recommendedAction: 'Review preparation checklist',
    relatedDocuments: ['PIS_Upgrade_Tender.pdf', 'Technical_Specifications.pdf'],
    escalationLevel: 0,
    slaHours: 168,
    tags: ['tender', 'it', 'upgrade'],
    riskScore: 35,
    autoEscalated: false
  },
  {
    id: 6,
    type: 'info',
    title: 'Policy Update Notification',
    description: 'Updated Employee Safety Guidelines v2.1 requires department-wise review and acknowledgment by all staff.',
    category: 'Policy Update',
    department: 'HR',
    priority: 'Low',
    severity: 1,
    daysRemaining: 30,
    value: null,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    acknowledged: true,
    assignedTo: 'Multiple Departments',
    assignedEmail: 'hr@kmrl.org',
    complianceRisk: 'Low',
    businessImpact: 'Training Update Required',
    recommendedAction: 'Distribute to department heads',
    relatedDocuments: ['Employee_Safety_Guidelines_v2.1.pdf', 'Update_Summary.pdf'],
    escalationLevel: 0,
    slaHours: 720,
    tags: ['policy', 'safety', 'training'],
    riskScore: 15,
    autoEscalated: false
  }
];

const complianceMetrics = {
  totalContracts: 47,
  expiringContracts: 8,
  overdueReviews: 3,
  complianceScore: 87,
  criticalAlerts: alerts.filter(a => a.type === 'critical').length,
  averageResponseTime: 2.4,
  escalatedAlerts: alerts.filter(a => a.autoEscalated).length
};

export function EnhancedAlerts() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  const [activeTab, setActiveTab] = useState('alerts');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const typeMatch = selectedFilter === 'all' || alert.type === selectedFilter;
    const deptMatch = selectedDepartment === 'all' || alert.department === selectedDepartment;
    const severityMatch = selectedSeverity === 'all' || alert.severity.toString() === selectedSeverity;
    const searchMatch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return typeMatch && deptMatch && severityMatch && searchMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return b.severity - a.severity;
      case 'date':
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'risk':
        return b.riskScore - a.riskScore;
      default:
        return 0;
    }
  });

  const alertStats = {
    critical: alerts.filter(a => a.type === 'critical').length,
    warning: alerts.filter(a => a.type === 'warning').length,
    info: alerts.filter(a => a.type === 'info').length,
    acknowledged: alerts.filter(a => a.acknowledged).length,
    overdue: alerts.filter(a => a.daysRemaining < 0).length,
    total: alerts.length
  };

  const getAlertIcon = (type: string, severity: number) => {
    const iconClass = `w-4 h-4 ${
      type === 'critical' ? 'text-destructive' : 
      type === 'warning' ? 'text-accent' : 'text-primary'
    }`;
    
    if (severity >= 4) return <AlertTriangle className={iconClass} />;
    if (severity >= 3) return <AlertCircle className={iconClass} />;
    return <Info className={iconClass} />;
  };

  const getAlertBadge = (type: string, severity: number) => {
    if (type === 'critical') return <Badge variant="destructive">Critical</Badge>;
    if (type === 'warning') return <Badge variant="outline" className="border-accent text-accent">Warning</Badge>;
    return <Badge className="bg-primary text-primary-foreground">Info</Badge>;
  };

  const getSeverityBadge = (severity: number) => {
    const colors = {
      5: 'destructive',
      4: 'destructive',
      3: 'outline',
      2: 'secondary',
      1: 'outline'
    };
    return <Badge variant={colors[severity] || 'secondary'}>Level {severity}</Badge>;
  };

  const getRiskBadge = (riskScore: number) => {
    if (riskScore >= 80) return <Badge variant="destructive">High Risk</Badge>;
    if (riskScore >= 50) return <Badge variant="outline" className="border-accent text-accent">Medium Risk</Badge>;
    return <Badge className="bg-secondary text-secondary-foreground">Low Risk</Badge>;
  };

  const handleAcknowledge = (alertId: number) => {
    console.log('Acknowledged alert:', alertId);
  };

  const handleEscalate = (alertId: number) => {
    console.log('Escalated alert:', alertId);
  };

  const handleAssign = (alertId: number, assignee: string) => {
    console.log('Assigned alert:', alertId, 'to:', assignee);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl tracking-tight text-foreground flex items-center gap-3">
            <div className="relative">
              <Shield className="w-8 h-8 text-primary" />
              <AlertTriangle className="w-4 h-4 text-destructive absolute -top-1 -right-1" />
            </div>
            Compliance & Alert Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Government-grade monitoring for deadlines, compliance, and risk management
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-1 bg-secondary/20 text-secondary">
            <Activity className="w-3 h-3" />
            Real-time Monitoring
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Timer className="w-3 h-3" />
            Auto-escalation Active
          </Badge>
          <Button className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Acknowledge All Critical
          </Button>
        </div>
      </div>

      {/* Enhanced Alert Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="border-l-4 border-l-destructive hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl text-destructive">{alertStats.critical}</p>
                <p className="text-xs text-muted-foreground">Immediate action required</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Warnings</p>
                <p className="text-2xl text-accent">{alertStats.warning}</p>
                <p className="text-xs text-muted-foreground">Review needed</p>
              </div>
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-destructive hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Overdue</p>
                <p className="text-2xl text-destructive">{alertStats.overdue}</p>
                <p className="text-xs text-muted-foreground">Past deadline</p>
              </div>
              <TrendingDown className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Info Alerts</p>
                <p className="text-2xl text-primary">{alertStats.info}</p>
                <p className="text-xs text-muted-foreground">For awareness</p>
              </div>
              <Bell className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Compliance Score</p>
                <p className="text-2xl text-secondary">{complianceMetrics.complianceScore}%</p>
                <p className="text-xs text-muted-foreground">Government grade</p>
              </div>
              <Scale className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-muted-foreground hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Response Time</p>
                <p className="text-2xl">{complianceMetrics.averageResponseTime}h</p>
                <p className="text-xs text-muted-foreground">Average</p>
              </div>
              <Zap className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Auto-escalated</p>
                <p className="text-2xl text-accent">{complianceMetrics.escalatedAlerts}</p>
                <p className="text-xs text-muted-foreground">System triggered</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Dashboard</TabsTrigger>
          <TabsTrigger value="analytics">Risk Analytics</TabsTrigger>
          <TabsTrigger value="settings">Alert Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          {/* Enhanced Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type" />
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
                    <SelectValue placeholder="Department" />
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

                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="5">Level 5 (Critical)</SelectItem>
                    <SelectItem value="4">Level 4 (High)</SelectItem>
                    <SelectItem value="3">Level 3 (Medium)</SelectItem>
                    <SelectItem value="2">Level 2 (Low)</SelectItem>
                    <SelectItem value="1">Level 1 (Info)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="risk">Risk Score</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Showing {filteredAlerts.length} of {alerts.length} alerts</span>
                <span>•</span>
                <span>Last updated: {currentTime.toLocaleTimeString()}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Auto-refresh active
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Alerts List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Active Alerts ({filteredAlerts.length})</span>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <SortDesc className="w-4 h-4 mr-2" />
                        Sort
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {filteredAlerts.map((alert) => (
                      <div 
                        key={alert.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                          alert.acknowledged ? 'opacity-70 bg-muted/20' : 'hover:bg-muted/30'
                        } ${selectedAlert?.id === alert.id ? 'ring-2 ring-primary' : ''}`}
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="relative">
                              {getAlertIcon(alert.type, alert.severity)}
                              {alert.autoEscalated && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full animate-pulse" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-sm font-medium">{alert.title}</h3>
                                {getAlertBadge(alert.type, alert.severity)}
                                {getSeverityBadge(alert.severity)}
                                {alert.acknowledged && (
                                  <Badge variant="outline" className="text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Acknowledged
                                  </Badge>
                                )}
                                {alert.autoEscalated && (
                                  <Badge variant="destructive" className="text-xs">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    Auto-escalated
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3">
                                {alert.description}
                              </p>
                              
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    <span className="text-muted-foreground">Department:</span>
                                    <span>{alert.department}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span className="text-muted-foreground">Deadline:</span>
                                    <span className={alert.daysRemaining < 0 ? 'text-destructive' : ''}>
                                      {alert.daysRemaining > 0 
                                        ? `${alert.daysRemaining} days remaining`
                                        : `${Math.abs(alert.daysRemaining)} days overdue`
                                      }
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1">
                                    <Target className="w-3 h-3" />
                                    <span className="text-muted-foreground">Assigned:</span>
                                    <span>{alert.assignedTo}</span>
                                  </div>
                                  {alert.value && (
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="w-3 h-3" />
                                      <span className="text-muted-foreground">Value:</span>
                                      <span>{alert.value}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-3 pt-2 border-t">
                                <div className="flex items-center gap-2">
                                  {getRiskBadge(alert.riskScore)}
                                  <Badge variant="outline" className="text-xs">
                                    SLA: {alert.slaHours}h
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                  {alert.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
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
                              <DropdownMenuItem onClick={() => handleAcknowledge(alert.id)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Acknowledge
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEscalate(alert.id)}>
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Escalate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Archive className="w-4 h-4 mr-2" />
                                Archive
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

            {/* Enhanced Alert Detail Sidebar */}
            <div>
              {selectedAlert ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Alert Analysis</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedAlert(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {getAlertIcon(selectedAlert.type, selectedAlert.severity)}
                        <h3 className="text-lg font-medium">{selectedAlert.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {selectedAlert.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground">Risk Score</div>
                          <div className="flex items-center gap-2">
                            <Progress value={selectedAlert.riskScore} className="flex-1 h-2" />
                            <span className="text-sm font-medium">{selectedAlert.riskScore}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground">Severity Level</div>
                          <div className="text-lg font-medium">Level {selectedAlert.severity}</div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Department:</span>
                          <span>{selectedAlert.department}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <div className="text-right">
                            <div>{selectedAlert.assignedTo}</div>
                            <div className="text-xs text-muted-foreground">{selectedAlert.assignedEmail}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Compliance Risk:</span>
                          <Badge variant={selectedAlert.complianceRisk === 'Critical' ? 'destructive' : 
                                          selectedAlert.complianceRisk === 'High' ? 'destructive' :
                                          selectedAlert.complianceRisk === 'Medium' ? 'outline' : 'secondary'}>
                            {selectedAlert.complianceRisk}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Business Impact:</span>
                          <span className="text-right text-xs">{selectedAlert.businessImpact}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">SLA:</span>
                          <span>{selectedAlert.slaHours} hours</span>
                        </div>

                        {selectedAlert.value && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Contract Value:</span>
                            <span className="font-medium">{selectedAlert.value}</span>
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-2">Recommended Action</h4>
                        <Alert>
                          <Lightbulb className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            {selectedAlert.recommendedAction}
                          </AlertDescription>
                        </Alert>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Related Documents</h4>
                        <div className="space-y-2">
                          {selectedAlert.relatedDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs p-2 bg-muted/50 rounded">
                              <FileText className="w-3 h-3" />
                              <span className="flex-1">{doc}</span>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Eye className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button 
                          className="w-full" 
                          size="sm"
                          onClick={() => handleAcknowledge(selectedAlert.id)}
                          disabled={selectedAlert.acknowledged}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {selectedAlert.acknowledged ? 'Acknowledged' : 'Acknowledge Alert'}
                        </Button>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </div>

                        <Button 
                          variant="outline" 
                          className="w-full" 
                          size="sm"
                          onClick={() => handleEscalate(selectedAlert.id)}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Escalate to Manager
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-2">
                      Select an alert for detailed analysis
                    </p>
                    <p className="text-xs text-muted-foreground">
                      View compliance status, risk assessment, and recommended actions
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-secondary" />
                  Compliance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">{complianceMetrics.complianceScore}%</div>
                  <div className="text-sm text-muted-foreground">Overall Compliance Score</div>
                  <Progress value={complianceMetrics.complianceScore} className="mt-3" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl text-primary">{complianceMetrics.totalContracts}</div>
                    <div className="text-xs text-muted-foreground">Total Contracts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-accent">{complianceMetrics.expiringContracts}</div>
                    <div className="text-xs text-muted-foreground">Expiring Soon</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">{complianceMetrics.averageResponseTime}h avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-escalations</span>
                    <span className="text-sm font-medium">{complianceMetrics.escalatedAlerts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Uptime</span>
                    <span className="text-sm font-medium text-secondary">99.97%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Risk Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <Target className="w-12 h-12 mx-auto mb-3" />
                <p>Advanced risk analytics and predictive insights coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-12">
                <Settings className="w-12 h-12 mx-auto mb-3" />
                <p>Alert configuration and notification preferences</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}