export const genId = () => crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export const ordinal = n =>
	['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'][n] ?? `Payment ${n + 1}`;
