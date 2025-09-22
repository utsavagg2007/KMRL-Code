import React, { useState, useCallback } from 'react';
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
  PieChart
} from 'lucide-react';
import { toast } from 'sonner'';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'tender' | 'hr-policy' | 'manual' | 'financial';
  size: string;
  uploadDate: string;
  status: 'processing' | 'analyzed' | 'pending' | 'verified';
  aiConfidence: number;
  tags: string[];
  department: string;
  uploader: string;
  complianceScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const mockDocuments: Document[] = [
  {
    id: 'TD-2025-001',
    name: 'Metro Line Extension Tender Documentation',
    type: 'tender',
    size: '24.5 MB',
    uploadDate: '2025-01-10',
    status: 'analyzed',
    aiConfidence: 98.7,
    tags: ['infrastructure', 'expansion', 'public-transport'],
    department: 'Infrastructure',
    uploader: 'Rajesh Kumar',
    complianceScore: 99.2,
    riskLevel: 'low'
  },
  {
    id: 'CX-891-2025',
    name: 'Station Maintenance Service Contract',
    type: 'contract',
    size: '15.3 MB',
    uploadDate: '2025-01-09',
    status: 'verified',
    aiConfidence: 97.4,
    tags: ['maintenance', 'service', 'operations'],
    department: 'Operations',
    uploader: 'Priya Nair',
    complianceScore: 98.8,
    riskLevel: 'low'
  },
  {
    id: 'HR-POL-2025-003',
    name: 'Employee Safety Guidelines v2.3',
    type: 'hr-policy',
    size: '3.2 MB',
    uploadDate: '2025-01-08',
    status: 'processing',
    aiConfidence: 94.1,
    tags: ['safety', 'guidelines', 'employee-welfare'],
    department: 'Human Resources',
    uploader: 'Arjun Menon',
    complianceScore: 97.5,
    riskLevel: 'medium'
  },
  {
    id: 'TM-SYS-2025-012',
    name: 'Signal System Technical Manual',
    type: 'manual',
    size: '45.7 MB',
    uploadDate: '2025-01-07',
    status: 'analyzed',
    aiConfidence: 99.1,
    tags: ['technical', 'signals', 'system-manual'],
    department: 'Technical',
    uploader: 'Lakshmi Pillai',
    complianceScore: 99.3,
    riskLevel: 'low'
  },
  {
    id: 'FIN-REP-2024-Q4',
    name: 'Q4 Financial Performance Report',
    type: 'financial',
    size: '8.9 MB',
    uploadDate: '2025-01-06',
    status: 'verified',
    aiConfidence: 96.8,
    tags: ['quarterly', 'financial', 'performance'],
    department: 'Finance',
    uploader: 'Suresh Varma',
    complianceScore: 98.1,
    riskLevel: 'low'
  }
];

export function WorldClassDocuments() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast.success('Document uploaded successfully! AI analysis started.');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'analyzed':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Analyzed</Badge>;
      case 'verified':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>;
      default:
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Low Risk</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <FileCheck className="w-4 h-4 text-primary" />;
      case 'tender':
        return <FileText className="w-4 h-4 text-secondary" />;
      case 'hr-policy':
        return <User className="w-4 h-4 text-accent" />;
      case 'manual':
        return <Database className="w-4 h-4 text-purple-600" />;
      case 'financial':
        return <PieChart className="w-4 h-4 text-green-600" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const documentStats = {
    total: documents.length,
    processed: documents.filter(d => d.status === 'analyzed' || d.status === 'verified').length,
    processing: documents.filter(d => d.status === 'processing').length,
    avgConfidence: documents.reduce((acc, doc) => acc + doc.aiConfidence, 0) / documents.length,
    avgCompliance: documents.reduce((acc, doc) => acc + doc.complianceScore, 0) / documents.length
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Document Intelligence Center
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered document management and analysis platform
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Documents</DialogTitle>
                <DialogDescription>
                  Upload documents for AI analysis and intelligence extraction
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, DOCX, TXT up to 50MB
                    </p>
                  </label>
                </div>
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-lg border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold text-primary">{documentStats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Processed</p>
                <p className="text-2xl font-bold text-secondary">{documentStats.processed}</p>
              </div>
              <Brain className="w-8 h-8 text-secondary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-yellow-600">{documentStats.processing}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Confidence</p>
                <p className="text-2xl font-bold text-accent">{documentStats.avgConfidence.toFixed(1)}%</p>
              </div>
              <Zap className="w-8 h-8 text-accent/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance</p>
                <p className="text-2xl font-bold text-green-600">{documentStats.avgCompliance.toFixed(1)}%</p>
              </div>
              <Shield className="w-8 h-8 text-green-500/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
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
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Document Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="contract">Contracts</SelectItem>
                  <SelectItem value="tender">Tenders</SelectItem>
                  <SelectItem value="hr-policy">HR Policies</SelectItem>
                  <SelectItem value="manual">Manuals</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="analyzed">Analyzed</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-primary" />
            <span>Document Repository</span>
          </CardTitle>
          <CardDescription>
            {filteredDocuments.length} documents found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI Confidence</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(doc.type)}
                          <p className="font-medium">{doc.name}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{doc.size}</span>
                          <Separator orientation="vertical" className="h-3" />
                          <span>{doc.uploader}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
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
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{doc.aiConfidence}%</span>
                        <Progress value={doc.aiConfidence} className="w-16 h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{doc.complianceScore}%</span>
                        <Progress value={doc.complianceScore} className="w-16 h-2" />
                      </div>
                    </TableCell>
                    <TableCell>{getRiskBadge(doc.riskLevel)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* AI Processing Status */}
      <Card className="shadow-lg border-secondary/20 bg-gradient-to-r from-secondary/5 to-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-secondary animate-pulse" />
              <div>
                <p className="font-medium">AI Document Analysis Engine</p>
                <p className="text-sm text-muted-foreground">
                  Processing queue: {documentStats.processing} documents • Average processing time: 2.3 minutes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                <Zap className="w-3 h-3 mr-1" />
                ACTIVE
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
  );
}