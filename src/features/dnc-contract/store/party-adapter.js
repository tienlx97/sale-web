const FIXED_IDS = {
	A: {
		company: 'A-company',
		representedBy: 'A-representedBy',
		position: 'A-position',
		address: 'A-address'
	},
	B: {
		company: 'B-company',
		representedBy: 'B-representedBy',
		position: 'B-position',
		address: 'B-address',
		taxCode: 'B-taxCode'
	}
};

const ensureId = (pref = 'row') => globalThis.crypto?.randomUUID?.() ?? `${pref}-${Date.now()}-${Math.random()}`;

/** DTO Party -> KV rows for PartyKeyValue */
export function partyBlockToKV(side, block) {
	const ids = FIXED_IDS[side];
	const rows = [
		{ id: ids.company, ...block.company, canDelete: false, multiline: !!block.company.multiline },
		{ id: ids.representedBy, ...block.representedBy, canDelete: false, multiline: !!block.representedBy.multiline },
		{ id: ids.position, ...block.position, canDelete: false, multiline: !!block.position.multiline },
		{ id: ids.address, ...block.address, canDelete: false, multiline: !!block.address.multiline }
	];

	if (side === 'B' && block.taxCode) {
		rows.push({ id: ids.taxCode, ...block.taxCode, canDelete: false, multiline: !!block.taxCode.multiline });
	}

	const optionals = (block.optional ?? []).map(r => ({
		...r,
		id: r.id || ensureId('opt'),
		canDelete: r.canDelete ?? true,
		multiline: !!r.multiline
	}));

	return rows.concat(optionals);
}

/** KV rows -> DTO Party (we detect fixed rows by id, not by label) */
export function kvToPartyBlock(side, kvs, prev) {
	const ids = FIXED_IDS[side];

	const pick = (id, fallback) => {
		const r = kvs.find(x => x.id === id);
		return r ? { key: r.key, value: r.value, markup: r.markup, multiline: r.multiline, canDelete: r.canDelete, id: r.id } : fallback;
	};

	const knownIds = new Set(Object.values(ids));
	const optional = kvs.filter(r => !knownIds.has(r.id)).map(r => ({ ...r, id: r.id || ensureId('opt'), canDelete: r.canDelete ?? true }));

	const next = {
		title: prev?.title,
		company: pick(ids.company, prev.company),
		representedBy: pick(ids.representedBy, prev.representedBy),
		position: pick(ids.position, prev.position),
		address: pick(ids.address, prev.address),
		optional
	};

	if (side === 'B') {
		next.taxCode = pick(ids.taxCode, prev.taxCode || { key: 'Tax Code', value: '' });
	}

	return next;
}
