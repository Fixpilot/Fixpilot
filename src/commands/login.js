const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const inquirer = require("inquirer");
require("dotenv").config();

const execPromise = util.promisify(exec);
const configPath = path.join(__dirname, "../../.fixpilotrc");

// ✅ Opens browser cross-platform
async function openBrowser(url) {
  const platform = process.platform;
  try {
    if (platform === "win32") {
      await execPromise(`start "" "${url}"`);
    } else if (platform === "darwin") {
      await execPromise(`open "${url}"`);
    } else {
      await execPromise(`xdg-open "${url}"`);
    }
    console.log("✅ Browser opened successfully");
  } catch (err) {
    console.error("❌ Failed to open browser:", err.message);
    console.log(`🔗 Please open this URL manually: ${url}`);
  }
}

// ✅ Main Login Function
async function loginWithGitHub() {
  const app = express();
  const port = 5000;

  app.get("/callback", async (req, res) => {
    const code = req.query.code;

    try {
      // Step 1 — Exchange code for GitHub access token
      const tokenRes = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: process.env.REDIRECT_URI,
        },
        {
          headers: { accept: "application/json" },
        }
      );

      const accessToken = tokenRes.data.access_token;

      // Step 2 — Get GitHub user info
      const userRes = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const githubUsername = userRes.data.login;
      const githubEmail = userRes.data.email || "not-public";

      console.log(`\n👤 GitHub user: ${githubUsername}`);

      // Step 3 — Prompt for OpenAI API Key
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "openaiKey",
          message: "🔑 Enter your OpenAI API Key (saved locally):",
        },
      ]);

      // Step 4 — Save to .fixpilotrc
      const fullConfig = {
        githubToken: accessToken,
        githubUsername,
        githubEmail,
        openaiKey: answers.openaiKey,
      };

      fs.writeFileSync(configPath, JSON.stringify(fullConfig, null, 2));
      console.log("✅ All credentials saved successfully to .fixpilotrc");

      res.send(`<h2>✅ Login complete, ${githubUsername}. You can close this tab.</h2>`);
    } catch (e) {
      res.send("<h2>❌ GitHub login failed.</h2>");
      console.error("GitHub OAuth error:", e.message);
    }

    setTimeout(() => process.exit(0), 1500);
  });

  app.listen(port, () => {
    const url =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${process.env.GITHUB_CLIENT_ID}` +
      `&redirect_uri=${process.env.REDIRECT_URI}` +
      `&scope=repo%20user`;

    console.log("🌐 Opening browser for GitHub OAuth login...");
    openBrowser(url);
  });
}

module.exports = { loginWithGitHub };
