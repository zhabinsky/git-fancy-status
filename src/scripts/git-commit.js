const { execSync } = require("child_process");

const MAP_EMOJI = {
  add: "💪",
  alert: "🛎",
  attach: "🖇",
  bring: "👌",
  cancel: "❌",
  change: "🧬",
  complete: "✅",
  coverage: "☂",
  delete: "🕊",
  deliver: "🤝",
  deploy: "✅",
  destroy: "❌",
  extend: "💪",
  fix: "🔧",
  forbid: "❗",
  implement: "💪",
  improve: "🎉",
  include: "💪",
  introduce: "💪",
  kill: "❌",
  limit: "❗",
  merge: "♻️",
  modify: "🔨",
  pass: "✅",
  prepare: "🔧",
  refactor: "🔨",
  release: "🎂",
  remove: "🕊",
  rename: "🖊",
  restrain: "❗",
  return: "💪",
  revert: "❌",
  show: "👁",
  test: "🥽",
  tweak: "🧬",
  update: "👌",
  use: "🤝",
};

const getTicketNameFromBranch = () => {
  const jira_matcher = /\d+-[A-Z]+(?!-?[a-zA-Z]{1,10})/g;
  const branchName = execSync("git branch --show-current").toString();
  const reverse = (a = "") => [...a].reverse().join("");
  const matches = reverse(branchName).match(jira_matcher) || [];
  const [ticket] = matches.map(reverse);
  if (ticket) return ticket + ": ";
  return "";
};

const getUserProvidedMessage = () => {
  const text = process.argv.splice(2).join(" ").trim();
  if (text.length === 0) return "🔨 commit without message";
  return text || "";
};

const getEmojiFromText = (text = "") => {
  const words = text.toLowerCase().split(" ");
  const wordEndings = ["", "s", "es", "ed", "d"];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < wordEndings.length; j++) {
      const emoji = MAP_EMOJI[words[i] + wordEndings[j]];
      if (emoji) return emoji + " ";
    }
  }
  return "";
};

const execCommit = () => {
  const text = getUserProvidedMessage();
  const emoji = getEmojiFromText(text);
  const ticket = getTicketNameFromBranch();
  const commitMessage = `${ticket}${emoji}${text}`.replace(/"/g, '\\"');
  try {
    return execSync(`git commit -m "${commitMessage}"`).toString();
  } catch (e) {
    return e.stdout.toString();
  }
};

console.log(execCommit());
