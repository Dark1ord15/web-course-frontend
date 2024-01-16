import React, { useState, useEffect } from 'react';
import Navbar from '../../widgets/Navbar/Navbar';
import Table from 'react-bootstrap/Table';
import CartItem from '../../widgets/CardItem/CartItem';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../../widgets/Loader/Loader';
import { RootState } from '../../redux/store';
import { setActiveRequestID } from '../../redux/filterAndActiveRequestID/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface Cart {
  Status: string;
  RoadInfo: CartItem[];
}
interface CartItem {
  Id: number;
  Name: string;
  Price: number;
}

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart>({
    Status: "",
    RoadInfo: [],
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const ActiveRequestId = useSelector((state: RootState) => state.filterAndActiveId.activeRequestID);

  useEffect(() => {
    fetchData();
  }, [ActiveRequestId]); // Добавляем ActiveRequestId в зависимости, чтобы fetchData вызывался при его изменении

  const fetchData = async () => {
    if (ActiveRequestId != null) {
      try {
        const response = await axios.get(`/api/travelrequests/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setCartItems(response.data);
        console.log(cartItems)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const removeFromCart = async (removedItem: CartItem) => {
    try {
      await axios.delete(`/api/travelrequestroads/${localStorage.getItem("ActiveRequestId")}/${removedItem.Id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteCart = async () => {
    try {
      await axios.delete(`/api/travelrequests/${localStorage.getItem("ActiveRequestId")}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSend = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleConfirmSend = async () => {
    // Ваша логика отправки данных
    // ...
    try {
        await axios.put(
          `/api/travelrequests/change-status-user/${localStorage.getItem("ActiveRequestId")}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        await axios.post(
            '/pay/pay/',  
            {
              id: localStorage.getItem("ActiveRequestId"),
            }
          );
        setShowModal(false);
        navigate("/")
      } catch (error) {
        setError('Ошибка при отправке формы. Попробуйте позже')
        console.error('Error fetching data:', error);
      }
    // Закрыть модальное окно после успешной отправки
    setShowModal(false);
  };
  console.log(id)
  const renderCart = () => {
    return (
      <>
        {cartItems.Status == 'introduced' ?  
        <h2>Корзина</h2> : <h2>Информация о заявке</h2>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              {cartItems.Status == 'introduced' ? 
                <th>Действие</th> : <></>}
            </tr>
          </thead>
          <tbody>
          {cartItems.RoadInfo.map((item) => (
                <CartItem key={item.Name} item={item} onRemove={() => removeFromCart(item)} requestStatus={cartItems.Status}/>
            ))}
          </tbody>
        </Table>
        {cartItems.Status == 'introduced' ?
        <Button variant="primary" onClick={handleSend}>
          Отправить
        </Button> : <></>}
        {cartItems.Status == 'introduced' ?
        <Button style={{ marginLeft: '80%' }} variant="danger" onClick={handleDeleteCart}>
          Очистить корзину
        </Button> : <></>}

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Подтверждение отправки</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Вы уверены, что хотите отправить данные?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleConfirmSend}>
              Отправить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  if (!cartItems.RoadInfo) {
    return (
      <>
        <Navbar />
        <div style={{ marginLeft: "5%", marginTop: "1%" }}>
        <Link to="/" style={{ textDecoration: 'none' }}>Главная </Link>
        {cartItems.Status == 'introduced' ?  
        <Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
          / Подробнее
        </Link>: <><Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
          / Корзина
        </Link></>}
      </div>
        <h2 style={{ marginTop: "10%", marginLeft: "5%" }}>Корзина пуста</h2>
      </>
    );
  }
  return (
    <div>
      <Navbar />         <div style={{ marginLeft: "5%", marginTop: "1%" }}>
        <Link to="/" style={{ textDecoration: 'none' }}>Главная </Link>
        {cartItems.Status != 'introduced' ? 
        <Link to="/requests"style={{ textDecoration: 'none' }}> / Таблица заявок </Link> : <></>}
       {cartItems.Status == 'introduced' ?  
        <Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
          / Корзина
        </Link>: <><Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
          / Подробнее о заявке
        </Link></>}
      </div>
      {cartItems.RoadInfo?.length > 0 ? <> <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
        {renderCart()}
      </div> </> : 
        <Loader/>}
    </div>
  );
};
export default ShoppingCartPage;
