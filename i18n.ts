import { getRequestConfig } from 'next-intl/server'

const LOCALES = ['es', 'en', 'de'] as const

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = LOCALES.includes(requested as any) ? requested! : 'es'
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
