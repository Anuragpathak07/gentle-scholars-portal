
import { useState, useEffect } from 'react';
import { Student } from '@/components/dashboard/StudentCard';
import { useAuth } from '@/context/AuthContext';
import { getStorageItem, setStorageItem } from '@/utils/storage';

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
  gender?: 'Male' | 'Female' | 'Other';
  residenceType?: 'Permanent' | 'Temporary';
  previousSchool?: string;
  parentGuardianStatus?: 'Both Parents' | 'Single Parent' | 'Guardian' | 'Orphan';
  teacherAssigned?: string;
  otherNotes?: string;
  certificates?: Array<{
    id: string;
    name: string;
    type: string;
    date: string;
    data?: string; // Base64 encoded file data
  }>;
  hasDisabilityIdCard?: boolean;
  disabilityIdCard?: {
    id: string;
    name: string;
    type: string;
    date: string;
    data?: string; // Base64 encoded file data
  };
  // Sensitive info (admin only)
  wasAbused?: boolean;
  isSafeAtHome?: boolean;
  isFamilySupportive?: boolean;
  hasPTSD?: boolean;
  hasSelfHarmHistory?: boolean;
  documents?: Array<{
    id: string;
    name: string;
    type: string;
    date: string;
    data?: string; // Base64 encoded file data
  }>;
}

export function useStudentData() {
  const [students, setStudents] = useState<StudentDetail[]>([]);
  const { user } = useAuth();
  
  // Load students from localStorage on mount or when user changes
  useEffect(() => {
    if (!user) return;
    
    const storedStudents = getStorageItem<StudentDetail[]>('students', user.id, MOCK_STUDENTS);
    setStudents(storedStudents);
  }, [user]);

  // Save students to localStorage whenever they change
  useEffect(() => {
    if (!user || students.length === 0) return;
    
    setStorageItem('students', user.id, students);
  }, [students, user]);

  // Get a student by ID
  const getStudentById = (id: string): StudentDetail | undefined => {
    return students.find(student => student.id === id);
  };

  // Add a new student
  const addStudent = (studentData: Omit<StudentDetail, 'id'>) => {
    if (!user) return null;
    
    console.log('Adding student:', studentData);
    const newStudent = {
      ...studentData,
      id: Date.now().toString(), // Generate a unique ID
    };
    
    setStudents(prevStudents => {
      const updatedStudents = [...prevStudents, newStudent];
      setStorageItem('students', user.id, updatedStudents);
      return updatedStudents;
    });
    
    return newStudent;
  };

  // Update an existing student
  const updateStudent = (id: string, studentData: Partial<StudentDetail>) => {
    if (!user) return;
    
    console.log('Updating student:', id, studentData);
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.map(student => 
        student.id === id ? { ...student, ...studentData } : student
      );
      setStorageItem('students', user.id, updatedStudents);
      return updatedStudents;
    });
  };

  // Delete a student
  const deleteStudent = (id: string) => {
    if (!user) return;
    
    console.log('Deleting student:', id);
    setStudents(prevStudents => {
      const updatedStudents = prevStudents.filter(student => student.id !== id);
      setStorageItem('students', user.id, updatedStudents);
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
