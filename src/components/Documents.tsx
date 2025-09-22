import React, { useState } from 'react';
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
  X
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

const documents = [
  {
    id: 1,
    title: 'Metro Rail Maintenance Contract',
    category: 'Contract',
    department: 'Engineering',
    uploadDate: '2025-01-15',
    expiryDate: '2025-09-15',
    status: 'Active',
    tags: ['Maintenance', 'Critical'],
    fileSize: '2.4 MB',
    uploadedBy: 'Rajesh Kumar'
  },
  {
    id: 2,
    title: 'Station Security Services Tender',
    category: 'Tender',
    department: 'Security',
    uploadDate: '2025-02-01',
    expiryDate: '2025-10-01',
    status: 'Under Review',
    tags: ['Security', 'Tender'],
    fileSize: '1.8 MB',
    uploadedBy: 'Priya Sharma'
  },
  {
    id: 3,
    title: 'Employee Safety Guidelines v2.1',
    category: 'HR Policy',
    department: 'HR',
    uploadDate: '2025-08-20',
    expiryDate: '2026-08-20',
    status: 'Active',
    tags: ['Safety', 'Policy'],
    fileSize: '956 KB',
    uploadedBy: 'Anand Kumar'
  },
  {
    id: 4,
    title: 'Track Inspection Manual',
    category: 'Manual',
    department: 'Operations',
    uploadDate: '2024-12-10',
    expiryDate: '2025-12-10',
    status: 'Expiring Soon',
    tags: ['Manual', 'Operations'],
    fileSize: '3.2 MB',
    uploadedBy: 'Suresh Nair'
  },
  {
    id: 5,
    title: 'Passenger Information System Contract',
    category: 'Contract',
    department: 'IT',
    uploadDate: '2025-03-01',
    expiryDate: '2027-03-01',
    status: 'Active',
    tags: ['IT', 'Passenger Services'],
    fileSize: '1.5 MB',
    uploadedBy: 'Meera Menon'
  }
];

const categories = ['All', 'Contract', 'Tender', 'HR Policy', 'Manual'];
const departments = ['All', 'Engineering', 'Security', 'HR', 'Operations', 'IT'];
const statuses = ['All', 'Active', 'Under Review', 'Expiring Soon', 'Expired'];

export function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesDepartment = selectedDepartment === 'All' || doc.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'All' || doc.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesDepartment && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-secondary text-secondary-foreground">Active</Badge>;
      case 'Under Review':
        return <Badge variant="outline">Under Review</Badge>;
      case 'Expiring Soon':
        return <Badge variant="destructive">Expiring Soon</Badge>;
      case 'Expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleUpload = () => {
    setShowUpload(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowUpload(false);
          setUploadProgress(0);
        }, 1000);
      }
    }, 200);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Document Management</h1>
          <p className="text-muted-foreground">
            Manage and analyze your organization's documents with AI assistance
          </p>
        </div>
        <Button onClick={handleUpload} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Upload Progress */}
      {showUpload && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Uploading Metro Safety Protocol.pdf</span>
              <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="mb-2" />
            <p className="text-xs text-muted-foreground">
              AI is analyzing document content and extracting key information...
            </p>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents, tags, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
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
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Documents ({filteredDocuments.length})</span>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
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
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.fileSize} • {doc.department}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="w-3 h-3" />
                          {new Date(doc.expiryDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(doc.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
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

        {/* Document Detail Sidebar */}
        <div>
          {selectedDocument ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Document Details</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedDocument(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm mb-2">AI Summary</h4>
                  <div className="bg-muted/50 rounded-lg p-3 text-sm">
                    <p className="mb-2">
                      <strong>Key Points:</strong> This {selectedDocument.category.toLowerCase()} contains 
                      important {selectedDocument.tags.join(', ').toLowerCase()} information for the {selectedDocument.department} department.
                    </p>
                    <p>
                      <strong>Important Dates:</strong> Review required 30 days before expiry date.
                      Renewal process should begin 60 days in advance.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Document
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Select a document to view details and AI analysis
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}