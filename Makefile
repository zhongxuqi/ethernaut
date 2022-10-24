default: test-contracts

test-contracts:
	npx hardhat test

test-Fallback:
	npx hardhat test --grep Fallback

test-Fallout:
	npx hardhat test --grep Fallout