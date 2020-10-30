const shell = require("shelljs");
const run = (cmd) => shell.exec(cmd).output;

if (!shell.which("git")) {
  shell.echo("Sorry, this script requires git");
  shell.exit(1);
}

const branch = run("git branch");

const jira_matcher = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g;
const getTicketNameFromText = (text) => {
  const reverse = (a = "") => [...a].reverse().join("");
  const matches = reverse(text).match(jira_matcher) || [];
  if (matches.length === 0) {
    return "";
  }

  const tickets = matches.map(reverse);
  return tickets[0] + ": ";
};

const wordToEmojiMap = {
  add: "💪",
  introduce: "💪",
  alert: "🛎",
  attach: "🖇",
  change: "🧬",
  tweak: "🧬",
  complete: "✅",
  completes: "✅",
  coverage: "☂",
  delete: "🕊",
  extend: "💪",
  fix: "🔧",
  implement: "💪",
  improve: "🎉",
  merge: "♻️",
  modify: "🔨",
  pass: "✅",
  passes: "✅",
  refactor: "🔨",
  remove: "🕊",
  rename: "🖊",
  return: "💪",
  revert: "❌",
  cancel: "❌",
  forbid: "❗",
  restrain: "❗",
  limit: "❗",
  show: "👁",
  test: "🥽",
  update: "👌",
  use: "🤝",
};

const getEmojiFromText = (text = "") => {
  const words = text.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const emoji = wordToEmojiMap[word];
    if (emoji) {
      return emoji + "  ";
    }
  }
  return "";
};

const message = process.argv.splice(2).join(" ");
const emoji = getEmojiFromText(message);
const ticket = getTicketNameFromText(branch);
const commitMessage = `${ticket}${emoji}${message}`.replace(/"/g, '\\"');

run(`git commit -m "${commitMessage}"`);
