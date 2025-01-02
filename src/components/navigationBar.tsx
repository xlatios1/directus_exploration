'use client'
import { useState } from 'react'
import Link from 'next/link'

type NavItem = {
	url: string
	parent_of: string | null
}

export type Logo = {
	src: string
	alt: string
	width: number
	height: number
}

type NavData = Record<string, NavItem>

interface NavbarProps {
	title: string
	logo?: Logo
	navData: NavData
}

export default function Navbar({ title, logo, navData }: NavbarProps) {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
	const [openDropdown, setOpenDropdown] = useState<string | null>(null)
	const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(
		null
	)

	// Parse navigation data to build menu hierarchy
	const buildMenu = (data: NavData) => {
		const menu: Record<
			string,
			{ url: string; children: Array<{ name: string; url: string }> }
		> = {}

		Object.entries(data).forEach(([key, value]) => {
			const { parent_of } = value
			if (parent_of) {
				if (!menu[parent_of]) menu[parent_of] = { url: '', children: [] }
				menu[parent_of].children.push({ name: key, url: value.url })
			} else {
				menu[key] = { url: value.url, children: menu[key]?.children || [] }
			}
		})

		return menu
	}

	const menu = buildMenu(navData)

	const handleMouseEnter = (key: string) => {
		if (dropdownTimeout) {
			clearTimeout(dropdownTimeout)
			setDropdownTimeout(null)
		}
		setOpenDropdown(key)
	}

	const handleMouseLeave = () => {
		const timeout = setTimeout(() => {
			setOpenDropdown(null)
		}, 1300) // 3-second delay before closing
		setDropdownTimeout(timeout)
	}

	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
				<div className={`flex items-center justify-between py-1 min-h-16`}>
					{/* Brand */}
					<div className="flex-shrink-0">
						<Link href="/">
							{logo?.src && logo?.alt ? (
								<img
									src={logo.src}
									alt={logo.alt}
									width={logo.width ?? 'auto'}
									height={logo.height ?? 'auto'}
								></img>
							) : (
								<span className="text-white font-bold text-lg">{title}</span>
							)}
						</Link>
					</div>
					{/* Navigation Menu */}
					<div className="hidden md:block">
						<div className="ml-10 flex items-center space-x-1">
							{Object.keys(menu).map((key) => (
								<div
									className="relative group justify-content"
									key={key}
									onMouseEnter={() => handleMouseEnter(key)}
									onMouseLeave={handleMouseLeave}
								>
									{/* Parent Link */}
									<Link href={menu[key].url}>
										<span className="h-full text-gray-300 group-hover:bg-gray-700 group-hover:text-white px-3 py-2 rounded-md text-base font-medium flex justify-center items-center text-center">
											{key.toUpperCase()}
										</span>
									</Link>
									{/* Dropdown */}
									{menu[key].children.length > 0 && openDropdown === key && (
										<div className="absolute left-0 w-max max-w-[12rem] bg-gray-700 mt-2 rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-0 group-hover:delay-[0s] delay-[1s]">
											{menu[key].children.map((child) => (
												<Link href={child.url} key={child.name}>
													<span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 pointer-events-auto">
														{child.name.toUpperCase()}
													</span>
												</Link>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Mobile menu button */}
					<div className="-mr-2 flex md:hidden">
						<button
							onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
							className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d={
										isMobileMenuOpen
											? 'M6 18L18 6M6 6l12 12'
											: 'M4 6h16M4 12h16m-7 6h7'
									}
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			{/* Mobile menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-gray-700">
					{Object.keys(menu).map((key) => (
						<div key={key}>
							<div
								className="flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-600"
								onClick={() =>
									setOpenDropdown((prev) => (prev === key ? null : key))
								}
							>
								<Link href={menu[key].url}>
									<span>{key}</span>
								</Link>
								{menu[key].children.length > 0 && (
									<svg
										className="h-5 w-5 ml-2"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d={
												openDropdown === key
													? 'M6 18L18 6M6 6l12 12'
													: 'M6 9l6 6 6-6'
											}
										/>
									</svg>
								)}
							</div>
							{openDropdown === key && menu[key].children.length > 0 && (
								<div className="pl-4 bg-gray-800">
									{menu[key].children.map((child) => (
										<Link href={child.url} key={child.name}>
											<span className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
												{child.name}
											</span>
										</Link>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</nav>
	)
}
