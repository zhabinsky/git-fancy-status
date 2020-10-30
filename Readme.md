# git-fancy-status

### Install

```
$ npm install -g git-fancy-status
```

### Usage

#### Git Status

```
$ gs

📂  Path                  : ~/Desktop/Coding/npm/git-fancy-status
🏠  Repository            : git-fancy-status (Contributors: 2)
📌  Commit init           : Fri Jan 3 00:34:27 2020 +0200
📌  Commit mine (first)   : Fri Jan 3 00:45:57 2020 +0200 Vladislav Zhabinsky
📌  Commit mine (last)    : Mon Jan 6 04:13:53 2020 +0200 Vladislav Zhabinsky
🐒  User                  : <vladislavzhabinsky@gmail.com> (Vladislav Zhabinsky)
🔥  Commits (Merge)       : 0 (Mine: ~100.0% 1)
🔥  Commits               : 5 (Mine: ~80.0% 4)
📌  Branch                : master (Total: 2)
🛳️  HEAD is:              : 0 Commits away from origin/master
👌  Status...

 D bin/git-status.sh
 D index.js
 M package.json
?? bin/git-status
?? bundle.js
```

#### Git Commit

```
$ gc delete logs

* master
[master 0379ab6] 🕊 delete logs
 1 file changed, 2 deletions(-)

```
