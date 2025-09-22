import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  Tag,
  User,
  Building,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Zap,
  Shield,
  Brain,
  FileCheck,
  FileX,
  Star,
  Share2,
  History,
  Settings,
  Scan,
  RefreshCw,
  Lock,
  Globe,
  Camera
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
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

const documents = [
  {
    id: 1,
    title: 'Metro Rail Maintenance Contract',
    category: 'Contract',
    department: 'Engineering',
    uploadDate: '2025-01-15',
    expiryDate: '2025-09-15',
    status: 'Active',
    priority: 'High',
    tags: ['Maintenance', 'Critical', 'Infrastructure'],
    fileSize: '2.4 MB',
    uploadedBy: 'Rajesh Kumar',
    aiScore: 96,
    complianceStatus: 'Compliant',
    version: '2.1',
    lastReview: '2024-12-20',
    reviewedBy: 'Legal Team',
    securityLevel: 'Restricted',
    language: 'English',
    keywords: ['safety', 'maintenance', 'schedule', 'quality'],
    summary: 'Comprehensive maintenance contract for metro rail infrastructure including safety protocols and quality standards.',
    riskLevel: 'Low'
  },
  {
    id: 2,
    title: 'Station Security Services Tender',
    category: 'Tender',
    department: 'Security',
    uploadDate: '2025-02-01',
    expiryDate: '2025-10-01',
    status: 'Under Review',
    priority: 'High',
    tags: ['Security', 'Tender', 'Services'],
    fileSize: '1.8 MB',
    uploadedBy: 'Priya Sharma',
    aiScore: 89,
    complianceStatus: 'Needs Review',
    version: '1.0',
    lastReview: '2025-02-01',
    reviewedBy: 'Procurement Team',
    securityLevel: 'Confidential',
    language: 'English',
    keywords: ['security', 'personnel', 'surveillance', 'access control'],
    summary: 'Tender document for comprehensive security services across all metro stations.',
    riskLevel: 'Medium'
  },
  {
    id: 3,
    title: 'Employee Safety Guidelines v2.1',
    category: 'HR Policy',
    department: 'HR',
    uploadDate: '2025-08-20',
    expiryDate: '2026-08-20',
    status: 'Active',
    priority: 'Medium',
    tags: ['Safety', 'Policy', 'HR'],
    fileSize: '956 KB',
    uploadedBy: 'Anand Kumar',
    aiScore: 94,
    complianceStatus: 'Compliant',
    version: '2.1',
    lastReview: '2025-08-15',
    reviewedBy: 'Safety Committee',
    securityLevel: 'Internal',
    language: 'English',
    keywords: ['employee safety', 'guidelines', 'procedures', 'emergency'],
    summary: 'Updated safety guidelines for all KMRL employees including emergency procedures.',
    riskLevel: 'Low'
  },
  {
    id: 4,
    title: 'Track Inspection Manual',
    category: 'Manual',
    department: 'Operations',
    uploadDate: '2024-12-10',
    expiryDate: '2025-12-10',
    status: 'Expiring Soon',
    priority: 'High',
    tags: ['Manual', 'Operations', 'Inspection'],
    fileSize: '3.2 MB',
    uploadedBy: 'Suresh Nair',
    aiScore: 91,
    complianceStatus: 'Requires Update',
    version: '3.0',
    lastReview: '2024-11-15',
    reviewedBy: 'Technical Team',
    securityLevel: 'Restricted',
    language: 'English',
    keywords: ['track inspection', 'procedures', 'safety checks', 'maintenance'],
    summary: 'Detailed manual for track inspection procedures and safety protocols.',
    riskLevel: 'High'
  }
];

const categories = ['All', 'Contract', 'Tender', 'HR Policy', 'Manual'];
const departments = ['All', 'Engineering', 'Security', 'HR', 'Operations', 'IT'];
const statuses = ['All', 'Active', 'Under Review', 'Expiring Soon', 'Expired'];
const priorities = ['All', 'High', 'Medium', 'Low'];
const securityLevels = ['All', 'Public', 'Internal', 'Confidential', 'Restricted'];

