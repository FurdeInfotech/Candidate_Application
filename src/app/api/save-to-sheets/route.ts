import { saveToGoogleSheets } from "@/actions/saveToGoogleSheets";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    // Parse the request body yes
    const body = await request.json();

    // Validate the body (optional, recommended for production)
    if (!body.name || !body.email || !body.contact) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, or contact" },
        { status: 400 }
      );
    }

    // Call the saveToGoogleSheets function with the parsed data
    await saveToGoogleSheets(body);

    return NextResponse.json({ message: "Data saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
