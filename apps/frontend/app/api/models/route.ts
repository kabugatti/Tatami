import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const MODELS_JSON_PATH = path.join(process.cwd(), "public/models.json");

export async function GET() {
  try {
    const data = fs.readFileSync(MODELS_JSON_PATH, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json(
      { error: "Error reading models.json" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    fs.writeFileSync(MODELS_JSON_PATH, JSON.stringify(body, null, 2));
    return NextResponse.json({ message: "Models updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error writing to models.json" },
      { status: 500 },
    );
  }
}
