import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getUrl(link: string = '') {
	let url =
	  process?.env?.NEXT_PUBLIC_SITE_URL ?? 
	  process?.env?.NEXT_PUBLIC_VERCEL_URL ??
	  'http://localhost:3000/'
  
	url = url.startsWith('http') ? url : `https://${url}`
  
	url = url.endsWith('/') ? url : `${url}/`
	
	return url + link
}

export function nextWeek() {
	let currentDate = new Date();
	let nextWeekDate = new Date();
	nextWeekDate.setDate(currentDate.getDate() + 7);
	return nextWeekDate;
}

export function sortObject(object: { [key: string]: number }) {
	const sortedKeys = Object.keys(object).sort();

	// Create a new object with sorted keys
	const sortedVote: { [key: string]: number } = {};
	sortedKeys.forEach((key) => {
		sortedVote[key] = object[key];
	});
	return sortedVote;
}

export function getHightValueObjectKey(object: { [key: string]: number }) {
	let maxValue = -Infinity;
	let hightKey = "";
	for (const [key, value] of Object.entries(object)) {
		if (value > maxValue) {
			hightKey = key;
			maxValue = value;
		} else if (value === maxValue) {
			hightKey = "";
		}
	}
	return hightKey;
}

export function getFromAndTo(page: number, itemPerPage = 3) {
	let from = page * itemPerPage;
	let to = from + itemPerPage;

	if (page > 0) {
		from += 1;
	}

	return { from, to };
}
