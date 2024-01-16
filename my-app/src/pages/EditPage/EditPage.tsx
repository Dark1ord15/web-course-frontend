import { useState, useEffect } from 'react'
import { validateTrustmanagment, validateLength, validatePaidlength, validateSpeed, validatePrice, validateStartofsection, validateEndofsection } from '../../functions/validate/validate'
import Navbar from '../../widgets/Navbar/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./styles.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Data {
  requestID: number;
  roads: {
      Roadid: number;
      Name: string;
      Trustmanagment: number;
      Length: number;
      Paidlength: number;
      Category: string;
      Numberofstripes: string;
      Speed: number;
      Price: number;
      Image: string;
      Statusroad: string;
      Startofsection: number;
      Endofsection: number;
  }[];

}

const EditPage = () => {
    const [data, setData] = useState<Data | null>({ requestID: 0, roads: [] });
    const { roadId } = useParams();
    const parsedId = roadId ? parseInt(roadId) : 0;
    const [Name, setName] = useState("");
    const [Trustmanagment, setTrustmanagment] = useState("");
    const [Length, setLength] = useState("");
    const [Paidlength, setPaidlength] = useState("");
    const [Category, setCategory] = useState("");
    const [Numberofstripes, setNumberofstripes] = useState("");
    const [Speed, setSpeed] = useState("");
    const [Price, setPrice] = useState("");
    const [Image, setImage] = useState<File | null>(null);
    const [Startofsection, setStartofsection] = useState("");
    const [Endofsection, setEndofsection] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const url = '/api/roads/';
            let response;
            if (!localStorage.getItem("accessToken")) {
                response = await axios.get(url);
            } else {
                response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
            }
            const result = response?.data;
            console.log(result);
            setData(result);
        } catch (error) {
            console.error('ошибка при выполнении запроса:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleEdit = async (Name: string, Trustmanagment: string, Length: string, Paidlength: string, Category: string, Numberofstripes: string,  Speed: string, Price: string, Image: File | null, Startofsection: string, Endofsection: string, ) => {
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
            await axios.put(
                `/api/roads/${roadId}`,
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
            if (Image) {
              let formData = new FormData();
              formData.append('image', Image)
              try {
                  await axios.put(`/api/roads/road_add_image/${roadId}`, 
                      formData,
                       {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                      },
                  });
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          }
            navigate('/')
        } catch (error) {
            setError('Ошибка в вводе данных')
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        if (loading) {
            setName("");
            setTrustmanagment("");
            setLength("");
            setPaidlength("");
            setCategory("");
            setNumberofstripes("");
            setSpeed("");
            setPrice("");
            setStartofsection("");
            setEndofsection("");
            fetchData();
        } else {
            const road = data?.roads.find(item => item.Roadid === parsedId);
            console.log(road)
            console.log(parsedId)
            if (road) {
                setName(road.Name || "");
                setTrustmanagment(road.Trustmanagment?.toString() || "");
                setLength(road.Length?.toString() || "");
                setPaidlength(road.Paidlength?.toString() || "");
                setCategory(road.Category || "");
                setNumberofstripes(road.Numberofstripes || "");
                setSpeed(road.Speed?.toString() || "");
                setPrice(road.Price?.toString() || "");
                setStartofsection(road.Startofsection?.toString() || "");
                setEndofsection(road.Endofsection?.toString() || "");
            }
        }
    }, [error, data ]);

console.log(Name, Trustmanagment, Length, Paidlength, Category, Numberofstripes, Speed,Price,Startofsection,Endofsection)

    return (
        <div>
            <Navbar />
            <div style={{ marginLeft: "5%", marginTop: "1%" }}>
                <Link to="/main-page/admin" style={{ textDecoration: 'none' }}>Главная </Link>
                <Link to="#" style={{ textDecoration: 'none', color: 'grey' }}>
                    / Редактирование дороги
                </Link>
            </div>
            <div className='container create-page'>
                <h1 className='small-h1'>Редактирование дороги</h1>
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
                        <Form.Label>Изображение дороги</Form.Label>
                        <Form.Control
                            type="file"
                            name="Image"
                            onChange={(e) => setImage((e.target as HTMLInputElement).files?.[0] || null)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField10">
                        <Form.Label>Начало участка</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Начало участка"
                            name="Startofsection"
                            value={Startofsection}
                            onChange={(e) => setStartofsection(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formAdditionalField11">
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
                <Button variant="primary" onClick={() => handleEdit(Name, Trustmanagment, Length, Paidlength, Category, Numberofstripes, Speed, Price, Image, Startofsection, Endofsection )}>
                    Редактировать
                </Button>
            </div>
        </div>
    )
}

export default EditPage;