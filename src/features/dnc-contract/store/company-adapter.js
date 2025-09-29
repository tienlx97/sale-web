import { kvToPartyBlock } from './party-adapter';

// Convert Company JSON to KV rows that PartyKeyValue understands
export function companyToKV(c) {
	const base = [
		{ id: 'company', key: c.company.key, value: c.company.value, canDelete: false, multiline: false, markup: {} },
		{ id: 'representedBy', key: c.representedBy.key, value: c.representedBy.value, canDelete: true, multiline: false, markup: {} },
		{ id: 'position', key: c.position.key, value: c.position.value, canDelete: true, multiline: false, markup: {} },
		{ id: 'address', key: c.address.key, value: c.address.value, canDelete: true, multiline: true, markup: {} }
	];
	const opt = (c.optional ?? []).map((o, i) => ({
		id: `opt-${i}`,
		key: o.key,
		value: o.value,
		canDelete: true,
		multiline: true,
		markup: {}
	}));
	return [...base, ...opt];
}

export function companyToPartyABlock(c, prevA) {
	const rows = companyToKV(c);
	return kvToPartyBlock('A', rows, prevA);
}
