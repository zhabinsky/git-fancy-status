# git-fancy-status

### Install
```
$ sudo npm install -g git-fancy-status
```

### Usage

```
# Just type gs in your terminal:

$ gs
```


### Behaviour
- Git directory
```
$ gs

📂  Path            : ~/Desktop/Coding/NPM/git-fancy-status
🏠  Repository      : git-fancy-status (Contributors: 2)
🐒  User            : <vladislavzhabinsky@gmail.com> (Vladislav Zhabinsky)
🔥  Commits (Merge) : 1 (Mine: ~100.0% 1)
🔥  Commits         : 2 (Mine: ~50.0% 1)
📌  Branch          : master (Total: 2)
🛳️  HEAD is:        : 0 Commits away from origin/master

👌  Status... 

 D bin/git-status.sh
 D index.js
 M package.json
?? bin/git-status
?? bundle.js
```
- Not Git directory
```
$ gs


⭕  Error           : No .git repo found.
📂  Path            : ~
❓  Git repos       :

	./project1
	./project2
```