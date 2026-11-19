
import RoutineForm from '../components/routine-form';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { STORE_BASE_URL } from '../lib/utils';

export default function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		setLoading(true);
		setError('');
		setProduct(null);

		fetch(`${STORE_BASE_URL}/api/v2/product/${id}.json`)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Fetching Failed');
				}

				return res.json();
			})
			.then((data) => {
				if (!data.product) {
					throw new Error('Product not found');
				}

				setProduct(data.product);
			})
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) {
		return <p className="p-10">Loading product...</p>;
	}

	if (error) {
		return <p className="p-10">{error}</p>;
	}

	if (!product) {
		return null;
	}

	return (
		<div className="bg-lavender rounded-2xl p-6 md:p-12">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

				<div className="bg-cream rounded-2xl p-8">
					<img
						src={product.image_front_url}
						alt={product.product_name}
						className="w-full h-80 md:h-96 object-contain"
					/>
				</div>

				<div className="flex flex-col gap-5 text-deep-purple">
					<p className="text-sm text-purple">
						{product.brands}
					</p>

					<h1 className="font-serif text-4xl">
						{product.product_name}
					</h1>

					<h2 className="font-medium text-xl">
						Ingredients
					</h2>

					<p className="text-sm leading-relaxed">
						{product.ingredients_text ||
							'Ingredient information unavailable.'}

					</p>
					<RoutineForm product={product} />	
				</div>

			</div>
		</div>
	);
}
