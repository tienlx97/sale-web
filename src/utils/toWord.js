import { ToWords } from 'to-words';

export const toWords = new ToWords({ localeCode: 'en-US' });

export const tw = new ToWords({ localeCode: 'en-US' });

export const moneyInWords = (n, _unit = 'USD') => {
	if (n == null || !Number.isFinite(n)) {
		return '';
	}
	const abs = Math.abs(n);
	const intPart = Math.trunc(abs);
	const cents = Math.round((abs - intPart) * 100);
	const unitName = intPart === 1 ? 'United States Dollar' : 'United States Dollars';
	let phrase = `${unitName} ${intPart === 0 ? 'Zero' : tw.convert(intPart)}`;
	if (cents > 0) phrase += ` and ${tw.convert(cents)} ${cents === 1 ? 'Cent' : 'Cents'}`;
	return `${phrase} Only`;
};
