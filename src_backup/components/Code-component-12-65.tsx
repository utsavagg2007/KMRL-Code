import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Upload,
  Search,
  Filter,
  FileText,
  Brain,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download,
  Eye,
  Share,
  Tag,
  Calendar,
  User,
  Database,
  Zap,
  TrendingUp,
  FileCheck,
  Scan,
  PieChart,
  BarChart3,
  Activity,
  Star,
  Bookmark,
  MoreHorizontal,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'tender' | 'hr-policy' | 'manual' | 'financial' | 'legal';
  size: string;
  uploadDate: string;
  status: 'processing' | 'analyzed' | 'pending' | 'verified' | 'review';
  aiConfidence: number;
  tags: string[];
  department: string;
  uploader: string;
  complianceScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  version: string;
  lastModified: string;
  fileType: string;
}

const mockDocuments: Document[] = [
  {
    id: 'TD-2025-001',
    name: 'Metro Line Extension Tender Documentation Package',
    type: 'tender',
    size: '24.5 MB',
    uploadDate: '2025-01-10T14:30:00Z',
    status: 'analyzed',
    aiConfidence: 98.7,
    tags: ['infrastructure', 'expansion', 'public-transport', 'phase-2'],
    department: 'Infrastructure Development',
    uploader: 'Rajesh Kumar (Senior Manager)',
    complianceScore: 99.2,
    riskLevel: 'low',
    priority: 'high',
    version: 'v2.1',
    lastModified: '2025-01-10T14:25:00Z',
    fileType: 'PDF'
  },
  {
    id: 'CX-891-2025',
    name: 'Station Maintenance Service Contract Agreement',
    type: 'contract',
    size: '15.3 MB',
    uploadDate: '2025-01-09T16:45:00Z',
    status: 'verified',
    aiConfidence: 97.4,
    tags: ['maintenance', 'service', 'operations', 'annual'],
    department: 'Operations & Maintenance',
    uploader: 'Priya Nair (Operations Manager)',
    complianceScore: 98.8,
    riskLevel: 'low',
    priority: 'normal',
    version: 'v1.0',
    lastModified: '2025-01-09T16:40:00Z',
    fileType: 'PDF'
  },
  {
    id: 'HR-POL-2025-003',
    name: 'Employee Safety Guidelines & Protocols v2.3',
    type: 'hr-policy',
    size: '3.2 MB',
    uploadDate: '2025-01-08T11:20:00Z',
    status: 'review',
    aiConfidence: 94.1,
    tags: ['safety', 'guidelines', 'employee-welfare', 'protocols'],
    department: 'Human Resources',
    uploader: 'Arjun Menon (HR Specialist)',
    complianceScore: 97.5,
    riskLevel: 'medium',
    priority: 'high',
    version: 'v2.3',
    lastModified: '2025-01-08T11:15:00Z',
    fileType: 'DOCX'
  },
  {
    id: 'TM-SYS-2025-012',
    name: 'Advanced Signal System Technical Manual',
    type: 'manual',
    size: '45.7 MB',
    uploadDate: '2025-01-07T09:30:00Z',
    status: 'analyzed',
    aiConfidence: 99.1,
    tags: ['technical', 'signals', 'system-manual', 'operations'],
    department: 'Technical Services',
    uploader: 'Lakshmi Pillai (Technical Lead)',
    complianceScore: 99.3,
    riskLevel: 'low',
    priority: 'normal',
    version: 'v4.2',
    lastModified: '2025-01-07T09:25:00Z',
    fileType: 'PDF'
  },
  {
    id: 'FIN-REP-2024-Q4',
    name: 'Q4 2024 Financial Performance & Analysis Report',
    type: 'financial',
    size: '8.9 MB',
    uploadDate: '2025-01-06T15:00:00Z',
    status: 'verified',
    aiConfidence: 96.8,
    tags: ['quarterly', 'financial', 'performance', 'analysis'],
    department: 'Finance & Accounts',
    uploader: 'Suresh Varma (Finance Manager)',
    complianceScore: 98.1,
    riskLevel: 'low',
    priority: 'urgent',
    version: 'v1.0',
    lastModified: '2025-01-06T14:55:00Z',
    fileType: 'XLSX'
  },
  {
    id: 'LEG-001-2025',
    name: 'Legal Compliance Framework & Guidelines',
    type: 'legal',
    size: '12.4 MB',
    uploadDate: '2025-01-05T13:20:00Z',
    status: 'processing',
    aiConfidence: 95.3,
    tags: ['legal', 'compliance', 'framework', 'guidelines'],
    department: 'Legal Affairs',
    uploader: 'Meera Das (Legal Advisor)',
    complianceScore: 97.8,
    riskLevel: 'medium',
    priority: 'high',
    version: 'v1.1',
    lastModified: '2025-01-05T13:15:00Z',
    fileType: 'PDF'
  }
];

