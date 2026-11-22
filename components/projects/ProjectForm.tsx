"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { ProjectFormState } from "@/lib/project-form";

type ProjectFormProps = {
  action: (
    prevState: ProjectFormState,
    formData: FormData
  ) => Promise<ProjectFormState>;
  defaultValues?: {
    title: string;
    description: string;
    technologies: string;
    type: "school" | "opensource";
    link: string;
  };
  submitLabel: string;
  cancelHref?: string;
};

const initialState: ProjectFormState = {};

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

export default function ProjectForm({
  action,
  defaultValues,
  submitLabel,
  cancelHref = "/projects",
}: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const values = defaultValues ?? {
    title: "",
    description: "",
    technologies: "",
    type: "school" as const,
    link: "",
  };

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
    >
      {state.message && (
        <p
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={120}
            defaultValue={values.title}
            aria-invalid={Boolean(state.errors?.title)}
            aria-describedby={state.errors?.title ? "title-error" : undefined}
            className={inputClass}
            placeholder="Project title"
          />
          {state.errors?.title && (
            <p id="title-error" className="mt-1.5 text-sm text-red-600">
              {state.errors.title[0]}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            maxLength={1000}
            defaultValue={values.description}
            aria-invalid={Boolean(state.errors?.description)}
            aria-describedby={
              state.errors?.description ? "description-error" : undefined
            }
            className={inputClass}
            placeholder="What does this project do?"
          />
          {state.errors?.description && (
            <p id="description-error" className="mt-1.5 text-sm text-red-600">
              {state.errors.description[0]}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="technologies" className={labelClass}>
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            maxLength={300}
            defaultValue={values.technologies}
            aria-invalid={Boolean(state.errors?.technologies)}
            aria-describedby={
              state.errors?.technologies ? "technologies-error" : undefined
            }
            className={inputClass}
            placeholder="Next.js, TypeScript, PostgreSQL"
          />
          <p className="mt-1.5 text-xs text-muted">
            Separate multiple technologies with commas.
          </p>
          {state.errors?.technologies && (
            <p id="technologies-error" className="mt-1.5 text-sm text-red-600">
              {state.errors.technologies[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="type" className={labelClass}>
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={values.type}
            aria-invalid={Boolean(state.errors?.type)}
            className={inputClass}
          >
            <option value="school">School</option>
            <option value="opensource">Open Source</option>
          </select>
          {state.errors?.type && (
            <p className="mt-1.5 text-sm text-red-600">
              {state.errors.type[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="link" className={labelClass}>
            Project link <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="link"
            name="link"
            type="url"
            maxLength={300}
            defaultValue={values.link}
            aria-invalid={Boolean(state.errors?.link)}
            aria-describedby={state.errors?.link ? "link-error" : undefined}
            className={inputClass}
            placeholder="https://github.com/..."
          />
          {state.errors?.link && (
            <p id="link-error" className="mt-1.5 text-sm text-red-600">
              {state.errors.link[0]}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          {pending ? "Saving..." : submitLabel}
        </button>

        <Link
          href={cancelHref}
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-muted transition hover:bg-primary-light hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
