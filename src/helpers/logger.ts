/* eslint-disable no-console */
enum LOG_LEVEL {
	DEBUG = 0,
	INFO = 1,
	WARN = 2,
	ERROR = 3,
	NONE = 4,
}

const logLevel =
	process.env.NODE_ENV === "development" ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO;

export const logger = {
	log: (...args: any[]) => {
		if (logLevel <= LOG_LEVEL.DEBUG) {
			console.log(...args);
		}
	},
	info: (...args: any[]) => {
		if (logLevel <= LOG_LEVEL.INFO) {
			console.info(...args);
		}
	},
	warn: (...args: any[]) => {
		if (logLevel <= LOG_LEVEL.WARN) {
			console.warn(...args);
		}
	},
	error: (...args: any[]) => {
		if (logLevel <= LOG_LEVEL.ERROR) {
			console.error(...args);
		}
	},
};
