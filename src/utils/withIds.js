export const withIds = (rows) =>
  rows.map((r) => ({ id: crypto.randomUUID(), ...r }));
