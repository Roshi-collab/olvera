import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Products from './pages/products';
import ProductDetails from './pages/product-details';
import Routines from './pages/routines';
import MainLayout from './pages/main-layout';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="products" element={<Products />} />
					<Route path="products/:id" element={<ProductDetails />} />
					<Route path="routines" element={<Routines />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
