# 🛠️ FixPilot CLI (Paused)

FixPilot is a powerful AI-driven CLI tool designed to help developers **analyze, debug, and fix code repositories automatically** using GitHub + AI APIs like OpenAI or Gemini.

> 🚧 **Status: Paused**  
> This project is currently on hold until further resources (API credits/funding) are available. Planning to resume in the future.

---

## ✨ Planned Features

- GitHub OAuth login via CLI
- Secure OpenAI / Gemini API integration
- Analyze code from GitHub repos
- Detect and suggest fixes using LLMs
- Apply changes and push back automatically

---

## 📁 Project Structure

```bash
   fixpilot-cli/
├── bin/ # CLI entry
├── src/
│ ├── commands/ # login, run
│ ├── core/ # auth, scan, analyze, fix
│ ├── prompts/ # user inputs
│ └── utils/ # logger, config, spinner
├── .fixpilotrc # (local user credentials)
├── .gitignore
├── .env # (OAuth keys)
├── package.json
└── README.md
```


---

## 🔐 Noteworthy

- OAuth Client ID and Secret are stored in `.env`
- Tokens and keys are stored in `.fixpilotrc` (excluded from git)
- Uses `commander`, `inquirer`, `simple-git`, `OpenAI`, `dotenv`, `express`, `ora`

---

## 💡 Vision (When Resumed)

The long-term goal is to make FixPilot the **ChatGPT of codebases**:
- Detect bugs and suggest AI fixes
- Push corrected commits
- Support OpenAI, Gemini, or local LLMs

---

## 📌 License

MIT – Free to use when ready.

---

Made with 💻 by [boi-network12](https://kamdidev.vercel.app)
