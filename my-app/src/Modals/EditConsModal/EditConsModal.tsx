// import React, { useState } from 'react'
// import { Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';


// interface EditConsModalProps {
//     show: boolean;
//     handleClose: () => void;
//     RoadId: number;
//     fetchData: () => void;
//     consName : string;
//     consTrustmanagment : string;
//     consLenght : string;
//     consPaidlenght : string;
//     consCategory : string;
//     consNumberofstripes : string;
//     consSpeed : string;
//     consPrice : string;
//     consStartofsection : string;
//     consEndofsection : string;
//   }

// const EditConsModal: React.FC<EditConsModalProps> = ({ show, handleClose, RoadId, fetchData, consName, consTrustmanagment, consLenght, consPaidlenght, consCategory, consNumberofstripes, consSpeed, consPrice, consStartofsection, consEndofsection}) => {
//     const [Name, setName] = useState(consName);
//     const [Trustmanagment, setTrustmanagment] = useState(consTrustmanagment);
//     const [Length, setLength] = useState(consLenght);
//     const [Paidlength, setPaidlength] = useState(consPaidlenght);
//     const [Category, setCategory] = useState(consCategory);
//     const [Numberofstripes, setNumberofstripes] = useState(consNumberofstripes);
//     const [Speed, setSpeed] = useState(consSpeed);
//     const [Price, setPrice] = useState(consPrice);
//     const [Image, setImage] = useState<File | null>(null);
//     const [Startofsection, setStartofsection] = useState(consStartofsection);
//     const [Endofsection, setEndofsection] = useState(consEndofsection);
//     const [error, setError] = useState<string | null>(null);
    


//     const handleEdit = async (Name: string, Trustmanagment: number, Length: number, Paidlength: number, Category: string, Numberofstripes: string,  Speed: number, Price: number, Image: File | null, Startofsection: number, Endofsection: number, ) => {
//         try {
//             await axios.put(
//                 `/api/roads/${RoadId}`,
//                 {
//                     "Name": Name,
//                     "Trustmanagment": Trustmanagment,
//                     "Length": Length,
//                     "Paidlength": Paidlength,
//                     "Category": Category,
//                     "Numberofstripes": Numberofstripes,
//                     "Speed": Speed,
//                     "Price": Price,
//                     "Startofsection": Startofsection,
//                     "Endofsection": Endofsection,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                     },
//                 }
//             );
//             if (Image) {
//                 let formData = new FormData();
//                 formData.append('image', Image)
//                 try {
//                     await axios.put(`/api/roads/road_add_image/${RoadId}`, 
//                         formData,
//                          {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                         },
//                     });
//                 } catch (error) {
//                     console.error('Error fetching data:', error);
//                 }
//             }
//             handleClose()
//             fetchData()
//         } catch (error) {
//             setError('Ошибка в вводе данных')
//             console.error('Error fetching data:', error);
//         }
//     }



//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Редактирование дороги</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     {/* Добавьте дополнительные поля ввода здесь */}
//                     <Form.Group className="mb-3" controlId="formAdditionalField1">
//                         <Form.Label>Название дороги</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Название"
//                             name="Name"
//                             value={Name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formAdditionalField2">
//                         <Form.Label>Доверительное управление</Form.Label>
//                         <Form.Control
//                             type="number"
//                             placeholder="Доверительное управление"
//                             name="Trustmanagment"
//                             value={Trustmanagment} 
//                             onChange={(e) => setTrustmanagment(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formAdditionalField3">
//                         <Form.Label>Протяженность трассы</Form.Label>
//                         <Form.Control
//                             type="number"
//                             placeholder="Протяженность трассы"
//                             name="Length"
//                             value={Length}
//                             onChange={(e) => setLength(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formAdditionalField4">
//                         <Form.Label>Протяженность платных участков</Form.Label>
//                         <Form.Control
//                             type="number"
//                             placeholder="Протяженность платных участков"
//                             name="Paidlength"
//                             value={Paidlength}
//                             onChange={(e) => setPaidlength(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formAdditionalField5">
//                         <Form.Label>Категория дороги</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Категория дороги"
//                             name="Category"
//                             value={Category}
//                             onChange={(e) => setCategory(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formAdditionalField6">
//                         <Form.Label>Количество полос</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Количество полос"
//                             name="Numberofstripes"
//                             value={Numberofstripes}
//                             onChange={(e) => setNumberofstripes(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formAdditionalField7">
//                         <Form.Label>Скоростной режим</Form.Label>
//                         <Form.Control
//                             type="number"
//                             placeholder="Скоростной режим"
//                             name="Speed"
//                             value={Speed}
//                             onChange={(e) => setSpeed(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formAdditionalField8">
//                         <Form.Label>Цена</Form.Label>
//                         <Form.Control
//                             type="number"
//                             placeholder="Цена"
//                             name="Price"
//                             value={Price}
//                             onChange={(e) => setPrice(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formAdditionalField9">
//                         <Form.Label>Изображение дороги</Form.Label>
//                         <Form.Control
//                             type="file"
//                             name="Image"
//                             onChange={(e) => setImage((e.target as HTMLInputElement).files?.[0] || null)}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formAdditionalField10">
//                         <Form.Label>Начало участка</Form.Label>
//                         <Form.Control
//                             type="number"
//                             placeholder="Начало участка"
//                             name="Startofsection"
//                             value={Startofsection}
//                             onChange={(e) => setStartofsection(e.target.value)}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3" controlId="formAdditionalField11">
//                         <Form.Label>Конец участка</Form.Label>
//                         <Form.Control
//                             type="number"
//                             placeholder="Конец участка"
//                             name="Endofsection"
//                             value={Endofsection}
//                             onChange={(e) => setEndofsection(e.target.value)}
//                         />
//                     </Form.Group>
//                 </Form>
//                 {error && <div className="error-message">{error}</div>}
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>
//                     Закрыть
//                 </Button>
//                 <Button variant="primary" onClick={() => handleEdit(Name, parseInt(Trustmanagment), parseInt(Length), parseInt(Paidlength), Category, Numberofstripes, parseInt(Speed), parseInt(Price), Image, parseInt(Startofsection),parseInt(Endofsection) )}>
//                     Сохранить
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     )
// }

// export default EditConsModal;