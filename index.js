const poemForm = document.querySelector("#poem-form");
const poemDiv = document.querySelector("#poem");
const input = document.querySelector("#input");
const apiKey = "863ce73t1a62a502d4b0fda01094bo6c";

let typewriterInstance = null;

function cleanText(text) {
  return text.replace(/```[a-z]*\n|```/gi, "").trim();
}

function displayPoem(response) {
  if (!response.data || !response.data.answer) {
    poemDiv.textContent = "Failed to generate poem.";
    return;
  }

  const cleanPoem = cleanText(response.data.answer);
  poemDiv.innerHTML = "";

  typewriterInstance = new Typewriter("#poem", {
    strings: [cleanPoem],
    autoStart: true,
    loop:false,
    delay: 75,
    cursor:""
    
  });
}

function generatePoem(event) {
  event.preventDefault();
  const topic = input.value.trim();
  if (!topic) return;

  poemDiv.textContent = `⏳ Generating a romantic poem about "${topic}"...`;

  const context = "You are a romantic Poem expert and love to write short poems. Your mission is to generate a 8-10 line poem in basic HTML and separate each line with a <br />. Make sure to follow the user instructions and include a title. Sign the poem with 'AI Poet' inside a <strong> element at the end of the poem.";
  const prompt = `User instructions: Generate a romantic poem about ${topic}`;
  const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  axios.get(apiURL).then(displayPoem).catch(() => {
    poemDiv.textContent = "Failed to generate poem.";
  });
}

poemForm.addEventListener("submit", generatePoem);