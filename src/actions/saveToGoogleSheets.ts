import { google } from "googleapis";
import { JWT } from "google-auth-library";
type FormData = {
  name: string;
  email: string;
  dob?: string; // Or use `Date` if applicable
  gender?: string;
  contact: string;
  emergencyContact?: string;
  maritalStatus?: string;
  caste?: string;
  address?: string;
  languages: string | string[];
  schoolname?: string;
  sscyear?: string;
  sscmarks?: string;
  hscdiplomaname?: string;
  hscdiplomadepartment?: string;
  hscdiplomayear?: string;
  hscdiplomamarks?: string;
  graduationname?: string;
  graduationdepartment?: string;
  graduationyear?: string;
  graduationmarks?: string;
  pgraduationname?: string;
  pgraduationdepartment?: string;
  pgraduationyear?: string;
  pgraduationmarks?: string;
  department?: string;
  post?: string;
  referredBy?: string;
  experience?: string;
  courses?: string;
  computerLanguages: string[] | string;
  typingSkills?: string;
  vehicle?: string;
  license?: string;
  salary?: string;
  capableToDoWork?: string;
};

export const saveToGoogleSheets = async (data: FormData) => {
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  if (data.dob) {
    const date = new Date(data.dob); // Parse the date
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;
    data.dob = formattedDate; // Update the date in the desired format
  }

  if (Array.isArray(data.languages)) {
    data.languages = data.languages.join(", "); // Join the array into a comma-separated string
  }

  if (Array.isArray(data.computerLanguages)) {
    data.computerLanguages = data.computerLanguages.join(", "); // Join the array into a comma-separated string
  }

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const yyyy = today.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;

  const sheets = google.sheets({ version: "v4", auth });

  const values = [
    formattedDate, // Today's date
    data.name,
    data.referredBy || "N/A",
    data.department,
    data.post,
    data.email,
    data.contact,
    data.emergencyContact || "N/A",
    data.dob,
    data.gender,
    data.maritalStatus,
    data.caste,
    data.address,
    data.languages,
    data.schoolname,
    data.sscyear,
    data.sscmarks,
    data.hscdiplomaname,
    data.hscdiplomadepartment,
    data.hscdiplomayear,
    data.hscdiplomamarks,
    data.graduationname || "N/A",
    data.graduationdepartment || "N/A",
    data.graduationyear || "N/A",
    data.graduationmarks || "N/A",
    data.pgraduationname,
    data.pgraduationdepartment || "N/A",
    data.pgraduationyear || "N/A",
    data.pgraduationmarks || "N/A",
    data.experience,
    data.typingSkills,
    data.courses,
    data.computerLanguages,
    data.vehicle,
    data.license,
    data.salary,
    data.capableToDoWork || "N/A",
  ];

  const resource = { values: [values] };

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID, // Your Sheet ID
    range: "Candidate!A1", // Adjust the range as per your sheet
    valueInputOption: "USER_ENTERED",
    requestBody: resource,
  });
};
