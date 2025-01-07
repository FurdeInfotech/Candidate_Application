import { Resend } from "resend";

export async function POST(request: Request) {
  const { email, pdfBuffer } = await request.json();
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailResponse = await resend.emails.send({
    from: "Your Name <you@example.com>",
    to: email,
    subject: "Job Application Form",
    text: "Attached is the job application form.",
    attachments: [
      {
        filename: "Candidate_Job_Application.pdf",
        content: pdfBuffer,
      },
    ],
  });

  return new Response(
    JSON.stringify({ message: "Email sent successfully!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
