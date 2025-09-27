export const genId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
