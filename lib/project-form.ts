import { z } from "zod";

const currentYear = new Date().getFullYear();

// Shared validation for the create and edit project forms. Server Actions call
// safeParse with this schema before anything is written to the database.
export const ProjectFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters long.")
    .max(120, "Title must be 120 characters or fewer."),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long.")
    .max(1000, "Description must be 1000 characters or fewer."),
  technologies: z
    .string()
    .trim()
    .min(1, "Add at least one technology.")
    .max(300, "Technologies must be 300 characters or fewer.")
    .refine(
      (value) => value.split(",").some((tech) => tech.trim().length > 0),
      "Add at least one technology."
    ),
  yearCompleted: z.coerce
    .number()
    .int("Year must be a whole number.")
    .min(2000, "Year must be 2000 or later.")
    .max(currentYear, `Year cannot be greater than ${currentYear}.`),
  type: z.enum(["school", "opensource"], {
    error: "Choose a project type.",
  }),
  link: z
    .string()
    .trim()
    .max(300, "Link must be 300 characters or fewer.")
    .refine(
      (value) => value === "" || URL.canParse(value),
      "Enter a valid URL, or leave this field empty."
    ),
});

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>;

export type ProjectFormState = {
  errors?: Partial<Record<keyof ProjectFormValues | "form", string[]>>;
  message?: string | null;
};

// The form uses one comma-separated text field for technologies.
export function splitTechnologies(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean)
    )
  );
}
