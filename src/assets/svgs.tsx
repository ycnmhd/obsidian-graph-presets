const defaultWidth = 18;
export const svgs = {
	"ellipsis-vertical": ({
		width = defaultWidth,
	}: { width?: number } = {}) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={width}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
			/>
		</svg>
	),
	"x-mark": ({
		className = "w-6 h-6",
		width = defaultWidth,
		onClick,
	}: {
		className?: string;
		width?: number;
		onClick?: () => void;
	}) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={className}
			width={width}
			onClick={onClick}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6 18L18 6M6 6l12 12"
			/>
		</svg>
	),
	"x-circle": ({ className = "w-6 h-6", width = defaultWidth }) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={className}
			width={width}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
	"check-circle": (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={defaultWidth}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	),
	"graph-presets": `<svg viewBox="0 0 167 170" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M101.716 73.2853C106.64 73.3631 110.693 69.4553 110.768 64.5569C110.843 59.6586 106.911 55.6246 101.987 55.5468C97.063 55.469 93.0103 59.3768 92.9354 64.2752C92.8604 69.1735 96.7915 73.2075 101.716 73.2853ZM101.604 80.581C110.579 80.7228 117.965 73.6005 118.102 64.6728C118.238 55.7452 111.074 48.3929 102.099 48.2511C93.1241 48.1093 85.7378 55.2316 85.6011 64.1593C85.4645 73.0869 92.6293 80.4392 101.604 80.581Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M150.467 74.0556C155.391 74.1335 159.444 70.2256 159.519 65.3273C159.594 60.4289 155.663 56.395 150.738 56.3171C145.814 56.2393 141.761 60.1472 141.686 65.0455C141.611 69.9439 145.543 73.9778 150.467 74.0556ZM150.355 81.3513C159.33 81.4931 166.716 74.3708 166.853 65.4432C166.99 56.5155 159.825 49.1633 150.85 49.0215C141.875 48.8797 134.489 56.002 134.352 64.9296C134.216 73.8573 141.38 81.2095 150.355 81.3513Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M98.0742 78.7154L105.216 77.0583L107.108 85.1037L144.716 85.6979L146.852 77.7162L153.94 79.5981L150.33 93.0841L129.467 92.7544L129.276 105.271L121.941 105.156L122.133 92.6385L101.27 92.3089L98.0742 78.7154Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M125.184 132.942C131.604 133.043 136.888 127.948 136.986 121.562C137.083 115.176 131.958 109.917 125.538 109.815C119.118 109.714 113.834 114.809 113.737 121.195C113.639 127.581 118.764 132.84 125.184 132.942ZM125.072 140.238C135.543 140.403 144.16 132.094 144.32 121.678C144.479 111.262 136.12 102.685 125.65 102.519C115.179 102.354 106.562 110.663 106.402 121.079C106.243 131.495 114.602 140.072 125.072 140.238Z" fill="white"/>
<path d="M83.259 128.869L81.8442 128.919C50.1495 128.559 39.0788 106.472 39.0788 106.472L82.8309 106.427L81.1486 17.8646L80.8695 17.869C52.5447 18.2065 31.6033 10.7718 23.0496 6.91534C10.9249 1.44746 5.00283 -3.05523 3.1785 6.78107C1.56426 15.4583 0.24139 29.2143 0.465125 47.8889C0.942937 88.3297 15.6852 169.817 82.6669 169.038L84.0243 168.967L83.259 128.869ZM21.9762 71.8078C21.9762 71.8078 27.5087 53.7841 45.4872 53.8442C63.4765 53.9014 69.9357 71.9591 69.9357 71.9591L21.9762 71.8078Z" fill="white"/>
</svg>`,
	"chevron-down": (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={defaultWidth}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 8.25l-7.5 7.5-7.5-7.5"
			/>
		</svg>
	),
	"chevron-up": (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={defaultWidth}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M4.5 15.75l7.5-7.5 7.5 7.5"
			/>
		</svg>
	),
	plus: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={defaultWidth}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 4.5v15m7.5-7.5h-15"
			/>
		</svg>
	),
	"document-check": (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={defaultWidth}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
			/>
		</svg>
	),
	"document-plus": (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={defaultWidth}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
			/>
		</svg>
	),
	pencil: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={defaultWidth}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
			/>
		</svg>
	),
	"bars-3-bottom-right": (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			width={defaultWidth}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
			/>
		</svg>
	),
	"obsidian-chevron": (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="svg-icon right-triangle"
		>
			<path d="M3 8L12 17L21 8"></path>
		</svg>
	),
	"lucid-star": ({ width = defaultWidth, ...props }) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			viewBox="0 0 24 24"
			width={width}
			{...props}
		>
			<path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"></path>
		</svg>
	),
};
