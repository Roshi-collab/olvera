import { useEffect, useState } from 'react';
import ProductCard from '../components/product-card';
import { STORE_BASE_URL } from '../lib/utils';

const categories = [
	'All',
	'Effaclar',
	'Cicaplast',
	'Toleriane',
	'Anthelios',
	'Hyalu',
	'Lipikar',
];

export default function Products() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('All');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		fetch(
			`${STORE_BASE_URL}/cgi/search.pl?search_terms=la+roche+posay&search_simple=1&action=process&json=1&page_size=50`
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error('Fetching Failed');
				}

				return res.json();
			})
			.then((data) => setProducts(data.products))
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	}, []);

	const filteredProducts = products.filter((product) => {
		if (!product.product_name || !product.image_front_url || !product.code) {
			return false;
		}

		const name = product.product_name.toLowerCase();

		const matchesSearch = name.includes(search.toLowerCase());

		const matchesCategory =
			category === 'All' ||
			name.includes(category.toLowerCase());

		return matchesSearch && matchesCategory;
	});

	return (
		<div className="bg-lavender rounded-2xl p-6 md:p-10">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
				<h1 className="font-serif text-4xl text-deep-purple">
					Products
				</h1>

				<div className="flex flex-wrap gap-3">
					<input
						type="search"
						placeholder="Search products"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
						className="bg-cream text-deep-purple rounded-lg px-4 py-3 outline-none"
					/>

					<select
						value={category}
						onChange={(event) => setCategory(event.target.value)}
						className="bg-cream text-deep-purple rounded-lg px-4 py-3 outline-none"
					>
						{categories.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>
			</div>

			{loading && <p>Loading products...</p>}

			{error && <p>{error}</p>}

			{!loading && !error && filteredProducts.length === 0 && (
				<p>No products found.</p>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				{filteredProducts.map((product) => (
					<ProductCard
						key={product.code}
						{...product}
					/>
				))}
			</div>
		</div>
	);
}