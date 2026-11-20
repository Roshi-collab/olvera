
import { useState } from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';

import Home from './pages/home';
import Products from './pages/products';
import ProductDetails from './pages/product-details';
import Routines from './pages/routines';
import MainLayout from './pages/main-layout';
import Auth from './components/auth';

function App() {
    const [token, setToken] = useState(
        () => localStorage.getItem('token')
    );

    function handleLogin(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        setToken(data.token);
    }

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        setToken(null);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout
                            token={token}
                            onLogout={handleLogout}
                        />
                    }
                >
                    <Route index element={<Home />} />

                    <Route path="products" element={<Products />} />

                    <Route
                        path="products/:id"
                        element={<ProductDetails />}
                    />

                    <Route
                        path="auth"
                        element={
                            token
                                ? <Navigate to="/routines" replace />
                                : <Auth onLogin={handleLogin} />
                        }
                    />

                    <Route
                        path="routines"
                        element={
                            token
                                ? <Routines />
                                : <Navigate to="/auth" replace />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
