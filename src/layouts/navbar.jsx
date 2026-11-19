import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
	{
		title: 'Home',
		path: '/',
	},
	{
		title: 'Products',
		path: '/products',
	},
	{
		title: 'My Routine',
		path: '/routines',
	},
];

export default function Navbar() {
	return (
		<header className="px-5 md:px-10 py-5 text-deep-purple">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-4">

				<Link to="/">
					<img
						src={logo}
						alt="Olvera Skincare"
						className="w-28 md:w-36 object-contain mix-blend-multiply"
						style={{ filter: 'hue-rotate(305deg)' }}
					/>
				</Link>

				<nav className="flex items-center gap-5 md:gap-8">
					{navLinks.map((navlink) => (
						<NavLink
							to={navlink.path}
							key={navlink.path}
							end={navlink.path === '/'}
							className={({ isActive }) =>
								isActive
									? 'border-b border-purple pb-1 text-sm'
									: 'text-sm pb-1 hover:text-purple'
							}
						>
							{navlink.title}
						</NavLink>
					))}
				</nav>

			</div>
		</header>
	);
}