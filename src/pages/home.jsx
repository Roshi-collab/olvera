import hero from '../assets/hero.png';

export default function Home() {
	return (
		<section className="bg-lavender rounded-2xl overflow-hidden flex flex-col items-center pt-8 md:pt-10">

			<h1 className="font-serif text-deep-purple text-4xl md:text-6xl text-center px-4 mb-6">
				Skincare for{' '}
				<span className="italic text-purple">
					Real Skin
				</span>
			</h1>

			<img
				src={hero}
				alt="La Roche-Posay skincare collection"
				className="w-full max-h-[480px] object-contain"
			/>

		</section>
	);
}