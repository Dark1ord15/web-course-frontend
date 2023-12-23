import './styles.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar as NavB } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import { logout } from '../../redux/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
// import { setActiveRequestID, setMinLenghtFilter } from '../../redux/filterAndActiveRequestID/actions';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const minLenghtFilter = useSelector((state: RootState) => state.filterAndActiveId.minLenghtFilter);


  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      await dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <NavB expand="lg" className="bg-dark" style={{ backgroundColor: '#000000' }}>
      <Container fluid>
        <NavB.Brand href="/" className="text-light">Платные дороги</NavB.Brand>
        <NavB.Toggle aria-controls="navbarScroll" />
        <NavB.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Link className='navbar-link text-light' to="/">Главная</Link>
            {window.localStorage.getItem("accessToken") ? (
              <Link className='navbar-link text-light' to="/requests">
                Заявки
              </Link>
            ) : null}
          </Nav>
          <Nav>
            {window.localStorage.getItem("accessToken") ? (
              <>
                                    <p className='navbar-link text-light'>
                        {localStorage.getItem("name")}
                      </p>
                <Link className='navbar-link text-light' onClick={handleLogout}to='/'>
                  Выйти
                </Link>
              </>
            ) : (
              <>
                <Link className='navbar-link text-light' to="/auth/login">
                  Войти
                </Link>
                <Link className='navbar-link text-light' to="/auth/registration">
                  Зарегистрироваться
                </Link>
              </>
            )}
          </Nav>
        </NavB.Collapse>
      </Container>
    </NavB>
  );
};
export default Navbar;

//   return (
//     <NavB expand="lg" className="bg-dark" style={{ backgroundColor: '#000000' }}>
//       <Container fluid>
//         <NavB.Brand href="#" className="text-light">Платные дороги</NavB.Brand>
//         <NavB.Toggle aria-controls="navbarScroll" />
//         <NavB.Collapse id="navbarScroll">
//           <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
//             <Nav.Link href="/" className="text-light">Главная</Nav.Link>
//             {window.localStorage.getItem("accessToken") ? (
//    <Nav.Link className='navbar-link text-light' href="/web-course-frontend/requests">
//                 Заявки
//               </Nav.Link>
//             ) : null}
//           </Nav>
//           <Form className="d-flex" id="search" onSubmit={handleSearchSubmit}>
//             <Form.Control
//               type="search"
//               placeholder="Минимальная длина"
//               className="me-2"
//               aria-label="Search"
//               value={minLength}
//               onChange={handleMinLengthChange}
//             />
//              <Button
//               variant="outline-light"
//               onClick={(e) => {
//                 e.preventDefault();
//                 if (onMinLengthChange !== undefined) {
//                   onMinLengthChange(minLength);
//                 }
//               }} 
//             >Поиск</Button>
//           </Form>
//           <Nav>
//             {window.localStorage.getItem("accessToken") ? (
//               <Nav.Link className='navbar-link text-light' href="/shopping-cart">
//               Корзина
//             </Nav.Link>
            
//             ) : null}
//             {window.localStorage.getItem("accessToken") ? (
//               <>
//                 <Nav.Link className="text-light" onClick={handleLogout}>
//                   Выйти
//                 </Nav.Link>
//               </>
//             ) : (
//               <>
//                 <Nav.Link className="text-light" href="/auth/login">
//                   Войти
//                 </Nav.Link>
//                 <Nav.Link className="text-light" href="/auth/registration">
//                   Заригистрироваться
//                 </Nav.Link>
//               </>
//             )}
//           </Nav>
//         </NavB.Collapse>
//       </Container>
//     </NavB>
//   );
// }

// export default Navbar;
