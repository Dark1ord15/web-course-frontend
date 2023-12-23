import React, { useState, useEffect } from 'react';
import Navbar from '../../widgets/Navbar/Navbar';
import Table from 'react-bootstrap/Table';
import CartItem from '../../widgets/CardItem/CartItem';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface CartItem {
  Id: number;
  Name: string;
  Price: number;
}

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/travelrequests/introduced', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  const renderCart = () => {
    return (
      <>
        <h2>Корзина</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CartItem key={item.Name} item={item} onRemove={() => removeFromCart(item)} />
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={handleSend}>
          Отправить
        </Button>
        <Button style={{ marginLeft: '80%' }} variant="danger" onClick={handleDeleteCart}>
          Очистить корзину
        </Button>

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

  const renderEmptyCart = () => {
    return (
      <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
        <h2>Корзина пуста</h2>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <div style={{ 'marginTop': '5%', 'marginLeft': '5%', 'marginRight': '5%' }}>
        {cartItems?.length > 0 ? renderCart() : renderEmptyCart()}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
