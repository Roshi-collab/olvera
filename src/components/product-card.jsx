import { Link } from 'react-router-dom';

export default function ProductCard({
	code,
	product_name,
	image_front_url,
}) {
	return (
		<Link
			to={`/products/${code}`}
			className="bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
		>
			<img
				src={image_front_url}
				alt={product_name}
				className="w-full h-60 object-contain p-5"
			/>

			<div className="p-5">
				<h2 className="font-serif text-lg text-deep-purple">
					{product_name}
				</h2>
			</div>
		</Link>
	);
}