
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, ArrowLeft, FileText, Hospital, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Student } from '@/components/dashboard/StudentCard';

// Extended mock data for a full student profile
interface StudentDetail extends Student {
  address: string;
  disabilityPercentage: number;
  medicalHistory: string;
  referredHospital: string;
  emergencyContact: string;
  admissionDate: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    date: string;
  }>;
}

// Mock data for student detail
const MOCK_STUDENT: StudentDetail = {
  id: '1',
  name: 'John Doe',
  age: 12,
  grade: '6th Grade',
  address: '123 Main St, Anytown, CA 12345',
  disabilityType: 'Autism Spectrum Disorder',
  disabilityLevel: 'Moderate',
  disabilityPercentage: 45,
  medicalHistory: 'Diagnosed with ASD at age 4. Regular therapy sessions twice a week. No major medical complications.',
  referredHospital: 'City Children\'s Hospital',
  emergencyContact: 'Mary Doe (Mother) - (555) 123-4567',
  admissionDate: '2022-09-01',
  documents: [
    {
      id: 'd1',
      name: 'Medical Assessment Report',
      type: 'PDF',
      date: '2022-05-15'
    },
    {
      id: 'd2',
      name: 'IEP Documentation',
      type: 'PDF',
      date: '2022-08-20'
    },
    {
      id: 'd3',
      name: 'Progress Report - Q1',
      type: 'PDF',
      date: '2022-11-10'
    }
  ]
};

interface StudentProfileProps {
  studentId: string;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ studentId }) => {
  const navigate = useNavigate();
  // In a real app, you'd fetch student data based on the ID
  // For now, we'll use our mock data
  const student = MOCK_STUDENT;
  
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
              {student.disabilityLevel} - {student.disabilityPercentage}%
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
                  <p className="text-sm text-muted-foreground">{student.address}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Disability Type</p>
                  <p className="text-sm text-muted-foreground">{student.disabilityType}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Emergency Contact</p>
                  <p className="text-sm text-muted-foreground">{student.emergencyContact}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Admission Date</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{student.admissionDate}</p>
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
                  <p className="text-sm text-muted-foreground">{student.referredHospital}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Medical History</p>
                  <div className="bg-secondary p-3 rounded-md">
                    <p className="text-sm">{student.medicalHistory}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  These documents require proper authorization to download.
                </div>
                <div className="space-y-2">
                  {student.documents.map(doc => (
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
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