export function EnhancedDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         doc.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesDepartment = selectedDepartment === 'All' || doc.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || doc.priority === selectedPriority;
    
    return matchesSearch && matchesCategory && matchesDepartment && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-secondary text-secondary-foreground"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case 'Under Review':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Under Review</Badge>;
      case 'Expiring Soon':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Expiring Soon</Badge>;
      case 'Expired':
        return <Badge variant="destructive"><FileX className="w-3 h-3 mr-1" />Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive">High</Badge>;
      case 'Medium':
        return <Badge variant="outline">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-secondary text-secondary-foreground">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getComplianceBadge = (compliance: string) => {
    switch (compliance) {
      case 'Compliant':
        return <Badge className="bg-secondary text-secondary-foreground"><Shield className="w-3 h-3 mr-1" />Compliant</Badge>;
      case 'Needs Review':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Needs Review</Badge>;
      case 'Requires Update':
        return <Badge variant="outline"><RefreshCw className="w-3 h-3 mr-1" />Requires Update</Badge>;
      default:
        return <Badge variant="secondary">{compliance}</Badge>;
    }
  };

  const handleFileUpload = (files: FileList) => {
    if (files.length > 0) {
      setShowUpload(true);
      setIsAnalyzing(true);
      
      // Simulate upload and AI analysis
      let progress = 0;
      const interval = setInterval(() => {
        progress += 8;
        setUploadProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            setTimeout(() => {
              setShowUpload(false);
              setUploadProgress(0);
            }, 2000);
          }, 1000);
        }
      }, 150);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-full">
      {/* Header with Enhanced Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl tracking-tight text-foreground">
            Document Intelligence Center
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered document management with advanced compliance monitoring
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm">
            <Scan className="w-4 h-4 mr-2" />
            OCR Scan
          </Button>
          <Button variant="outline" size="sm">
            <Brain className="w-4 h-4 mr-2" />
            AI Insights
          </Button>
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Upload Document
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>
      </div>

      {/* Upload Progress with AI Analysis */}
      {showUpload && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm">Analyzing: Metro Safety Protocol.pdf</span>
              </div>
              <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="mb-3" />
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-secondary" />
                Document uploaded successfully
              </div>
              {uploadProgress > 20 && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-secondary" />
                  OCR text extraction completed
                </div>
              )}
              {uploadProgress > 50 && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-secondary" />
                  Content classification in progress
                </div>
              )}
              {uploadProgress > 80 && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-secondary" />
                  Compliance analysis completed
                </div>
              )}
              {uploadProgress >= 100 && !isAnalyzing && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-secondary" />
                  AI analysis completed - Document ready for review
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents, content, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input-background"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map(priority => (
                  <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl text-primary">{filteredDocuments.length}</div>
              <div className="text-xs text-muted-foreground">Total Documents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-secondary">{filteredDocuments.filter(d => d.status === 'Active').length}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-accent">{filteredDocuments.filter(d => d.status === 'Expiring Soon').length}</div>
              <div className="text-xs text-muted-foreground">Expiring Soon</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-destructive">{filteredDocuments.filter(d => d.complianceStatus === 'Needs Review').length}</div>
              <div className="text-xs text-muted-foreground">Need Review</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drag and Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground mb-2">
          Drag and drop documents here, or click to browse
        </p>
        <p className="text-xs text-muted-foreground">
          Supports PDF, DOC, DOCX, TXT files up to 10MB
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose Files
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Document List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Documents ({filteredDocuments.length})</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>AI Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow 
                      key={doc.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            {doc.securityLevel === 'Restricted' && (
                              <Lock className="w-3 h-3 text-destructive absolute -top-1 -right-1" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm">{doc.title}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{doc.fileSize}</span>
                              <span>•</span>
                              <span>{doc.department}</span>
                              <span>•</span>
                              <span>v{doc.version}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-sm">{doc.aiScore}%</div>
                          <Progress value={doc.aiScore} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getStatusBadge(doc.status)}
                          {getComplianceBadge(doc.complianceStatus)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(doc.priority)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Document Detail Sidebar */}
        <div>
          {selectedDocument ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Document Analysis</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedDocument(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h3 className="text-lg mb-2">{selectedDocument.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        {selectedDocument.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Department:</span>
                        <span>{selectedDocument.department}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Uploaded by:</span>
                        <span>{selectedDocument.uploadedBy}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Upload Date:</span>
                        <span>{new Date(selectedDocument.uploadDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Expiry:</span>
                        <span>{new Date(selectedDocument.expiryDate).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Security Level:</span>
                        <Badge variant="outline">{selectedDocument.securityLevel}</Badge>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Button className="w-full" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Document
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm mb-2 flex items-center gap-2">
                          <Brain className="w-4 h-4 text-primary" />
                          AI Confidence Score
                        </h4>
                        <div className="flex items-center gap-2">
                          <Progress value={selectedDocument.aiScore} className="flex-1" />
                          <span className="text-sm">{selectedDocument.aiScore}%</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm mb-2">Document Summary</h4>
                        <div className="bg-muted/50 rounded-lg p-3 text-sm">
                          {selectedDocument.summary}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm mb-2">Key Insights</h4>
                        <div className="space-y-2">
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                              Risk Level: <strong>{selectedDocument.riskLevel}</strong>
                            </AlertDescription>
                          </Alert>
                          <div className="bg-primary/10 rounded-lg p-3">
                            <p className="text-xs text-primary">
                              ✓ Document contains all required compliance sections
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm mb-2">Keywords</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedDocument.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-2 rounded">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">AK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground">
                            {new Date(selectedDocument.lastReview).toLocaleDateString()}
                          </div>
                          <div className="text-sm">Document reviewed by {selectedDocument.reviewedBy}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-2 rounded">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">RK</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground">
                            {new Date(selectedDocument.uploadDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm">Document uploaded by {selectedDocument.uploadedBy}</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-2">
                  Select a document to view AI analysis
                </p>
                <p className="text-xs text-muted-foreground">
                  Get instant insights, compliance status, and risk assessment
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}