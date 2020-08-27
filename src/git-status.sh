git_fancy_status() {
	local username=$(git config user.name)
	local user_email=$(git config user.email)

	local GREEN=$(tput setaf 2)
	local RED=$(tput setaf 1)
	local BLUE=$(tput setaf 5)
	local RESET=$(tput sgr0)

	local SPACE="\t"

	chlk() {
		echo "${1}${2}${RESET}"
	}

	is_git_repo="$(git rev-parse --is-inside-work-tree 2>/dev/null)"

	say_path() {
		local current_user=$(whoami)
		local home_path="/Users/${current_user}"
		local path=$(pwd)
		path=${path/"${home_path}"/'~'}
		printf "📂  Path                  : $(chlk $GREEN $path)\n"
	}

	log_commits() {
		local commits=$(git rev-list --all --count $2)
		[[ -z "$commits" ]] && echo "${1}: $(chlk $BLUE "There is no commits in the repo.")"
		[[ "$commits" -eq "0" ]] && commits="0.99999"
		local my_commits=$(git shortlog -s -n --all $2 --email | grep "${username}" | cut -d "${username:0:1}" -f 1 | xargs echo)
		[[ -z "$my_commits" ]] && my_commits="1"
		local my_commits_percent=$(bc -l <<<"scale=1; ${my_commits} * 100 /${commits}")
		commits=${commits%.*}
		echo "${1}      : ${commits} (Mine: $(chlk $BLUE "~${my_commits_percent}%") ${my_commits})"
	}

	find_child_repos() {
		local dirname=$(pwd)
		local foundGits=""
		for i in $(find . -maxdepth 1 -type d); do
			local directory="$(pwd)$(echo "$i" | cut -c 2-)"
			if [ -d "$directory" ] && [ -x "$directory" ]; then
				cd "$directory"
				local dir_is_repo=$(git rev-parse --is-inside-work-tree 2>/dev/null)
				if [ "$dir_is_repo" ]; then
					foundGits=$(printf "${foundGits}\n${SPACE}$(chlk $BLUE "${i}")")
				fi
			fi
			cd "$dirname"
		done
		[[ $foundGits = *[!\ ]* ]] && printf "❓  Git repos             :\n$foundGits\n\n"
	}

	echo

	if [ "$is_git_repo" ]; then
		branch=$(printf "${GREEN}$(git branch | grep -e "*" | cut -c 3-)${RESET}")
		repo_name=$(basename -s .git $(git config --get remote.origin.url))
		say_path

		local repository_creator=$(git log --all --max-parents=0 --pretty=format:"%an %ae")
		local git_reverse_log=$(git log --reverse);
		local first_commit=$(echo "$git_reverse_log" | grep -e "^Date:  " | head -n 1 | cut -c 6- | xargs)
		local commit_my_first=$(echo "$git_reverse_log"  | grep "${username}" --a=1 | grep -e "^Date:  " | head -n 1 | cut -c 6- | xargs)
		local commit_my_last=$(git log | grep "${username}" --a=1 | grep -e "^Date:  " | head -n 1 | cut -c 6- | xargs)
		local no_commit_message=$(echo "${RED}No-commit${RESET}")

		echo "🏠  Repository            : ${GREEN}${repo_name} ${RESET}(Contributors: ${BLUE}$(git shortlog --summary | wc -l | xargs)${RESET})"
		echo "📌  Commit init           : ${GREEN}${first_commit:-$no_commit_message} ${BLUE}${repository_creator}${RESET}"
		echo "📌  Commit mine (first)   : ${GREEN}${commit_my_first:-$no_commit_message} ${BLUE}${username}${RESET}"
		echo "📌  Commit mine (last)    : ${GREEN}${commit_my_last:-$no_commit_message} ${BLUE}${username}${RESET}"
		echo "🐒  User                  : ${GREEN}<${user_email}> ${BLUE}(${username})${RESET}"

		log_commits "🔥  Commits (Merge) " "--merges"
		log_commits "🔥  Commits         " "--no-merges"

		echo "📌  Branch                : ${branch} (Total: ${BLUE}$(git branch -a | wc -l | xargs))${RESET}"
		echo "🛳️   HEAD is:              : ${BLUE}$(git log origin/master..HEAD | grep "^Author:" | wc -l | xargs)${RESET} Commits away from${GREEN} origin/master${RESET}"

		local status=$(git status --short)
		status=${status:-"${SPACE}🐒   no-changes"}
		printf "👌  Status... \n\n$(chlk $BLUE "$status")\n"
	else
		echo "⭕  Error                 : $(chlk $RED "No .git repo found.")"
		say_path
		find_child_repos
	fi
}

pwd
git_fancy_status
