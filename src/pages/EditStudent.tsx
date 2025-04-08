
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from '@/components/forms/StudentForm';
import { useStudentData } from '@/hooks/useStudentData';

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

  return (
    <div className="container mx-auto p-4 max-w-4xl fade-in">
      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>
      <StudentForm initialData={student} isEditing={true} />
    </div>
  );
};

export default EditStudent;
