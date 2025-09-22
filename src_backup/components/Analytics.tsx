import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  FileText,
  Users,
  Clock,
  AlertTriangle,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
// Simple chart components without external dependencies

const contractExpiryData = [
  { month: 'Sep 2025', expiring: 3, value: 4.7 },
  { month: 'Oct 2025', expiring: 5, value: 8.2 },
  { month: 'Nov 2025', expiring: 2, value: 3.1 },
  { month: 'Dec 2025', expiring: 7, value: 12.5 },
  { month: 'Jan 2026', expiring: 4, value: 6.8 },
  { month: 'Feb 2026', expiring: 6, value: 9.3 },
];

const departmentSpendData = [
  { department: 'Engineering', contracts: 45, value: 125.6, color: '#0B3D91' },
  { department: 'Operations', contracts: 32, value: 87.2, color: '#0F9D58' },
  { department: 'IT', contracts: 28, value: 78.4, color: '#FF9933' },
  { department: 'Security', contracts: 24, value: 65.1, color: '#6f42c1' },
  { department: 'HR', contracts: 18, value: 42.3, color: '#20c997' },
  { department: 'Finance', contracts: 15, value: 31.7, color: '#fd7e14' },
];

const documentCategoryData = [
  { category: 'Contracts', count: 4200, percentage: 33 },
  { category: 'Tenders', count: 2800, percentage: 22 },
  { category: 'HR Policies', count: 1850, percentage: 15 },
  { category: 'Manuals', count: 2100, percentage: 17 },
  { category: 'Compliance', count: 980, percentage: 8 },
  { category: 'Others', count: 620, percentage: 5 },
];

const workloadData = [
  { week: 'Week 1', documents: 145, reviews: 89, approvals: 67 },
  { week: 'Week 2', documents: 156, reviews: 92, approvals: 74 },
  { week: 'Week 3', documents: 134, reviews: 78, approvals: 56 },
  { week: 'Week 4', documents: 167, reviews: 98, approvals: 81 },
  { week: 'Week 5', documents: 142, reviews: 85, approvals: 69 },
  { week: 'Week 6', documents: 178, reviews: 105, approvals: 88 },
];

const complianceMetrics = [
  { metric: 'Contract Renewals', onTime: 85, delayed: 15, total: 100 },
  { metric: 'Document Reviews', onTime: 78, delayed: 22, total: 100 },
  { metric: 'Compliance Reports', onTime: 92, delayed: 8, total: 100 },
  { metric: 'Safety Audits', onTime: 88, delayed: 12, total: 100 },
];

