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
    yearCompleted: string;
    type: "school" | "opensource";
    link: string;
  };
  submitLabel: string;
  cancelHref?: string;
};

const currentYear = new Date().getFullYear();

const initialState: ProjectFormState = { message: null, errors: {} };

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/30";

const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

const errorTextClass = "mt-1.5 text-sm text-red-600";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors?.map((error, index) => (
        <p key={`${id}-${index}`} className={errorTextClass}>
          {error}
        </p>
      ))}
    </div>
  );
}

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
    yearCompleted: String(currentYear),
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
          aria-live="polite"
          aria-atomic="true"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className={labelClass}>
            Project Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={120}
            defaultValue={values.title}
            aria-invalid={Boolean(state.errors?.title)}
            aria-describedby="title-error"
            className={inputClass}
            placeholder="Project title"
          />
          <FieldError id="title-error" errors={state.errors?.title} />
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
            aria-describedby="description-error"
            className={inputClass}
            placeholder="What does this project do?"
          />
          <FieldError
            id="description-error"
            errors={state.errors?.description}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="technologies" className={labelClass}>
            Technologies (comma-separated)
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            required
            maxLength={300}
            defaultValue={values.technologies}
            aria-invalid={Boolean(state.errors?.technologies)}
            aria-describedby="technologies-hint technologies-error"
            className={inputClass}
            placeholder="Next.js, TypeScript, PostgreSQL"
          />
          <p id="technologies-hint" className="mt-1.5 text-xs text-muted">
            Separate multiple technologies with commas.
          </p>
          <FieldError
            id="technologies-error"
            errors={state.errors?.technologies}
          />
        </div>

        <div>
          <label htmlFor="yearCompleted" className={labelClass}>
            Year Completed
          </label>
          <input
            id="yearCompleted"
            name="yearCompleted"
            type="number"
            min={2000}
            max={currentYear}
            step={1}
            required
            defaultValue={values.yearCompleted}
            aria-invalid={Boolean(state.errors?.yearCompleted)}
            aria-describedby="yearCompleted-error"
            className={inputClass}
            placeholder={String(currentYear)}
          />
          <FieldError
            id="yearCompleted-error"
            errors={state.errors?.yearCompleted}
          />
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
            aria-describedby="type-error"
            className={inputClass}
          >
            <option value="school">School</option>
            <option value="opensource">Open Source</option>
          </select>
          <FieldError id="type-error" errors={state.errors?.type} />
        </div>

        <div className="sm:col-span-2">
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
            aria-describedby="link-error"
            className={inputClass}
            placeholder="https://github.com/..."
          />
          <FieldError id="link-error" errors={state.errors?.link} />
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
