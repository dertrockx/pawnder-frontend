export const monthsToYearMonth = (mon) => {
	const year = Math.floor(mon / 12);
	const month = mon % 12;
	return [year, month];
};
