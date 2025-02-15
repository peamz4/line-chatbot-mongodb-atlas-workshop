const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");

/**
 * Firebase Functions 2nd Generation
 * https://firebase.google.com/docs/reference/functions/2nd-gen/node/firebase-functions.globaloptions
 */
setGlobalOptions({
    region: "asia-northeast1",
    memory: "1GB",
    concurrency: 40
});

/**
 * HTTP Cloud Function to handle incoming requests.
 */
exports.receive = onRequest({ invoker: "public" }, async (request, response) => {
    try {
        const events = request.body;
        console.log(JSON.stringify(events, null, 2));
        
        if (events.events && events.events.length > 0) {
            const messageEvent = events.events[0];
            if (messageEvent.type === "message" && messageEvent.message.type === "text") {
            const messageText = messageEvent.message.text;
            console.log("Message text:", messageText);
            }
        }
        
        response.status(200).end();
    } catch (error) {
        console.error("Error processing request:", error);
        response.status(500).send("Internal Server Error");
    }
});