export function PerfectDocuments() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<'table' | 'grid'>('table');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         doc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || doc.department === selectedDepartment;
    return matchesSearch && matchesType && matchesStatus && matchesDepartment;
  });

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate realistic upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsUploadDialogOpen(false);
          toast.success(`Successfully uploaded ${files.length} document(s). AI analysis has started.`);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 300);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'processing': { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-800', icon: RefreshCw },
      'analyzed': { variant: 'secondary' as const, className: 'bg-green-100 text-green-800', icon: CheckCircle },
      'verified': { variant: 'secondary' as const, className: 'bg-emerald-100 text-emerald-800', icon: Shield },
      'review': { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800', icon: Eye },
      'pending': { variant: 'outline' as const, className: '', icon: Clock }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRiskBadge = (riskLevel: string) => {
    const riskConfig = {
      'critical': { className: 'bg-red-600 hover:bg-red-700 text-white', icon: AlertTriangle },
      'high': { className: 'bg-orange-500 hover:bg-orange-600 text-white', icon: AlertTriangle },
      'medium': { className: 'bg-yellow-500 hover:bg-yellow-600 text-white', icon: AlertTriangle },
      'low': { className: 'bg-green-500 hover:bg-green-600 text-white', icon: CheckCircle }
    };

    const config = riskConfig[riskLevel as keyof typeof riskConfig];
    const IconComponent = config.icon;

    return (
      <Badge className={config.className}>
        <IconComponent className="w-3 h-3 mr-1" />
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      'urgent': { className: 'bg-red-100 text-red-800 border-red-200' },
      'high': { className: 'bg-orange-100 text-orange-800 border-orange-200' },
      'normal': { className: 'bg-blue-100 text-blue-800 border-blue-200' },
      'low': { className: 'bg-gray-100 text-gray-800 border-gray-200' }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];

    return (
      <Badge variant="outline" className={config.className}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      'contract': { icon: FileCheck, color: 'text-primary' },
      'tender': { icon: FileText, color: 'text-secondary' },
      'hr-policy': { icon: User, color: 'text-accent' },
      'manual': { icon: Database, color: 'text-purple-600' },
      'financial': { icon: PieChart, color: 'text-green-600' },
      'legal': { icon: Shield, color: 'text-indigo-600' }
    };

    const config = typeIcons[type as keyof typeof typeIcons];
    const IconComponent = config.icon;

    return <IconComponent className={`w-4 h-4 ${config.color}`} />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const documentStats = {
    total: documents.length,
    processed: documents.filter(d => d.status === 'analyzed' || d.status === 'verified').length,
    processing: documents.filter(d => d.status === 'processing').length,
    pending: documents.filter(d => d.status === 'pending' || d.status === 'review').length,
    avgConfidence: Math.round(documents.reduce((acc, doc) => acc + doc.aiConfidence, 0) / documents.length * 10) / 10,
    avgCompliance: Math.round(documents.reduce((acc, doc) => acc + doc.complianceScore, 0) / documents.length * 10) / 10,
    totalSize: '156.8 MB',
    todayUploads: 3
  };

  const departments = [...new Set(documents.map(doc => doc.department))];
  const documentTypes = [...new Set(documents.map(doc => doc.type))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="p-6 space-y-6">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 rounded-xl p-6 text-primary-foreground shadow-2xl border border-primary/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-foreground/10 rounded-lg">
                  <Database className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Document Intelligence Center</h1>
                  <p className="text-primary-foreground/90 text-sm">
                    AI-powered document management and analysis platform
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-500/10 text-green-100 border-green-500/20">
                <Brain className="w-3 h-3 mr-1" />
                AI Processing Active
              </Badge>
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Documents
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Upload New Documents</DialogTitle>
                    <DialogDescription>
                      Upload documents for AI analysis and intelligent processing. Supported formats: PDF, DOC, DOCX, XLS, XLSX, TXT
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div 
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                      />
                      <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, DOC, DOCX, XLS, XLSX, TXT up to 50MB each
                      </p>
                    </div>
                    
                    {isUploading && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Uploading documents...</span>
                          <span className="text-muted-foreground">{Math.round(uploadProgress)}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          AI analysis will begin automatically after upload completion
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map(dept => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Priority</SelectItem>
                            <SelectItem value="normal">Normal Priority</SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                            <SelectItem value="urgent">Urgent Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input placeholder="e.g., contract, maintenance, operations" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (optional)</Label>
                      <Textarea placeholder="Brief description of the document contents..." rows={3} />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-bold text-primary">{documentStats.total}</p>
                  <p className="text-xs text-green-600 mt-1">+{documentStats.todayUploads} today</p>
                </div>
                <FileText className="w-8 h-8 text-primary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">AI Processed</p>
                  <p className="text-2xl font-bold text-secondary">{documentStats.processed}</p>
                  <Progress value={(documentStats.processed / documentStats.total) * 100} className="mt-2 h-1" />
                </div>
                <Brain className="w-8 h-8 text-secondary/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold text-yellow-600">{documentStats.processing}</p>
                  <p className="text-xs text-muted-foreground mt-1">In queue</p>
                </div>
                <RefreshCw className="w-8 h-8 text-yellow-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-accent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">AI Confidence</p>
                  <p className="text-2xl font-bold text-accent">{documentStats.avgConfidence}%</p>
                  <p className="text-xs text-green-600 mt-1">Excellent</p>
                </div>
                <Zap className="w-8 h-8 text-accent/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compliance</p>
                  <p className="text-2xl font-bold text-green-600">{documentStats.avgCompliance}%</p>
                  <p className="text-xs text-green-600 mt-1">High standard</p>
                </div>
                <Shield className="w-8 h-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Storage Used</p>
                  <p className="text-2xl font-bold text-purple-600">{documentStats.totalSize}</p>
                  <p className="text-xs text-muted-foreground mt-1">of 10 GB</p>
                </div>
                <Database className="w-8 h-8 text-purple-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search documents, tags, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="analyzed">Analyzed</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="review">Under Review</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button
                  variant={selectedView === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedView('table')}
                  className="flex-1"
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Table
                </Button>
                <Button
                  variant={selectedView === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedView('grid')}
                  className="flex-1"
                >
                  <PieChart className="w-4 h-4 mr-1" />
                  Grid
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Display */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-primary" />
                  <span>Document Repository</span>
                </CardTitle>
                <CardDescription>
                  {filteredDocuments.length} of {documents.length} documents • Last updated: {new Date().toLocaleTimeString()}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export List
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedView === 'table' ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold">Document</TableHead>
                      <TableHead className="font-semibold">Type</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">AI Analysis</TableHead>
                      <TableHead className="font-semibold">Compliance</TableHead>
                      <TableHead className="font-semibold">Risk Level</TableHead>
                      <TableHead className="font-semibold">Priority</TableHead>
                      <TableHead className="font-semibold">Modified</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDocuments.map((doc) => (
                      <TableRow key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="max-w-xs">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(doc.type)}
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm leading-tight truncate">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {doc.id}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <span>{formatFileSize(doc.size)}</span>
                              <Separator orientation="vertical" className="h-3" />
                              <span>{doc.fileType}</span>
                              <Separator orientation="vertical" className="h-3" />
                              <span>v{doc.version}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {doc.tags.slice(0, 2).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                  {tag}
                                </Badge>
                              ))}
                              {doc.tags.length > 2 && (
                                <Badge variant="outline" className="text-xs px-1 py-0">
                                  +{doc.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {doc.type.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{doc.aiConfidence}%</span>
                              <Brain className="w-3 h-3 text-secondary" />
                            </div>
                            <Progress value={doc.aiConfidence} className="w-16 h-1" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{doc.complianceScore}%</span>
                              <Shield className="w-3 h-3 text-green-600" />
                            </div>
                            <Progress value={doc.complianceScore} className="w-16 h-1" />
                          </div>
                        </TableCell>
                        <TableCell>{getRiskBadge(doc.riskLevel)}</TableCell>
                        <TableCell>{getPriorityBadge(doc.priority)}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="font-medium">{formatDate(doc.lastModified)}</p>
                            <p className="text-xs text-muted-foreground">{doc.uploader.split(' (')[0]}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Share className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="shadow-md hover:shadow-lg transition-shadow border border-muted">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(doc.type)}
                          <Badge variant="outline" className="text-xs">
                            {doc.type.replace('-', ' ')}
                          </Badge>
                        </div>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm leading-tight line-clamp-2">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground">ID: {doc.id}</p>
                      </div>

                      <div className="space-y-2">
                        {getStatusBadge(doc.status)}
                        {getPriorityBadge(doc.priority)}
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>AI Confidence</span>
                          <span className="font-medium">{doc.aiConfidence}%</span>
                        </div>
                        <Progress value={doc.aiConfidence} className="h-1" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Compliance</span>
                          <span className="font-medium">{doc.complianceScore}%</span>
                        </div>
                        <Progress value={doc.complianceScore} className="h-1" />
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatFileSize(doc.size)}</span>
                        <span>{formatDate(doc.lastModified)}</span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                          <Share className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Processing Status */}
        <Card className="shadow-lg border-l-4 border-l-secondary bg-gradient-to-r from-secondary/5 via-background to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-secondary/10 rounded-full">
                  <Brain className="w-5 h-5 text-secondary animate-pulse" />
                </div>
                <div>
                  <p className="font-medium">AI Document Processing Engine</p>
                  <p className="text-sm text-muted-foreground">
                    Queue: {documentStats.processing} documents • Average processing: 2.3 min • Success rate: 98.7%
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20">
                  <Activity className="w-3 h-3 mr-1" />
                  PROCESSING
                </Badge>
                <Button variant="outline" size="sm">
                  <Scan className="w-4 h-4 mr-2" />
                  Scan New Documents
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}