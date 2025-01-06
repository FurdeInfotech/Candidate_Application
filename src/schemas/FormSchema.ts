import { z } from "zod";

// Helper function to check if a date is 18+ years ago
const isEighteenPlus = (date: Date) => {
  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  return date <= eighteenYearsAgo;
};

export const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not exceed 50 characters." }),
  referredBy: z
    .string()

    .max(50, { message: "Referred by must not exceed 50 characters." })
    .optional(),
  post: z
    .string()
    .min(2, { message: "Post must be at least 2 characters." })
    .max(50, { message: "Post must not exceed 50 characters." }),
  department: z.enum(["IT", "KPO", "BPO", "Any"], {
    required_error: "Select a Department",
  }),
  dob: z
    .string({ message: "Pick a Date of Birth" })
    .refine(
      (value) => {
        const date = new Date(value);
        return isEighteenPlus(date);
      },
      { message: "You must be at least 18 years old." }
    )
    .transform((value) => new Date(value)), // Convert string to Date
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Select a Gender",
  }),
  contact: z
    .string()
    .min(10, { message: "Contact No. must be at least 10 digits." }),
  emergencyContact: z
    .string()

    .max(10, { message: "Emergency Contact No. must be at least 10 digits." })
    .optional(),
  email: z.string().email({ message: "Invalid Email Address." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." })
    .max(200, { message: "Address must not exceed 200 characters." }),
  caste: z
    .string()
    .min(2, { message: "Caste must be at least 2 characters." })
    .max(50, { message: "Caste mustnot exceed 50 characters." }),
  maritalStatus: z.enum(["Single", "Married", "Widowed", "Divorced"], {
    required_error: "Select Marital Status",
  }),
  languages: z
    .array(z.string())
    .nonempty({ message: "Please select at least one language." }),
  schoolname: z
    .string()
    .min(2, { message: "School Name must be at least 2 characters." })
    .max(100, { message: "School Name must not exceed 100 characters." }),
  sscyear: z
    .string()
    .min(4, { message: "Select Passing Year" })
    .refine(
      (value) =>
        /^\d{4}$/.test(value) && parseInt(value) <= new Date().getFullYear(),
      {
        message: "Invalid Year",
      }
    ),
  sscmarks: z
    .string()
    .min(2, { message: "Enter Percentage or CGPA " })
    .max(10, { message: "Percentage or CGPA must not exceed 10 characters." }),
  hscdiplomaname: z
    .string()
    .min(2, { message: "College Name must be at least 2 characters." })
    .max(100, { message: "College Name must not exceed 100 characters." }),
  hscdiplomadepartment: z
    .string()
    .min(2, { message: "Department must be at least 2 characters." })
    .max(50, { message: "Department Name must not exceed 50 characters." }),
  hscdiplomayear: z
    .string()
    .min(4, { message: "Select Passing Year" })
    .refine(
      (value) =>
        /^\d{4}$/.test(value) && parseInt(value) <= new Date().getFullYear(),
      {
        message: "Invalid Year",
      }
    ),
  hscdiplomamarks: z
    .string()
    .min(2, { message: "Enter Percentage or CGPA " })
    .max(10, { message: "Percentage or CGPA must not exceed 10 characters." }),
  graduationname: z
    .string()

    .max(100, { message: "College Name must not exceed 100 characters." })
    .optional(),
  graduationdepartment: z
    .string()

    .max(50, { message: "Department Name must not exceed 50 characters." })
    .optional(),
  graduationyear: z
    .string()
    .min(4, { message: "Select Passing Year" })
    .refine(
      (value) =>
        value === "" || // Allow empty strings
        (/^\d{4}$/.test(value) && parseInt(value) <= new Date().getFullYear()),
      {
        message: "Invalid Year",
      }
    )
    .optional(),
  graduationmarks: z
    .string()

    .max(10, { message: "Percentage or CGPA must not exceed 10 characters." })
    .optional(),
  pgraduationname: z
    .string()

    .max(100, { message: "College Name must not exceed 100 characters." })
    .optional(),
  pgraduationdepartment: z
    .string()

    .max(50, { message: "Department Name must not exceed 50 characters." })
    .optional(),
  pgraduationyear: z
    .string()
    .min(4, { message: "Select Passing Year" })
    .refine(
      (value) =>
        value === "" || // Allow empty strings
        (/^\d{4}$/.test(value) && parseInt(value) <= new Date().getFullYear()),
      {
        message: "Invalid Year",
      }
    )
    .optional(),
  pgraduationmarks: z
    .string()

    .max(10, { message: "Percentage or CGPA must not exceed 10 characters." })
    .optional(),
});
