import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {name, email, pdfBuffer } = await request.json(); // Parse JSON body

    if (!email || !pdfBuffer) {
      return NextResponse.json(
        { error: "Missing required fields: email or pdfBuffer" },
        { status: 400 }
      );
    }

    const base64Pdf = Buffer.from(pdfBuffer).toString("base64"); // Ensure buffer is encoded to Base64

    const { data, error } = await resend.emails.send({
      from: "New Application Form Received <info@furdeinfotech.com>",
      to: "info@furdeinfotech.com",
      subject: `Job Application Form Received From ${name}`,
      replyTo: email,
      text: `Attached is the job application form of ${name}.`,
      attachments: [
        {
          filename: `${name}_Application_Form.pdf`,
          content: base64Pdf,
        },
      ],
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log(data);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in POST function:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
