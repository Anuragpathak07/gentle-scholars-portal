
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '@/components/forms/StudentForm';
import { useStudentData } from '@/hooks/useStudentData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStudentById } = useStudentData();
  
  const student = getStudentById(id || '');
  
  if (!student) {
    // If student not found, show error and redirect after a delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
    
    return (
      <div className="container mx-auto p-4 max-w-4xl fade-in">
        <div className="bg-destructive/20 p-4 rounded-md text-destructive">
          Student not found. The ID may be invalid. Redirecting to dashboard...
        </div>
      </div>
    );
  }

  const handleStudentSaved = () => {
    // After saving, navigate to the student details page
    navigate(`/students/${id}`);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl fade-in">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>
      <StudentForm 
        initialData={student} 
        isEditing={true} 
        onSaved={handleStudentSaved}
      />
    </div>
  );
};

export default EditStudent;
