const { firstTimePrompt } = require("../prompts/firstTimePrompt");

// src/commands/runFixPilot.js
async function runFixPilot() {
  // Your logic here, e.g., console.log("Running FixPilot...");
   console.log("🚀 Welcome to FixPilot CLI\n");
   await firstTimePrompt();
}

module.exports = { runFixPilot };