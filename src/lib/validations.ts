import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional().nullable(),
  techStack: z.array(z.string()).default([]),
  liveUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  githubUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  active: z.boolean().default(true),
});

export type ProjectFormValues = z.input<typeof projectSchema>;
export type SkillFormValues = z.input<typeof skillSchema>;
export type CertificateFormValues = z.input<typeof certificateSchema>;

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  proficiencyLevel: z.number().int().min(1).max(100).default(75),
  iconName: z.string().default("code"),
  order: z.number().int().default(0),
});

export const certificateSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  credentialUrl: z.string().url("Must be a valid URL").optional().nullable().or(z.literal("")),
  imageUrl: z.string().optional().nullable(),
  skillsLearned: z.array(z.string()).default([]),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type CertificateInput = z.infer<typeof certificateSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
