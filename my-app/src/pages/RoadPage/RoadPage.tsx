import Navbar from '../../widgets/Navbar/Navbar';
import MyBreadcrumbs from '../../widgets/MyBreadcrumbs/MyBreadcrumbs';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import testData from '../../data';
import Loader from '../../widgets/Loader/Loader';

interface RoadData {
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
  }
  const RoadPage: React.FC = () => {
    const { id } = useParams();
    let i = 0;

    const [data, setData] = useState<RoadData | null>(null);

    useEffect(() => {
      console.log('ProductPage useEffect is triggered');
      fetchData();
    }, [id]);


    const fetchData = async () => {
        try {
          const response = await axios.get(`/api/roads/${id}`);
          const result = await response?.data;
          setData(result);
        } catch (error) {
            setData(testData.roads[parseInt(id || '0', 10)-1])
          console.error('ошибка при выполнении запроса:', error);
        }
      };
      if (!data) {
        return (
          <Loader/>
        );
      }
    return (
        <div>
            <Navbar />
            <div className="container">
            <MyBreadcrumbs
  paths={[
    { label: 'Главная', url: '/' },
    { label: data?.Name },
  ]}
/>
            <Container style={{ maxWidth: '800px', margin: '20px auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', margin: '0', fontWeight: 'bold', marginBottom: '20px' }}>{data?.Name}</h1>

                <Row>
                    <Col md={6}>
                        <img
                            src={data?.Image}
                            className="card-img-selected"
                            alt={data?.Name}
                            style={{
                                width: '120%',
                                height: 'auto',
                                display: 'block',
                                border: '2px solid #fff',
                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                borderRadius: '8px 8px 8px 8px',
                                marginBottom: '8px',
                            }}
                        />
                    </Col>
                    <Col md={6} style={{ textAlign: 'left' }}>
                        <ul style={{ listStyleType: 'none', padding: '0', textAlign: 'left', fontSize: '1.1rem' }}>
                            <li>В доверительном управлении: {data?.Trustmanagment} км</li>
                            <li>Начало участка: {data?.Startofsection} км</li>
                            <li>Конец участка: {data?.Endofsection} км</li>
                            <li>Протяженность трассы: {data?.Length} км</li>
                            <li>Протяженность платных участков: {data?.Paidlength} км</li>
                            <li>Категория дороги: {data?.Category}</li>
                            <li>Число полос движения: {data?.Numberofstripes}</li>
                            <li>Разрешенная скорость: до {data?.Speed} км/ч</li>
                            <li>Стоимость проезда: {data?.Price} руб</li>
                            {/* <li style={{ textAlign: 'right' }}>
                                <Button variant="primary">Добавить</Button>
                            </li> */}
                        </ul>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
};

export default RoadPage;
