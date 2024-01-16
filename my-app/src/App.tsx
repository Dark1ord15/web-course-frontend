import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import TableMainPage from './pages/TableMainPage/TableMainPage.tsx'
import MainPage from './pages/MainPage/MainPage.tsx';
import RoadPage from './pages/RoadPage/RoadPage.tsx';
import AllRequestsAdminPage from './pages/AllRequestsAdminPage/AllRequestsAdminPage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.tsx';
import AllRequestsPage from './pages/AllRequestsPage/AllRequestsPage.tsx';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage.tsx';
import CreatePage from "./pages/CreatePage/CreatePage.tsx"
import EditPage from './pages/EditPage/EditPage.tsx';
const App = () => {
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
      {role > 0 ?
          <Route path="/main-page/admin" element={<TableMainPage />} /> : null}
          <Route path="/" element={<MainPage />} />
        <Route path="/roads/:id" element={<RoadPage />} />
        {role > 0 ?
        <Route path="/requests" element={<AllRequestsAdminPage />} />
          : <Route path="/requests" element={<AllRequestsPage />} />}
         <Route path="/request/:id" element={<ShoppingCartPage />} />
         <Route path="/roads/create" element={<CreatePage />} />
         <Route path="/main-page/admin/roads/:roadId/edit" element={<EditPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/registration" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;