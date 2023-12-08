import { z } from 'zod'

type EnvVars = Record<string, string | undefined>

export function parseEnvVars<T extends Record<string, string | undefined>>(
  envVars: EnvVars,
  schema: z.ZodObject<z.ZodRawShape>,
): T {
  const parsed = schema.safeParse(envVars)

  if (!parsed.success) {
    const errorMsg = `❌ Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
    console.log(envVars)
    throw new Error(errorMsg)
  }

  return new Proxy<T>(parsed.data as T, {
    get(target, prop) {
      if (typeof prop !== 'string') {
        return undefined
      }

      return target[prop as keyof typeof target]
    },
  })
}
