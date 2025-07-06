const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer"); 

const configPath = path.join(__dirname, "../../.fixpilotrc");

async function firstTimePrompt() {
  console.log("Checking for config at:", configPath);

  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (config.openaiKey && config.githubToken) {
        console.log("✅ Existing config found for user:", config.githubUsername);
        return config;
      } else {
        console.log("⚠️ Invalid config found. Prompting again...");
      }
    } catch (error) {
      console.log("❌ Error reading config. Prompting again...");
    }
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "githubToken",
      message: "🔐 Enter your GitHub Personal Access Token:",
    },
  ]);

  fs.writeFileSync(configPath, JSON.stringify(answers, null, 2));
  console.log("✅ API keys saved successfully!");
  return answers;
}

module.exports = { firstTimePrompt };