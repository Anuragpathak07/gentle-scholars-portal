
import { useState, useEffect } from 'react';
import { Student } from '@/components/dashboard/StudentCard';

// Mock data for initial load if no data in localStorage
const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    age: 12,
    grade: '6th Grade',
    disabilityType: 'Autism Spectrum Disorder',
    disabilityLevel: 'Moderate',
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 10,
    grade: '4th Grade',
    disabilityType: 'Down Syndrome',
    disabilityLevel: 'Mild',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    age: 14,
    grade: '8th Grade',
    disabilityType: 'ADHD',
    disabilityLevel: 'Mild',
  },
  {
    id: '4',
    name: 'Emily Williams',
    age: 11,
    grade: '5th Grade',
    disabilityType: 'Intellectual Disability',
    disabilityLevel: 'Severe',
  },
  {
    id: '5',
    name: 'David Brown',
    age: 13,
    grade: '7th Grade',
    disabilityType: 'Learning Disability',
    disabilityLevel: 'Moderate',
  },
  {
    id: '6',
    name: 'Sarah Davis',
    age: 9,
    grade: '3rd Grade',
    disabilityType: 'Cerebral Palsy',
    disabilityLevel: 'Moderate',
  }
];

// Extended student type
export interface StudentDetail extends Student {
  address?: string;
  disabilityPercentage?: number;
  medicalHistory?: string;
  referredHospital?: string;
  emergencyContact?: string;
  admissionDate?: string;
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    date: string;
  }>;
}

export function useStudentData() {
  const [students, setStudents] = useState<StudentDetail[]>([]);
  
  // Load students from localStorage on mount
  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      try {
        setStudents(JSON.parse(storedStudents));
      } catch (error) {
        console.error('Error parsing stored students:', error);
        setStudents(MOCK_STUDENTS);
        localStorage.setItem('students', JSON.stringify(MOCK_STUDENTS));
      }
    } else {
      // Initialize with mock data if nothing in localStorage
      setStudents(MOCK_STUDENTS);
      localStorage.setItem('students', JSON.stringify(MOCK_STUDENTS));
    }
  }, []);

  // Save students to localStorage whenever they change
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students]);

  // Get a student by ID
  const getStudentById = (id: string): StudentDetail | undefined => {
    return students.find(student => student.id === id);
  };

  // Add a new student
  const addStudent = (studentData: Omit<StudentDetail, 'id'>) => {
    console.log('Adding student:', studentData);
    const newStudent = {
      ...studentData,
      id: Date.now().toString(), // Generate a unique ID
    };
    
    setStudents(prevStudents => {
      const updatedStudents = [...prevStudents, newStudent];
      // Explicitly save to localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
    
    return newStudent;
  };

  // Update an existing student
  const updateStudent = (id: string, studentData: Partial<StudentDetail>) => {
    console.log('Updating student:', id, studentData);
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.map(student => 
        student.id === id ? { ...student, ...studentData } : student
      );
      // Explicitly save to localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
  };

  // Delete a student
  const deleteStudent = (id: string) => {
    console.log('Deleting student:', id);
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.filter(student => student.id !== id);
      // Explicitly save to localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      return updatedStudents;
    });
  };

  return {
    students,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
  };
}
