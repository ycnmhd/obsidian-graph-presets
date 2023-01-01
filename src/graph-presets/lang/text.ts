import { en } from "./locale/en";

export const t: {
	c: Record<keyof typeof en, string>;
} = {
	c: en,
};

export const rtf1 = {
	c: new Intl.RelativeTimeFormat("en", { style: "long" }),
};
