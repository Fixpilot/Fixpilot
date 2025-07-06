#!/usr/bin/env node

const { Command } = require("commander");
const { runFixPilot } = require("../src/commands/runFixPilot");
const { loginWithGitHub } = require("../src/commands/login");

const program = new Command();

program
   .name('fixpilot')
  .description('AI Debugging Tool for Repos')
  .version('1.0.0')
  
program
  .command("login")
  .description("Authenticate with GitHub via OAuth")
  .action(loginWithGitHub);  

program
  .command("run")
  .description("Run FixPilot on a repo (after you’ve logged in)")
  .action(runFixPilot);

  
program.parse(process.argv);