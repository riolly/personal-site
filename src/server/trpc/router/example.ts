import {z} from 'zod'

import {router, publicProcedure} from '../trpc'

export const exampleRouter = router({
	hello: publicProcedure
		.input(z.object({text: z.string().nullish()}).nullish())
		.query(({input}) => {
			return {
				greeting: `Are you ready ${input?.text ?? 'challenger'}?`,
			}
		}),
	getAll: publicProcedure.query(({ctx}) => {
		return ctx.prisma.example.findMany()
	}),
})
