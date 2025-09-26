import { ToWords } from 'to-words';

const tw = new ToWords({ localeCode: 'en-US' });

export const percentText = p => (p == null ? '' : `${tw.convert(p)} percent (${p}%)`);

export const daysText = d => (d == null ? '' : tw.convert(d));

export const prettyMoney = (n, unit = 'USD') =>
	n == null ? '' : `${unit} ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const moneyInWords = (n, _unit = 'USD') => {
	if (n == null || !Number.isFinite(n)) return '';
	const abs = Math.abs(n);
	const intPart = Math.trunc(abs);
	const cents = Math.round((abs - intPart) * 100);
	const unitName = intPart === 1 ? 'United States Dollar' : 'United States Dollars';
	let phrase = `${unitName} ${intPart === 0 ? 'Zero' : tw.convert(intPart)}`;
	if (cents > 0) phrase += ` and ${tw.convert(cents)} ${cents === 1 ? 'Cent' : 'Cents'}`;
	return `${phrase} Only`;
};

export const computePaymentValue = (contractAmount, percent) =>
	contractAmount == null || percent == null ? null : +((contractAmount * percent) / 100).toFixed(2);
