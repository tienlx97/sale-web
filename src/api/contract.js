// api/contracts.ts
export async function sendContract(payload) {
	const res = await fetch('http://localhost:3000/api/contracts', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(text || `Request failed with ${res.status}`);
	}
	return res.json().catch(() => ({}));
}
