import { useState, useEffect } from 'react'
import { validateName, validateTrustmanagment, validateLength, validatePaidlength, validateCategory,validateNumberofstripes,  validateSpeed, validatePrice, validateStartofsection, validateEndofsection } from '../../functions/validate/validate'
import Navbar from '../../widgets/Navbar/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./styles.css"
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';



const CreateConsModal = () => {
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
    const navigate = useNavigate();



    const handleEdit = async (Name: string, Trustmanagment: string, Length: string, Paidlength: string, Category: string, Numberofstripes: string,  Speed: string, Price: string, Startofsection: string, Endofsection: string, ) => {
        if (!validateName(Name)) {
          setError('Введите название!')
          return
      }

      if (Trustmanagment) {
            if (!validateTrustmanagment(Trustmanagment)) {
                setError('Неправильный ввод доверительного управления!')
                return
            }
        }
        const parsedTrustmanagment = parseInt(Trustmanagment);

        if (Length) {
          if (!validateLength(Length)) {
              setError('Неправильный ввод протяженности трассы!')
              return
          }
        }
        const parsedLength = parseInt(Length);

        if (Paidlength) {
          if (!validatePaidlength(Paidlength)) {
              setError('Неправильный ввод протяженности платных участков!')
              return
          }
        }
        const parsedPaidlength = parseInt(Paidlength);

        if (!validateCategory(Category)) {
          setError('Введите категорию трассы!')
          return
       }  

       if (!validateNumberofstripes(Numberofstripes)) {
        setError('Введите количество полос!')
        return
      }  

        if (Speed) {
          if (!validateSpeed(Speed)) {
              setError('Неправильный ввод скоростного режима!')
              return
          }
        }
        const parsedSpeed = parseInt(Speed);

        if (Price) {
            if (!validatePrice(Price)) {
                setError('Неправильный ввод цены!')
                return
            }
        }
        const parsedPrice = parseInt(Price);

        if (Startofsection) {
          if (!validateStartofsection(Startofsection)) {
              setError('Неправильный ввод начала участка!')
              return
          }
        }
        const parsedStartofsection = parseInt(Startofsection);

        if (Endofsection) {
          if (!validateEndofsection(Endofsection)) {
              setError('Неправильный ввод конца участка!')
              return
          }
        }
        const parsedEndofsection = parseInt(Endofsection);
        try {
            await axios.post(
                `/api/roads/`,
                {
                    "Name": Name,
                    "Trustmanagment": parsedTrustmanagment,
                    "Length": parsedLength,
                    "Paidlength": parsedPaidlength,
                    "Category": Category,
                    "Numberofstripes": Numberofstripes,
                    "Speed": parsedSpeed,
                    "Price": parsedPrice,
                    "Startofsection": parsedStartofsection,
                    "Endofsection": parsedEndofsection
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            navigate('/')
        } catch (error) {
            setError('Уже есть дорога с таким названием!')
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {

    }, [error])



    return (
        <div>
            <Navbar />
            <div style={{ marginLeft: "5%", marginTop: "1%" }}>
                <Link to="/main-page/admin" style={{ textDecoration: 'none' }}>Главная </Link>
                <Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
                    / Создание дороги
                </Link>
            </div>
            <div className='container create-page'>
                <h1 className='small-h1'>Создание дороги</h1>
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
                <Button variant="primary" onClick={() => handleEdit(Name, Trustmanagment, Length, Paidlength, Category, Numberofstripes, Speed, Price,  Startofsection, Endofsection )}>
                    Создать
                </Button>
            </div>
        </div>
    )
}

export default CreateConsModal; // Важно: экспорт с ключевым словом default
  