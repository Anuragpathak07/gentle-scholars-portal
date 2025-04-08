import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useStudentData, StudentDetail } from '@/hooks/useStudentData';

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.coerce.number().int().min(5).max(22),
  grade: z.string().min(1, 'Grade is required'),
  disabilityType: z.string().min(1, 'Disability type is required'),
  disabilityLevel: z.enum(['Mild', 'Moderate', 'Severe']),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  disabilityPercentage: z.coerce.number().min(0).max(100),
  medicalHistory: z.string().optional(),
  referredHospital: z.string().optional(),
  emergencyContact: z.string().optional(),
  admissionDate: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface StudentFormProps {
  initialData?: Partial<StudentDetail>;
  isEditing?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  initialData = {},
  isEditing = false,
}) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addStudent, updateStudent } = useStudentData();

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: initialData.name || '',
      age: initialData.age || undefined,
      grade: initialData.grade || '',
      address: initialData.address || '',
      disabilityType: initialData.disabilityType || '',
      disabilityLevel: initialData.disabilityLevel || 'Mild',
      disabilityPercentage: initialData.disabilityPercentage || undefined,
      medicalHistory: initialData.medicalHistory || '',
      referredHospital: initialData.referredHospital || '',
      emergencyContact: initialData.emergencyContact || '',
      admissionDate: initialData.admissionDate || '',
    },
  });

  const onSubmit = async (data: StudentFormData) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (isEditing && id) {
        updateStudent(id, data);
        toast.success('Student updated successfully!');
      } else {
        const newStudentData: Omit<StudentDetail, 'id'> = {
          name: data.name,
          age: data.age,
          grade: data.grade,
          disabilityType: data.disabilityType,
          disabilityLevel: data.disabilityLevel,
          address: data.address,
          disabilityPercentage: data.disabilityPercentage,
          medicalHistory: data.medicalHistory,
          referredHospital: data.referredHospital,
          emergencyContact: data.emergencyContact,
          admissionDate: data.admissionDate,
        };
        
        addStudent(newStudentData);
        toast.success('Student added successfully!');
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter student name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade/Class</FormLabel>
                <FormControl>
                  <Input placeholder="Enter grade or class" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="disabilityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disability Type</FormLabel>
                <FormControl>
                  <Input placeholder="Type of disability" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="disabilityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disability Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Mild">Mild</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Severe">Severe</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="disabilityPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disability Percentage</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Percentage (0-100)" 
                    min="0" 
                    max="100" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="referredHospital"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Referred Hospital</FormLabel>
                <FormControl>
                  <Input placeholder="Hospital name (if applicable)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Name and phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="admissionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admission Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="medicalHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medical History</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter relevant medical history" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Student' : 'Add Student'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StudentForm;
