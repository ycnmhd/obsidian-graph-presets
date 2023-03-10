export const getStarredFiles = () => {
	const starred = (app as any).internalPlugins.plugins.starred;
	if (starred && starred.instance) {
		const items = starred.instance.items as {
			type: string;
			title: string;
			path: string;
		}[];
		return items.map((item) => item.path);
	}
	return [];
};
