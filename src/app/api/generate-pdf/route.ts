import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore, { type Browser as BrowserCore } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export const dynamic = "force-dynamic";
export const maxDuration = 60;


export async function POST(request: Request) {


  let browser: Browser | BrowserCore | null = null; // Declare browser for cleanup


  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = today.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;
  try {
    // Convert FormData to JSON
    const formData = await request.formData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: Record<string, any> = {};

    // Extract key-value pairs from FormData
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Debug: Log received data
    console.log("Received Data:", data);

    

    // Prepare HTML content
    const htmlContent = `
  <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
      h1 {
        color: #000;
        font-weight: 600;
      }
      p {
        font-size: 15px;
        font-weight: 600;
      }
      span{
        font-weight: 500;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      table,
      th,
      td {
        border: 1px solid #ddd;
      }
      th,
      td {
        padding: 8px;
        text-align: left;
      }
         th,td{
        font-size: 15px;
      }
    </style>
  </head>
  <body>
    <div style="border: 2px solid #000; padding: 5px 20px 1px 20px; min-height: 1035px;">
      <h1 style="text-align: center; margin-top: -5px;">Candidate Application Form</h1>

      <p style="text-align: right">Date: ${formattedDate}</p>

      <p>Reference: <span>${data.referredBy}</span> </p>

      
        <p style="margin-top: 35px;">1. Name: <span>${data.name}</span></p>
        <p style="margin-top: 20px">2. Email ID: <span>${data.email}</span></p>
     
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -10px;
        "
      >
        <p>3. Contact: <span>${data.contact}</span></p>
        <p>Emergency Contact No: <span>${
          data.emergencyContact || "N/A"
        }</span></p>
      </div>

      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -10px;
        "
      >
        <p>4. Date of birth: <span>${data.dob}</span></p>
        <p>Gender: <span>${data.gender}</span></p>
      </div>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -10px;
        "
      >
        <p>5. Marital Status: <span>${data.maritalStatus}</span></p>
        <p>Caste: <span>${data.caste}</span></p>
      </div>
      <p style="margin-top: 5px">6. Residential Address: <span>${
        data.address
      }</span></p>
      <p style="margin-top: 18px">7. Languages Known: <span>${
        data.languages
      }</span></p>
      <p style="margin-top: 18px">8. Educational Qualification :-</p>
      <table style="margin-bottom: 25px">
        <tr>
          <th>Sr. No.</th>
          <th>Education</th>
          <th>Name of College</th>
          <th>Department / Specialization</th>
          <th>Passing Year</th>
          <th>Marks in % or CGPA</th>
        </tr>
        <tr>
          <td>1</td>
          <td>SSC</td>
          <td>${data.schoolname || "N/A"}</td>
          <td>N/A</td>
          <td>${data.sscyear || "N/A"}</td>
          <td>${data.sscmarks || "N/A"}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>HSC</td>
          <td>${data.hscdiplomaname || "N/A"}</td>
          <td>${data.hscdiplomadepartment || "N/A"}</td>
          <td>${data.hscdiplomayear || "N/A"}</td>
          <td>${data.hscdiplomamarks || "N/A"}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Graduation</td>
          <td>${data.graduationname || "N/A"}</td>
          <td>${data.graduationdepartment || "N/A"}</td>
          <td>${data.graduationyear || "N/A"}</td>
          <td>${data.graduationmarks || "N/A"}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Post Graduation</td>
          <td>${data.pgraduationname || "N/A"}</td>
          <td>${data.pgraduationdepartment || "N/A"}</td>
          <td>${data.pgraduationyear || "N/A"}</td>
          <td>${data.pgraduationmarks || "N/A"}</td>
        </tr>
      </table>
      <p style="margin-top: 0px">9. Experience: <span>${
        data.experience
      }</span></p>
      
        <p style="margin-top: 18px">10. Computer Basic Skills / Other Skills: <span>${
          data.courses
        }</span></p>
        <p style="margin-top: 18px">11. Typing Skills (English): <span>${
          data.typingSkills
        }</span></p>
     
      <p style="margin-top: 18px">
        12. Computer Languages: <span>${data.computerLanguages}</span>
      </p>
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -10px;
        "
      >
        <p>13. Own a Vehicle ?: <span>${data.vehicle}</span></p>
        <p>License: <span>${data.license}</span></p>
      </div>
      
      <p style="margin-top: 5px">14. Salary Expectations: <span>${
        data.salary
      }</span></p>
      <p style="margin-top: 5px">15. Capable to do Works: <span>${
        data.capableToDoWork
      }</span></p>
    
    </div>
  </body>
</html>

    `;


     // Launch Puppeteer based on environment
     if (process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production") {
      const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar"
      );

      browser = await puppeteerCore.launch({
        executablePath,
        args: chromium.args,
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
      });
    } else {
      browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
   
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    // Close the browser
    await browser.close();

    console.log("PDF generated successfully.");

  return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=application.pdf`,
      },
    });
  } catch (error) {
    console.error("Error in PDF generation:", error);

    // Ensure browser is closed in case of an error
    if (browser) {
      await browser.close();
    }

    return new Response(
      JSON.stringify({
        error: "Failed to generate PDF",
        details: error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
