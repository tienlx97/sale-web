// src/features/dnc-contract/party/adapter.ts

const rid = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
const normalizeMarkup = m => ({
	boldKey: !!m?.boldKey,
	boldValue: !!m?.boldValue,
	caplockValue: !!m?.caplockValue,
	capsLockValue: !!m?.capsLockValue
});

/** Party(object) -> rows[] để render trong PartyKeyValue */
export function partyToRows(p, side) {
	const rows = [
		{
			id: 'company',
			key: p.company.key,
			value: p.company.value,
			markup: normalizeMarkup(p.company.markup),
			multiline: !!p.company.multiline,
			canDelete: false
		},
		{
			id: 'representedBy',
			key: p.representedBy.key,
			value: p.representedBy.value,
			markup: normalizeMarkup(p.representedBy.markup),
			multiline: !!p.representedBy.multiline,
			canDelete: false
		},
		{
			id: 'position',
			key: p.position.key,
			value: p.position.value,
			markup: normalizeMarkup(p.position.markup),
			multiline: !!p.position.multiline,
			canDelete: false
		},
		{
			id: 'address',
			key: p.address.key,
			value: p.address.value,
			markup: normalizeMarkup(p.address.markup),
			multiline: !!p.address.multiline,
			canDelete: false
		}
	];
	if (side === 'B' && p.taxCode) {
		rows.push({
			id: 'taxCode',
			key: p.taxCode.key,
			value: p.taxCode.value,
			markup: normalizeMarkup(p.taxCode.markup),
			multiline: !!p.taxCode.multiline,
			canDelete: false
		});
	}
	const optionals = (p.optional ?? []).map(r => ({
		id: r.id ?? rid(),
		key: r.key,
		value: r.value,
		markup: normalizeMarkup(r.markup),
		multiline: !!r.multiline,
		canDelete: r.canDelete ?? true
	}));
	return [...rows, ...optionals];
}

/** rows[] -> Party(object) (ghi đè các core theo id; optional giữ nguyên/replace) */
export function rowsToParty(rows, prev, side) {
	const byId = new Map(rows.map(r => [r.id, r]));
	const core = (id, fb) => {
		const r = byId.get(id);
		return r ? { key: r.key, value: r.value, markup: r.markup, multiline: r.multiline } : fb;
	};

	const next = {
		title: prev?.title,
		company: core('company', prev.company),
		representedBy: core('representedBy', prev.representedBy),
		position: core('position', prev.position),
		address: core('address', prev.address),
		optional: []
	};
	if (side === 'B') {
		const fallbackTax = prev?.taxCode ?? { key: 'Tax Code', value: '' };
		next.taxCode = core('taxCode', fallbackTax);
	}

	// optional: mọi row không thuộc core id
	const CORE = new Set(['company', 'representedBy', 'position', 'address', 'taxCode']);
	next.optional = rows
		.filter(r => !CORE.has(r.id))
		.map(r => ({
			id: r.id ?? rid(),
			key: r.key,
			value: r.value,
			markup: r.markup,
			multiline: r.multiline,
			canDelete: r.canDelete ?? true
		}));

	return next;
}

/** Đảm bảo 4 core luôn tồn tại (khi load state cũ) */
export function ensureCore(p, side = 'A') {
	if (!p) {
		// fallback theo initialContract của bạn
		const baseA = {
			title: '(Hereinafter referred to as **Party A**)',
			company: { key: '**PARTY A (BUYER)**', value: '', markup: { caplockValue: true, boldValue: true } },
			representedBy: { key: '**Represented by**', value: '', markup: { boldValue: true } },
			position: { key: 'Position', value: '' },
			address: { key: 'Address', value: '' },
			optional: []
		};
		const baseB = {
			title: '(Hereinafter referred to as **Party B**)',
			company: {
				key: '**PARTY B (SUPPLIER)**',
				value: 'DAI NGHIA INDUSTRIAL MECHANICS CO., LTD',
				markup: { caplockValue: true, boldValue: true }
			},
			representedBy: { key: '**Represented by**', value: 'Mr. Le Xuan Nghia', markup: { caplockValue: true, boldValue: true } },
			position: { key: 'Position', value: 'General Director' },
			address: {
				key: 'Address',
				value: 'No 5 Vsip II-A, Street 32, Viet Nam – Singapore II-A IZ, Vinh Tan Ward, Ho Chi Minh City Viet Nam'
			},
			taxCode: { key: 'Tax Code', value: '3702682454' },
			optional: []
		};
		return side === 'A' ? baseA : baseB;
	}
	// Nếu p có đủ 4 core thì giữ nguyên; nếu thiếu core nào thì lấp từ fallback theo initial
	const filled = rowsToParty(partyToRows(p, side), side === 'A' ? ensureCore(undefined, 'A') : ensureCore(undefined, 'B'), side);
	return filled;
}
