import FormComponent from "@/components/FormComponent";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="md:px-24 px-3.5 pb-2 w-full min-h-screen">
      <Navbar />
      <FormComponent />
    </div>
  );
}


// const htmlContent = `
// <html>
// <head>
// <style>
//   body {
//     font-family: Arial, sans-serif;
//     margin: 20px;
//   }
//   h1 {
//     color: #000;
//     font-weight: 600;
//   }
//   p {
//     font-size: 15px;
//     font-weight: 600;
//   }
//   span{
//     font-weight: 500;
//   }
//   table {
//     width: 100%;
//     border-collapse: collapse;
//     margin-top: 20px;
//     margin-bottom: 20px;
//   }
//   table,
//   th,
//   td {
//     border: 1px solid #ddd;
//   }
//   th,
//   td {
//     padding: 8px;
//     text-align: left;
//   }
//      th,td{
//     font-size: 15px;
//   }
// </style>
// </head>
// <body>
// <div style="border: 2px solid #000; padding: 20px 20px; min-height: 1035px;">
//   <h1 style="text-align: center">Candidate Application Form</h1>

//   <p style="text-align: right">Date: ${formattedDate}</p>

//   <p>Reference: <span>${data.referredBy}</span> </p>
//   <br />
  
//     <p>1. Name: <span>${data.name}</span></p>
//     <p style="margin-top: 20px">2. Email ID: <span>${data.email}</span></p>
 
//   <div
//     style="
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       margin-top: -10px;
//     "
//   >
//     <p>3. Contact: <span>${data.contact}</span></p>
//     <p>Emergency Contact No: <span>${
//       data.emergencyContact || "N/A"
//     }</span></p>
//   </div>

//   <div
//     style="
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       margin-top: -10px;
//     "
//   >
//     <p>4. Date of birth: <span>${data.dob}</span></p>
//     <p>Gender: <span>${data.gender}</span></p>
//   </div>
//   <div
//     style="
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       margin-top: -10px;
//     "
//   >
//     <p>5. Marital Status: <span>${data.maritalStatus}</span></p>
//     <p>Caste: <span>${data.caste}</span></p>
//   </div>
//   <p style="margin-top: 5px">6. Residential Address: <span>${
//     data.address
//   }</span></p>
//   <p style="margin-top: 18px">7. Languages Known: <span>${
//     data.languages
//   }</span></p>
//   <p style="margin-top: 18px">8. Educational Qualification :-</p>
//   <table style="margin-bottom: 25px">
//     <tr>
//       <th>Sr. No.</th>
//       <th>Education</th>
//       <th>Name of College</th>
//       <th>Department / Specialization</th>
//       <th>Passing Year</th>
//       <th>Marks in % or CGPA</th>
//     </tr>
//     <tr>
//       <td>1</td>
//       <td>SSC</td>
//       <td>${data.schoolname || "N/A"}</td>
//       <td>N/A</td>
//       <td>${data.sscyear || "N/A"}</td>
//       <td>${data.sscmarks || "N/A"}</td>
//     </tr>
//     <tr>
//       <td>2</td>
//       <td>HSC</td>
//       <td>${data.hscdiplomaname || "N/A"}</td>
//       <td>${data.hscdiplomadepartment || "N/A"}</td>
//       <td>${data.hscdiplomayear || "N/A"}</td>
//       <td>${data.hscdiplomamarks || "N/A"}</td>
//     </tr>
//     <tr>
//       <td>3</td>
//       <td>Graduation</td>
//       <td>${data.graduationname || "N/A"}</td>
//       <td>${data.graduationdepartment || "N/A"}</td>
//       <td>${data.graduationyear || "N/A"}</td>
//       <td>${data.graduationmarks || "N/A"}</td>
//     </tr>
//     <tr>
//       <td>4</td>
//       <td>Post Graduation</td>
//       <td>${data.pgraduationname || "N/A"}</td>
//       <td>${data.pgraduationdepartment || "N/A"}</td>
//       <td>${data.pgraduationyear || "N/A"}</td>
//       <td>${data.pgraduationmarks || "N/A"}</td>
//     </tr>
//   </table>
//   <p style="margin-top: 0px">9. Experience: <span>${
//     data.experience
//   }</span></p>
  
//     <p style="margin-top: 18px">10. Computer Basic Skills / Other Skills: <span>${
//       data.courses
//     }</span></p>
//     <p style="margin-top: 18px">11. Typing Skills (English): <span>${
//       data.typingSkills
//     }</span></p>
 
//   <p style="margin-top: 18px">
//     12. Computer Languages: <span>${data.computerLanguages}</span>
//   </p>
//   <div
//     style="
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//       margin-top: -10px;
//     "
//   >
//     <p>13. Own a Vehicle ?: <span>${data.vehicle}</span></p>
//     <p>License: <span>${data.license}</span></p>
//   </div>
  
//   <p style="margin-top: 5px">14. Salary Expectations: <span>${
//     data.salary
//   }</span></p>
//   <p style="margin-top: 18px">15. Capable to do Works: <span>${
//     data.capableToDoWork
//   }</span></p>

// </div>
// </body>
// </html>

// `;