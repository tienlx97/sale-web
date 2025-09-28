// info-adapter.ts
// type KVRow = {
//   id: string;
//   key: string;
//   value: string;
//   markup?: { boldKey?: boolean; boldValue?: boolean; caplockValue?: boolean; color?: string };
//   multiline?: boolean;
//   canDelete?: boolean;
// };

// type InfoBlock = {
//   no:       { key: string; value: string; markup?: KVRow['markup'] };
//   project:  { key: string; value: string; markup?: KVRow['markup'] };
//   item:     { key: string; value: string; markup?: KVRow['markup'] };
//   location: { key: string; value: string; markup?: KVRow['markup'] };
//   // optional?: KVRow[]  // <- only if you want extra custom rows
// };

const INFO_IDS = {
	no: 'info-no',
	project: 'info-project',
	item: 'info-item',
	location: 'info-location'
};

export function infoToKV(info) {
	return [
		{ id: INFO_IDS.no, key: info.no.key, value: info.no.value, markup: info.no.markup, canDelete: false },
		{ id: INFO_IDS.project, key: info.project.key, value: info.project.value, markup: info.project.markup, canDelete: false },
		{ id: INFO_IDS.item, key: info.item.key, value: info.item.value, markup: info.item.markup, canDelete: false },
		{ id: INFO_IDS.location, key: info.location.key, value: info.location.value, markup: info.location.markup, canDelete: false }
		// ...(info.optional ?? [])  // <- if you add support for extra rows
	];
}

export function kvToInfo(rows, prev) {
	const byId = new Map(rows.map(r => [r.id, r]));

	const get = (id, fallback) => {
		const r = byId.get(id);
		return r ? { key: r.key, value: r.value, markup: r.markup } : fallback;
	};

	const next = {
		no: get(INFO_IDS.no, prev.no),
		project: get(INFO_IDS.project, prev.project),
		item: get(INFO_IDS.item, prev.item),
		location: get(INFO_IDS.location, prev.location)
	};

	// If you support optional rows:
	// const known = new Set(Object.values(INFO_IDS));
	// next.optional = rows.filter(r => !known.has(r.id));
	return next;
}
