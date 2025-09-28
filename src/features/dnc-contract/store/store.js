// store.ts
import { produce } from 'immer';

export const genId = () => crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export const ordinal = n =>
	['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'][n] ?? `Payment ${n + 1}`;

export function reducer(state, action) {
	return produce(state, draft => {
		switch (action.type) {
			case 'contract/set':
			case 'contract/patch': {
				action.patch(draft);
				break;
			}
			case 'payment/add': {
				const list = action.where === 'core' ? draft.payments : draft.appendPayments;
				const idx = list.length;
				list.push({
					id: genId(),
					title: `${ordinal(idx + 2)} Payment`.toUpperCase(),
					percent: null,
					days: 7,
					term: 'Telegraphic Transfer (T/T)',

					format: {
						paymentPercentText: `${ordinal(idx + 2)}: Party A shall pay {{contract.paymentAppend.[${idx}].percent.text}} ({{contract.paymentAppend.[${idx}].percent.num}}%) of the Contract Value:`,
						paymentValueText: `{{contract.money.unit}} {{contractCurrencyFormat}} x {{contract.paymentAppend.[${idx}].percent.num}}% = {{contract.money.unit}} {{appendPaymentValue}}`,
						moneyTextInword: `*(In words: {{contract.paymentAppend.[${idx}].money.text}})*`,
						termText: `by {{contract.paymentAppend.[${idx}].term}} ...`,
						endText: ''
					}
				});
				break;
			}
			case 'payment/remove': {
				const list = action.where === 'core' ? draft.payments : draft.appendPayments;
				const i = list.findIndex(p => p.id === action.id);
				if (i >= 0) list.splice(i, 1);
				break;
			}
			case 'payment/patch': {
				const list = action.where === 'core' ? draft.payments : draft.appendPayments;
				const p = list.find(x => x.id === action.id);
				if (p) action.patch(p);
				break;
			}

			case 'parties/set': {
				draft.parties[action.side] = action.next;
				break;
			}
		}
	});
}
