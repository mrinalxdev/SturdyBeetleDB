import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return new NextResponse(JSON.stringify({ error: "No file Found" }), {
      status: 400,
    });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);


  
  return NextResponse.json({ status: "ok" });
}
