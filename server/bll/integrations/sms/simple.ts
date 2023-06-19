// Single message sending only

import { createRouter, defineEventHandler, useBase } from 'h3'

const getSmsSimple = defineEventHandler(() => {
	return 'Hello World'
})

const postSmsSimple = defineEventHandler((event) => {
	return 'Hello World'
})

export const v1 = {
	getSmsSimple,
	postSmsSimple
}
