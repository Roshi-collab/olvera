import { Outlet } from 'react-router-dom';
import Footer from '../layouts/footer';
import Navbar from '../layouts/navbar';

export default function MainLayout() {
	return (
		<div className="min-h-screen bg-cream px-4 md:px-12 pt-16 pb-8">
			<div className="relative max-w-7xl mx-auto">

				{/* First layer */}
				<div className="absolute -top-10 bottom-10 inset-x-[8%] bg-purple rounded-[2rem]" />

				{/* Second layer */}
				<div className="absolute -top-5 bottom-5 inset-x-[4%] bg-[#BCA5CE] rounded-[2rem]" />

				{/* Main website */}
				<div className="relative bg-cream rounded-[2rem] shadow-xl overflow-hidden border border-lavender flex flex-col">
					<Navbar />

					<main className="flex-1 px-4 md:px-6">
						<Outlet />
					</main>

					<Footer />
				</div>

			</div>
		</div>
	);
}