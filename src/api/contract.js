// api/contracts.ts

const apiUrl = import.meta.env.VITE_API_URL;

console.log({ apiUrl });

export async function sendContract(payload) {
	const res = await fetch(`${apiUrl}/v1/contract`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	if (!res.ok) throw new Error(await res.text());
	return res.json(); // or whatever your API returns
}

export async function downloadContract(payload, format = 'pdf') {
	console.log({ apiUrl });

	const res = await fetch(`${apiUrl}/v1/contract?format=${format}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	if (!res.ok) throw new Error(await res.text());

	const blob = await res.blob();
	const filename = `contract-${new Date().toISOString().slice(0, 10)}.${format}`;
	return { blob, filename };
}
