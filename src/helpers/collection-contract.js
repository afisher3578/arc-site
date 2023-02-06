'use strict';
async function handle(state, action) {
	const input = action.input;
	const caller = action.caller;
	const canEvolve = state.canEvolve;
	switch (action.input.function) {
		case 'add': {
			if (state.owner !== caller) {
				throw new ContractError('Only the owner can update this contracts state.');
			}
			let inputIds = input.ids;
			let existingIds = state.ids;

			let finalIds = [...new Set(existingIds.concat(inputIds))];

			state.ids = finalIds;

			return { state };
		}
		case 'remove': {
			if (state.owner !== caller) {
				throw new ContractError('Only the owner can update this contracts state.');
			}
			let inputIds = input.ids;
			let existingIds = state.ids;

			let finalIds = existingIds.filter((id) => {
				return !inputIds.contains(id);
			});

			state.ids = finalIds;

			return { state };
		}
		case 'transfer': {
			ContractAssert(state.transferable ?? true, 'Token cannot be transferred - soulbound');
			const current = SmartWeave.block.timestamp;
			if (state.lastTransferTimestamp && state.lockTime) {
				ContractAssert(current - state.lastTransferTimestamp <= state.lockTime, 'Token cannot be transferred - time-based soulbound');
			}
			const target = input.target;
			ContractAssert(target, 'No target specified.');
			ContractAssert(caller !== target, 'Invalid token transfer.');
			const qty = Number(input.qty) * Number(state.maxSupply);
			ContractAssert(qty && qty > 0 && Number.isInteger(qty), 'No valid quantity specified.');
			const balances = state.balances;
			ContractAssert(caller in balances && balances[caller] >= qty, 'Caller has insufficient funds');
			balances[caller] -= qty;
			if (balances[caller] === 0) {
				delete balances[caller];
			}
			if (!(target in balances)) {
				balances[target] = 0;
			}
			balances[target] += qty;
			state.balances = balances;
			state.lastTransferTimestamp = current;
			return { state };
		}
		case 'balance': {
			let target;
			if (input.target) {
				target = input.target;
			} else {
				target = caller;
			}
			const ticker = state.ticker;
			const balances = state.balances;
			ContractAssert(typeof target === 'string', 'Must specify target to retrieve balance for.');
			return {
				result: {
					target,
					ticker,
					balance: target in balances ? balances[target] / state.maxSupply : 0,
					intBalance: target in balances ? balances[target] : 0,
				},
			};
		}
		case 'evolve': {
			if (canEvolve) {
				if (state.owner !== caller) {
					throw new ContractError('Only the owner can evolve a contract.');
				}

				state.evolve = input.value;

				return { state };
			}
		}
		default: {
			throw new ContractError('Action does not exist please send a valid action.');
		}
	}
}