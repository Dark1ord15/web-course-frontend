import React from 'react';
import { Button } from 'react-bootstrap';

interface CartItemProps {
  item: {
    Name: string;
    Price: number;
  };
  onRemove: (removedItem: { Name: string; Price: number }) => void; 
  requestStatus: string;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, requestStatus }) => {
    console.log('CartItem data:', item);
    
    const handleRemove = () => {
      onRemove(item);
    };
  
    return (
      <tr>
        <td>{item.Name}</td>
        <td>{item.Price}</td>
        {requestStatus == 'introduced' ?
        <td>
          <Button variant="danger" onClick={handleRemove}>
            Удалить
          </Button>
        </td>: <> </>}
      </tr>
    );
  };
  

export default CartItem;