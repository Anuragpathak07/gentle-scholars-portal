
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type Student = {
  id: string;
  name: string;
  age: number;
  grade: string;
  disabilityType: string;
  disabilityLevel: 'Mild' | 'Moderate' | 'Severe';
};

interface StudentCardProps {
  student: Student;
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
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
    <Card className="hover-scale overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{student.name}</h3>
            <p className="text-muted-foreground text-sm">Age: {student.age} • Grade: {student.grade}</p>
          </div>
          <Badge variant="outline" className={getLevelColor(student.disabilityLevel)}>
            {student.disabilityLevel}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Disability:</span> {student.disabilityType}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between bg-secondary/50 p-3">
        <Link to={`/students/${student.id}`}>
          <Button variant="ghost" size="sm" className="text-xs">
            <Eye className="h-3.5 w-3.5 mr-1" />
            View
          </Button>
        </Link>
        <Link to={`/students/edit/${student.id}`}>
          <Button variant="ghost" size="sm" className="text-xs">
            <Edit className="h-3.5 w-3.5 mr-1" />
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
