import OpenAI from "openai";
const client = new OpenAI();

async function generateThoughts(inputText) {
    const response = await client.responses.create({
        model: "gpt-4.1",
        input: inputText,
    });
    return response.output_text;
}

async function addThoughtsToImage(imageId, inputText) {
    const thoughts = await generateThoughts(inputText);
    // Assuming there's a function to overlay text on an image
    overlayTextOnImage(imageId, thoughts);
}

// Example usage
const inputText = "Describe the emotions of a serene sunset.";
const imageId = "exampleImageId"; // Replace with actual image identifier
addThoughtsToImage(imageId, inputText);