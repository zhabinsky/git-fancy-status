const shell = require("shelljs");
const run = (cmd) => shell.exec(cmd).output;

if (!shell.which("git")) {
  shell.echo("Sorry, this script requires git");
  shell.exit(1);
}

const branch = run("git branch --show-current");

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
  include: "💪",
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
  deliver: "🤝",
  release: "🎂",
  bring: "👌",
  return: "🧬",
  revert: "🧬",
};

const getEmojiFromText = (text = "") => {
  const words = text.toLowerCase().split(" ");
  const wordEndings = ["", "s", "es", "ed", "d"];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < wordEndings.length; j++) {
      const emoji = wordToEmojiMap[words[i] + wordEndings[j]];
      if (emoji) return emoji;
    }
  }
  return "";
};

const getUserProvidedMessage = () => {
  const text = process.argv.splice(2).join(" ").trim();
  if (text.length === 0) return "🔨 commit without message";
  return text;
};

const message = getUserProvidedMessage();
const emoji = getEmojiFromText(message);
const ticket = getTicketNameFromText(branch);
const commitMessage = `${ticket}${emoji}${message}`.replace(/"/g, '\\"');

run(`git commit -m "${commitMessage}"`);

// console.log(commitMessage);
