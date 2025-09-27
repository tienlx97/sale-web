import { tw } from '@/utils/toWord';

export const percentText = p => (p == null ? '' : `${tw.convert(p)} percent (${p}%)`);

export const daysText = d => (d == null ? '' : tw.convert(d));

export const prettyMoney = (n, unit = 'USD') =>
	n == null ? '' : `${unit} ${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const computePaymentValue = (contractAmount, percent) =>
	contractAmount == null || percent == null ? null : +((contractAmount * percent) / 100).toFixed(2);
