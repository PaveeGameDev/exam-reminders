// import { NextRequest, NextResponse } from "next/server";
// import { getMessaging } from "firebase/messaging";
//
// export function GET(request: NextRequest) {
//   const registrationToken = "YOUR_REGISTRATION_TOKEN";
//
//   const message = {
//     data: {
//       score: "850",
//       time: "2:45",
//     },
//     token: registrationToken,
//   };
//
//   // Send a message to the device corresponding to the provided
//   // registration token.
//   getMessaging()
//     .send(message)
//     .then((response) => {
//       // Response is a message ID string.
//       console.log("Successfully sent message:", response);
//     })
//     .catch((error) => {
//       console.log("Error sending message:", error);
//     });
//   return NextResponse.json({ success: "great" }, { status: 200 });
// }
