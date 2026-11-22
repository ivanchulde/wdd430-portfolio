"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ProjectFormSchema,
  splitTechnologies,
  type ProjectFormState,
} from "@/lib/project-form";
import {
  createProjectRecord,
  deleteProjectRecord,
  updateProjectRecord,
  type Project,
} from "@/lib/projects-db";

function field(formData: FormData, name: string): string {
  const value = formData.get(name);

  return typeof value === "string" ? value : "";
}

function readProjectFields(formData: FormData) {
  return ProjectFormSchema.safeParse({
    title: field(formData, "title"),
    description: field(formData, "description"),
    technologies: field(formData, "technologies"),
    yearCompleted: field(formData, "yearCompleted"),
    type: field(formData, "type"),
    link: field(formData, "link"),
  });
}

function validationError(error: z.ZodError): ProjectFormState {
  return {
    errors: z.flattenError(error).fieldErrors,
    message: "Please correct the highlighted fields.",
  };
}

export async function createProject(
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const validated = readProjectFields(formData);

  if (!validated.success) {
    return validationError(validated.error);
  }

  const { title, description, yearCompleted, type, link } = validated.data;

  try {
    await createProjectRecord({
      title,
      description,
      yearCompleted,
      type,
      technologies: splitTechnologies(validated.data.technologies),
      link: link || undefined,
    });
  } catch (error) {
    console.error("Error creating project:", error);

    return {
      message: "Failed to create project. Please try again later.",
    };
  }

  revalidatePath("/projects");
  revalidatePath("/projects/settings");
  redirect("/projects");
}

export async function updateProject(
  id: number,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  if (!Number.isInteger(id) || id <= 0) {
    return { message: "Invalid project id." };
  }

  const validated = readProjectFields(formData);

  if (!validated.success) {
    return validationError(validated.error);
  }

  const { title, description, yearCompleted, type, link } = validated.data;

  let updated: Project | null;

  try {
    updated = await updateProjectRecord(id, {
      title,
      description,
      yearCompleted,
      type,
      technologies: splitTechnologies(validated.data.technologies),
      link: link || undefined,
    });
  } catch (error) {
    console.error("Error updating project:", error);

    return {
      message: "Failed to update project. Please try again later.",
    };
  }

  if (!updated) {
    return { message: "That project no longer exists." };
  }

  revalidatePath("/projects");
  revalidatePath("/projects/settings");
  redirect("/projects");
}

export async function deleteProject(formData: FormData): Promise<void> {
  const id = Number(field(formData, "id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid project id.");
  }

  try {
    await deleteProjectRecord(id);
  } catch (error) {
    console.error("Error deleting project:", error);

    throw new Error("Failed to delete project. Please try again later.", {
      cause: error,
    });
  }

  revalidatePath("/projects");
  revalidatePath("/projects/settings");
}
