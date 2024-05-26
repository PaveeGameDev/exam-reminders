type Props = {
  token: string;
  title: string;
  text: string;
};
export function sendNotification({ token, title, text }: Props) {
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
      console.log("Error sending message:", error);
    });
}