export function Analytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive insights into document management and contract analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Advanced Filters
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Custom Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Contract Value</p>
                <p className="text-2xl">₹487.6 Cr</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-secondary" />
                  <span className="text-xs text-secondary">+12.5% from last quarter</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Contracts</p>
                <p className="text-2xl">187</p>
                <div className="flex items-center gap-1 mt-1">
                  <FileText className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">23 expiring soon</span>
                </div>
              </div>
              <FileText className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Reviews</p>
                <p className="text-2xl">42</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-accent" />
                  <span className="text-xs text-accent">15 urgent</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-chart-4">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Compliance Score</p>
                <p className="text-2xl">87%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-secondary" />
                  <span className="text-xs text-secondary">+3% this month</span>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contracts">Contract Analytics</TabsTrigger>
          <TabsTrigger value="documents">Document Insights</TabsTrigger>
          <TabsTrigger value="workload">Department Workload</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contract Expiry Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Contract Expiry Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between gap-4 px-4">
                  {contractExpiryData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="flex items-end justify-center h-56 w-full">
                        <div 
                          className="bg-primary/30 border-t-2 border-primary rounded-t-lg w-full flex items-end justify-center pb-2 text-primary text-sm"
                          style={{ height: `${(item.value / 15) * 100}%` }}
                        >
                          ₹{item.value}Cr
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">{item.month}</div>
                      <div className="text-xs text-muted-foreground">{item.expiring} expiring</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Department Spending */}
            <Card>
              <CardHeader>
                <CardTitle>Department-wise Contract Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between gap-2 px-4">
                  {departmentSpendData.map((dept, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="flex items-end justify-center h-56 w-full">
                        <div 
                          className="rounded-t-lg w-full flex items-end justify-center pb-2 text-white text-xs"
                          style={{ 
                            height: `${(dept.value / 130) * 100}%`,
                            backgroundColor: dept.color
                          }}
                        >
                          ₹{dept.value}Cr
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">{dept.department}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Details Table */}
          <Card>
            <CardHeader>
              <CardTitle>Department Contract Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentSpendData.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: dept.color }}
                      />
                      <div>
                        <p className="text-sm">{dept.department}</p>
                        <p className="text-xs text-muted-foreground">
                          {dept.contracts} active contracts
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">₹{dept.value} Cr</p>
                      <p className="text-xs text-muted-foreground">
                        Avg: ₹{(dept.value / dept.contracts).toFixed(1)} Cr
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Document Distribution by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="w-80 h-80 mx-auto relative">
                    <svg width="320" height="320" viewBox="0 0 320 320" className="transform -rotate-90">
                      <circle
                        cx="160"
                        cy="160"
                        r="120"
                        fill="none"
                        stroke="#0B3D91"
                        strokeWidth="30"
                        strokeDasharray="248.2 753.6"
                        strokeDashoffset="0"
                      />
                      <circle
                        cx="160"
                        cy="160"
                        r="120"
                        fill="none"
                        stroke="#0F9D58"
                        strokeWidth="30"
                        strokeDasharray="165.8 753.6"
                        strokeDashoffset="-248.2"
                      />
                      <circle
                        cx="160"
                        cy="160"
                        r="120"
                        fill="none"
                        stroke="#FF9933"
                        strokeWidth="30"
                        strokeDasharray="113.0 753.6"
                        strokeDashoffset="-414"
                      />
                      <circle
                        cx="160"
                        cy="160"
                        r="120"
                        fill="none"
                        stroke="#6f42c1"
                        strokeWidth="30"
                        strokeDasharray="128.1 753.6"
                        strokeDashoffset="-527"
                      />
                      <circle
                        cx="160"
                        cy="160"
                        r="120"
                        fill="none"
                        stroke="#20c997"
                        strokeWidth="30"
                        strokeDasharray="60.3 753.6"
                        strokeDashoffset="-655.1"
                      />
                      <circle
                        cx="160"
                        cy="160"
                        r="120"
                        fill="none"
                        stroke="#fd7e14"
                        strokeWidth="30"
                        strokeDasharray="37.7 753.6"
                        strokeDashoffset="-715.4"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl">12,550</div>
                        <div className="text-sm text-muted-foreground">Total Documents</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Category Details */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {documentCategoryData.map((category, index) => {
                  const colors = ['#0B3D91', '#0F9D58', '#FF9933', '#6f42c1', '#20c997', '#fd7e14'];
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: colors[index] }}
                        />
                        <span className="text-sm">{category.category}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{category.count.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{category.percentage}%</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Workload Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Documents Processed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span>Reviews Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span>Approvals Given</span>
                  </div>
                </div>
                
                <div className="h-80 flex items-end justify-between gap-4 px-4">
                  {workloadData.map((week, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="flex items-end justify-center h-64 w-full gap-1">
                        <div 
                          className="bg-primary rounded-t-sm flex-1"
                          style={{ height: `${(week.documents / 200) * 100}%` }}
                        />
                        <div 
                          className="bg-secondary rounded-t-sm flex-1"
                          style={{ height: `${(week.reviews / 200) * 100}%` }}
                        />
                        <div 
                          className="bg-accent rounded-t-sm flex-1"
                          style={{ height: `${(week.approvals / 200) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">{week.week}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Compliance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{metric.metric}</span>
                      <span className="text-sm text-muted-foreground">
                        {metric.onTime}% on time
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-secondary h-2 rounded-full" 
                        style={{ width: `${metric.onTime}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Compliance Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border-l-4 border-l-destructive bg-destructive/5 rounded">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <div>
                      <p className="text-sm">3 contracts require immediate renewal</p>
                      <p className="text-xs text-muted-foreground">Expiring within 7 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border-l-4 border-l-accent bg-accent/5 rounded">
                    <Clock className="w-4 h-4 text-accent" />
                    <div>
                      <p className="text-sm">12 document reviews pending</p>
                      <p className="text-xs text-muted-foreground">Average delay: 3.2 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border-l-4 border-l-secondary bg-secondary/5 rounded">
                    <FileText className="w-4 h-4 text-secondary" />
                    <div>
                      <p className="text-sm">Safety audit reports submitted</p>
                      <p className="text-xs text-muted-foreground">100% compliance this month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}