
const OpenAI = require("openai");
const client = new OpenAI({ apiKey: "sk-test" }); // Dummy key
console.log("client.responses exists:", !!client.responses);
console.log("client.chat exists:", !!client.chat);
if (client.responses) {
    console.log("client.responses keys:", Object.keys(client.responses));
}
