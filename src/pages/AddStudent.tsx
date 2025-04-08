
import React from 'react';
import StudentForm from '@/components/forms/StudentForm';

const AddStudent: React.FC = () => {
  return (
    <div className="container mx-auto p-4 max-w-4xl fade-in">
      <h1 className="text-2xl font-bold mb-6">Add New Student</h1>
      <StudentForm />
    </div>
  );
};

export default AddStudent;
