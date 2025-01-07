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
    languages: string[];
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
    computerLanguages: string[];
    typingSkills?: string;
    vehicle?: string;
    license?: string;
    salary?: string;
    capableToDoWork?: string;
  };
  
const saveToGoogleSheets = async (data: FormData) => {
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const values = [
    new Date().toLocaleDateString(), // Today's date
    data.name,
    data.email,
    data.dob,
    data.gender,
    data.contact,
    data.emergencyContact,
    // Add remaining fields as needed
  ];

  const resource = { values: [values] };

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID, // Your Sheet ID
    range: "Sheet1!A1", // Adjust the range as per your sheet
    valueInputOption: "USER_ENTERED",
    requestBody: resource,
  });
};
