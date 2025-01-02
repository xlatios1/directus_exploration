import { createDirectus, rest } from '@directus/sdk'
const directus = createDirectus(process.env.DIRECTUS_URL).with(rest())
export default directus
