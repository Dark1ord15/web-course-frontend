import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.tsx';
import RoadPage from './pages/RoadPage/RoadPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.tsx';
import AllRequestsPage from './pages/AllRequestsPage/AllRequestsPage.tsx';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage.tsx';
const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/roads/:id" element={<RoadPage />} />
        <Route path="/requests" element={<AllRequestsPage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/registration" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;