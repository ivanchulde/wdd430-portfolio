import { NextResponse } from "next/server";
import { getProjectById } from "@/lib/projects-db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idParam } = await params;

  if (!/^\d+$/.test(idParam)) {
    return NextResponse.json(
      { error: "Invalid id" },
      { status: 400 }
    );
  }

  const id = Number(idParam);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return NextResponse.json(
      { error: "Invalid id" },
      { status: 400 }
    );
  }

  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(project);
}
