import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CardBootstrap from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { BsCartPlus } from 'react-icons/bs';
import axios from 'axios';

interface CardProps {
    id: number;
    name: string;
    image: string;
    price: number;
    buttonAddClicked: () => void; 
}

const Card: React.FC<CardProps> = (props) => {
    const [isDetailsHovered, setIsDetailsHovered] = useState(false);
    const [isAddToCartHovered, setIsAddToCartHovered] = useState(false);

    const handleDetailsHover = () => {
        setIsDetailsHovered(true);
    };

    const handleDetailsLeave = () => {
        setIsDetailsHovered(false);
    };

    const handleAddToCartHover = () => {
        setIsAddToCartHovered(true);
    };

    const handleAddToCartLeave = () => {
        setIsAddToCartHovered(false);
    };

    const handleAddToCart = async () => {
        try {
            await axios.post(
                `/api/roads/road_travel_request/${props.id}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            props.buttonAddClicked()
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleImageClick = () => {
        handleAddToCart();
    };

    return (
        <CardBootstrap style={{ width: '18rem', marginTop: '3rem', margin: '10% 10% 5% 10%', backgroundColor: '#6884c0', color: 'white', position: 'relative' }}>
            <CardBootstrap.Img variant="top" src={props.image} onClick={handleImageClick} />

            <CardBootstrap.Body style={{ textAlign: 'center' }}>
                <CardBootstrap.Title style={{ marginBottom: '3rem' }}>{props.name}</CardBootstrap.Title>

                <div style={{ position: 'absolute', bottom: '0', left: '0', padding: '1rem' }}>
                    {props.price} рублей
                </div>
            </CardBootstrap.Body>

            <div style={{ position: 'absolute', bottom: '0', right: '0', display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
                <Link to={`/roads/${props.id}`} style={{ marginRight: '10px' }}>
                    <Button
                        style={{
                            backgroundColor: isDetailsHovered ? '#f0f0f0' : '#000000',
                            borderColor: isDetailsHovered ? '#151d2a' : '#A0AECD',
                            color: isDetailsHovered ? '#000000' : '#f0f0f0'
                        }}
                        onMouseOver={handleDetailsHover}
                        onMouseOut={handleDetailsLeave}
                    >
                        Подробнее
                    </Button>
                </Link>
                <Button
                    variant="primary"
                    onClick={handleAddToCart}
                    style={{
                        backgroundColor: isAddToCartHovered ? '#f0f0f0' : '#000000',
                        borderColor: isAddToCartHovered ? '#151d2a' : '#A0AECD',
                        color: isAddToCartHovered ? '#000000' : '#f0f0f0'
                    }}
                    onMouseOver={handleAddToCartHover}
                    onMouseOut={handleAddToCartLeave}
                >
                    <BsCartPlus />
                </Button>
            </div>
        </CardBootstrap>
    );
}

export default Card;
