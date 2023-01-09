/* eslint-disable no-debugger */
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { logger } from "src/helpers/logger";
import { acu } from "../ac";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
	matcher: isAnyOf(acu.refreshCache.fulfilled, acu.updateFileMeta),
	effect: (a) => {
		logger.log(`[${new Date().toISOString()}][debuggerMiddleware] `, a);
		debugger;
	},
});

export const debuggerMiddleware = listenerMiddleware.middleware;
