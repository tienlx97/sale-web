import { produce } from 'immer';
import { initialContract } from './contract-store';
import { genId } from '../utils/genId';

/**
 * @typedef {typeof initialContract} Contract
 */

/**
 *
 * @param { Contract } state
 * @param {import('../types/contract-dto').Action} action
 * @returns { Contract }
 */
export const reducer = (state, action) => {
	return produce(state, draft => {
		switch (action.type) {
			case 'contract/replace':
				return action.next; // replace whole tree
			case 'contract/patch':
				action.patch(draft);
				break;

			// ---- payments ----
			case 'payments/add': {
				const list = draft[action.where];
				const idx = list.length;

				/** @type {import('../types/contract-dto').Payment} */
				const payment = {
					id: genId(),
					title: idx === 0 ? 'FIRST PAYMENT' : idx === 1 ? 'SECOND PAYMENT' : `PAYMENT ${idx + 1}`,
					percent: 0,
					days: 7,
					term: 'Telegraphic Transfer (T/T)',
					...action.template
				};

				list.push(payment);
				break;
			}

			case 'payments/remove': {
				const list = draft[action.where];
				const i = list.findIndex(p => p.id === action.id);
				if (i >= 0) list.splice(i, 1);
				break;
			}

			case 'payments/patch': {
				const list = draft[action.where];
				const p = list.find(x => x.id === action.id);
				if (p) action.patch(p);
				break;
			}

			// ---- commercial documents ----
			case 'docs/add': {
				draft.commercial.documents.push(action.row ?? { key: '', value: '' });
				break;
			}

			case 'docs/remove': {
				draft.commercial.documents.splice(action.index, 1);
				break;
			}

			case 'docs/patch': {
				const row = draft.commercial.documents[action.index];
				if (row) action.patch(row);
				break;
			}

			// ---- party optional KV ----
			case 'partyOptional/add': {
				const side = action.side;

				/** @type {import('../types/contract-dto').PartyKV[]} */
				(draft.parties[side].optional).push(
					action.row ?? { id: genId(), key: '', value: '', canDelete: true, multiline: false, markup: {} }
				);
				break;
			}

			case 'partyOptional/remove': {
				const side = action.side;
				const arr = draft.parties[side].optional;
				const i = arr.findIndex(r => r.id === action.id);
				if (i >= 0) arr.splice(i, 1);
				break;
			}
			case 'partyOptional/patch': {
				const side = action.side;
				const row = draft.parties[side].optional.find(r => r.id === action.id);
				if (row) action.patch(row);
				break;
			}

			default:
				break;
		}
	});
};
