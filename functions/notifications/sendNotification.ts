type Props = {
  token: string;
  title: string;
  text: string;
};

// const { JWT } = require("google-auth-library");
// const firebaseEmail = process.env.FIREBASE_EMAIL!;
// const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(
//   /\\n/g,
//   "\n",
// );
//
// async function generateAccessToken() {
//   const client = new JWT(
//     firebaseEmail,
//     null,
//     firebasePrivateKey,
//     ["https://www.googleapis.com/auth/cloud-platform"],
//     null,
//   );
//   await client.authorize();
//   return client.getAccessToken();
// }

export async function sendNotification({ token, title, text }: Props) {
  // const url =
  //   "https://fcm.googleapis.com/v1/projects/exam-reminders/messages:send";
  // const GetFirebaseToken = await generateAccessToken();
  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: "Bearer " + GetFirebaseToken.token,
  // };
  //
  // const data = {
  //   message: {
  //     token:
  //       "cuMguN_L33tZWaTYKbvWUF:APA91bGNkP9mtLnEmi2oXWbhgQU2rhcpoGVICdrpMGhrekkYTQYjVgQKQ68ban0CF9BKqDTPP6D9-KiOLE1W0GFZQpkFq3IvBXLbEkNPHTrzkp-K1SLM6FNqqjrOItby2myFseE7ZZhD", //you can replace with device token if you want, but cannot use token and topic together
  //     android: {
  //       priority: "high",
  //     },
  //     webpush: {
  //       headers: {
  //         Urgency: "high",
  //       },
  //       data: {
  //         body: "text",
  //         title: "title",
  //         requireInteraction: "true",
  //       },
  //       fcm_options: {
  //         link: "exam-reminders.vercel.app",
  //       },
  //     },
  //   },
  // };
  //
  // console.log(data);
  //
  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify(data),
  // });
  //
  // console.log(response);

  const admin = require("firebase-admin");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_ADMIN!),
      ),
    });
  }

  const messaging = admin.messaging();

  const message = {
    notification: {
      title,
      body: text,
    },
    token: token,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  messaging
    .send(message)
    .then((response: any) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error: any) => {
      console.log("Error sending message:", error, message);
    });
}
