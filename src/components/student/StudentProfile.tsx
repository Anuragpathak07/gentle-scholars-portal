
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, ArrowLeft, FileText, Hospital, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useStudentData, StudentDetail } from '@/hooks/useStudentData';

interface StudentProfileProps {
  studentId: string;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ studentId }) => {
  const navigate = useNavigate();
  const { getStudentById } = useStudentData();
  
  // Fetch student data based on ID
  const student = getStudentById(studentId);
  
  if (!student) {
    return (
      <div className="p-4 bg-destructive/20 rounded-md text-destructive">
        Student not found. The ID may be invalid.
      </div>
    );
  }
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Mild':
        return 'bg-green-100 text-green-800';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Ensure documents exists or provide a default empty array
  const documents = student.documents || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        <Button 
          onClick={() => navigate(`/students/edit/${studentId}`)}
          className="gap-1"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{student.name}</CardTitle>
              <CardDescription>
                Age: {student.age} • Grade: {student.grade}
              </CardDescription>
            </div>
            <Badge variant="outline" className={getLevelColor(student.disabilityLevel)}>
              {student.disabilityLevel} {student.disabilityPercentage && `- ${student.disabilityPercentage}%`}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="medical">Medical Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">{student.address || 'Not provided'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Disability Type</p>
                  <p className="text-sm text-muted-foreground">{student.disabilityType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Emergency Contact</p>
                  <p className="text-sm text-muted-foreground">{student.emergencyContact || 'Not provided'}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Admission Date</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{student.admissionDate || 'Not provided'}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="medical" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Hospital className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Referred Hospital</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{student.referredHospital || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Medical History</p>
                  <div className="bg-secondary p-3 rounded-md">
                    <p className="text-sm">{student.medicalHistory || 'No medical history provided'}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  These documents require proper authorization to download.
                </div>
                {documents.length > 0 ? (
                  <div className="space-y-2">
                    {documents.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Uploaded on {doc.date}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p>No documents available</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
