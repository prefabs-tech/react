tag = 0
version = 0.60

audit:
	@printf "\033[0;32m>>> Audit production dependencies\033[0m\n"
	pnpm audit -P

build:
	@printf "\033[0;32m>>> Building app for production\033[0m\n"
	pnpm build

install:
	@printf "\033[0;32m>>> Installing dependencies\033[0m\n"
	pnpm install

lint:
	@printf "\033[0;32m>>> Checking and fixing code standards\033[0m\n"
	pnpm lint

lint.fix:
	@printf "\033[0;32m>>> Lint code\033[0m\n"
	pnpm lint:fix

outdated:
	pnpm outdated

# release:
# 	@printf "\033[0;32m>>> Tagging repo for next release\033[0m\n"
# 	git checkout $(version)
# 	git pull origin $(version)
# 	git tag $(version).$(tag)
# 	git push origin $(version).$(tag)
# 	git checkout $(version)-develop

run:
	@printf "\033[0;32m>>> Running local server\033[0m\n"
	pnpm dev

# staging:
# 	@printf "\033[0;32m>>> Merging into staging branch\033[0m\n"
# 	git checkout $(version)-develop
# 	git pull origin $(version)-develop
# 	git checkout $(version)
# 	git pull origin $(version)
# 	git merge $(version)-develop -m "Merging $(version)-develop"
# 	git push origin $(version)
# 	git checkout $(version)-develop

test: test.unit

test.unit:
	@printf "\033[0;32m>>> Running unit tests\033[0m\n"
	pnpm test:unit --passWithNoTests

typecheck:
	@printf "\033[0;32m>>> Running Type check\033[0m\n"
	pnpm typecheck
