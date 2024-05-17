import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    scope: "/app",
    sw: "service-worker.js",
    customWorkerSrc: "firebase-messaging-sw",
});

export default withPWA({
    // Your Next.js config
});