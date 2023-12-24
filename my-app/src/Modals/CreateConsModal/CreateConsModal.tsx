import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';


interface CreateConsModalProps {
    show: boolean;
    handleClose: () => void;
    fetchData: () => void;
}

const CreateConsModal: React.FC<CreateConsModalProps> = ({ show, handleClose, fetchData }) => {
    const [Name, setName] = useState("");
    const [Trustmanagment, setTrustmanagment] = useState("");
    const [Length, setLength] = useState("");
    const [Paidlength, setPaidlength] = useState("");
    const [Category, setCategory] = useState("");
    const [Numberofstripes, setNumberofstripes] = useState("");
    const [Speed, setSpeed] = useState("");
    const [Price, setPrice] = useState("");
    const [Startofsection, setStartofsection] = useState("");
    const [Endofsection, setEndofsection] = useState("");
    const [error, setError] = useState<string | null>(null);


    const handleEdit = async (Name: string, Trustmanagment: number, Length: number, Paidlength: number, Category: string, Numberofstripes: string,  Speed: number, Price: number, Startofsection: number, Endofsection: number, ) => {
        try {
            await axios.post(
                `/api/roads/`,
                {
                    "Name": Name,
                    "Trustmanagment": Trustmanagment,
                    "Length": Length,
                    "Paidlength": Paidlength,
                    "Category": Category,
                    "Numberofstripes": Numberofstripes,
                    "Speed": Speed,
                    "Price": Price,
                    "Startofsection": Startofsection,
                    "Endofsection": Endofsection,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            handleClose()
            fetchData()
        } catch (error) {
            setError('Ошибка в вводе данных')
            console.error('Error fetching data:', error);
        }
    }



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Создание новой дороги</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Добавьте дополнительные поля ввода здесь */}
                    <Form.Group className="mb-3" controlId="formAdditionalField1">
                        <Form.Label>Название дороги</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Название"
                            name="Name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAdditionalField2">
                        <Form.Label>Доверительное управление</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Доверительное управление"
                            name="Trustmanagment"
                            value={Trustmanagment} 
                            onChange={(e) => setTrustmanagment(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAdditionalField3">
                        <Form.Label>Протяженность трассы</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Протяженность трассы"
                            name="Length"
                            value={Length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField4">
                        <Form.Label>Протяженность платных участков</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Протяженность платных участков"
                            name="Paidlength"
                            value={Paidlength}
                            onChange={(e) => setPaidlength(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField5">
                        <Form.Label>Категория дороги</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Категория дороги"
                            name="Category"
                            value={Category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField6">
                        <Form.Label>Количество полос</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Количество полос"
                            name="Numberofstripes"
                            value={Numberofstripes}
                            onChange={(e) => setNumberofstripes(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField7">
                        <Form.Label>Скоростной режим</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Скоростной режим"
                            name="Speed"
                            value={Speed}
                            onChange={(e) => setSpeed(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField8">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Цена"
                            name="Price"
                            value={Price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField9">
                        <Form.Label>Начало участка</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Начало участка"
                            name="Startofsection"
                            value={Startofsection}
                            onChange={(e) => setStartofsection(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField10">
                        <Form.Label>Конец участка</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Конец участка"
                            name="Endofsection"
                            value={Endofsection}
                            onChange={(e) => setEndofsection(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <div className="error-message">{error}</div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={() => handleEdit(Name, parseInt(Trustmanagment), parseInt(Length), parseInt(Paidlength), Category, Numberofstripes, parseInt(Speed), parseInt(Price),  parseInt(Startofsection),parseInt(Endofsection) )}>
                    Отправить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateConsModal;