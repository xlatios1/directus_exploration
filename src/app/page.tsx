import Navbar, { Logo } from '@/components/navigationBar'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'

export default async function Home() {
	const mockNavData = {
		Home: { url: '/', parent_of: null },
		'About us': { url: '/about-us', parent_of: null },
		'Our work': { url: '/our-work', parent_of: null },
		PRODUCTS: { url: '/our-work/products', parent_of: 'Our work' },
		SERVICES: { url: '/our-work/services', parent_of: 'Our work' },
		CLIENTS: { url: '/our-work/clients', parent_of: 'Our work' },
		'Our people': { url: '/our-people', parent_of: null },
		'OUR TEAM': { url: '/our-people/our-team', parent_of: 'Our people' },
		'OUR TEAM DETAILS': {
			url: '/our-people/our-team-details',
			parent_of: 'Our people',
		},
		BLOG: { url: '/our-people/blog', parent_of: 'Our people' },
		'JOB VACANCIES': {
			url: '/our-people/job-vacancies',
			parent_of: 'Our people',
		},
		'JOIN US!': { url: '/our-people/join-us', parent_of: 'Our people' },
		'Contact us': { url: '/contact-us', parent_of: null },
	}

	const logo = await directus.request(
		readItems('Logo', {
			fields: ['id', 'src', 'alt', 'width', 'height'],
			limit: 1,
			sort: ['id'],
		})
	)

	return (
		<>
			<Navbar
				title={'Mavericks'}
				logo={logo[0] as Logo}
				navData={mockNavData}
			></Navbar>
			<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
				testing
			</div>
		</>
	)
}
