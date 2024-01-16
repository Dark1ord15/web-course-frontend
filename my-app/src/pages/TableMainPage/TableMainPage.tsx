import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { RootState } from '../../redux/store';
import Navbar from '../../widgets/Navbar/Navbar';
import Loader from '../../widgets/Loader/Loader';
import Table from 'react-bootstrap/Table';
import { Form, Button, Modal } from 'react-bootstrap';
import { ChangeEvent } from 'react';
import { setMinLenghtFilter } from '../../redux/filterAndActiveRequestID/actions';
import { loginSuccess, setRole } from '../../redux/auth/authSlice';
import axios from 'axios';
import MyBreadcrumbs from '../../widgets/MyBreadcrumbs/MyBreadcrumbs';
import addImg from '../../assets/add-square-svgrepo-com.svg'
// import EditConsModal from '../../Modals/EditConsModal/EditConsModal';
import './styles.css'
// import CreateConsModal from '../../Modals/CreateConsModal/CreateConsModal';

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

const TableMainPage: React.FC = () => {
    const [data, setData] = useState<Data | null>({ requestID: 0, roads: [] });
    const dispatch = useDispatch();
    const minLenghtFilter = useSelector((state: RootState) => state.filterAndActiveId.minLenghtFilter);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    
    const fetchData = async () => {
        console.log(minLenghtFilter)
        try {
            const url = minLenghtFilter ? `/api/roads/?minLength=${minLenghtFilter}` : '/api/roads/';
            let response
            if (!localStorage.getItem("accessToken")) {
                response = await axios.get(url)
            }
            else {
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
        }
    };


    const handleDelete = async (roadId: number) => {
        try {
            await axios.delete(
                `/api/roads/${roadId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            fetchData()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const handleMinLenghtChange = (e: ChangeEvent<HTMLInputElement>) => {
        const minLenghtString = e.target.value !== '' ? parseInt(e.target.value).toString() : '';
        dispatch(setMinLenghtFilter(minLenghtString));
    };

    useEffect(() => {
        fetchData()
        if (window.localStorage.getItem("accessToken")) {
            dispatch(loginSuccess())
        }
        if (window.localStorage.getItem("role")) {
            const roleString = window.localStorage.getItem("role");
            const role = roleString ? parseInt(roleString) : 0;
            dispatch(setRole(role))
        }
    }, [dispatch, minLenghtFilter]);

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
                <Link to="/">Сменить режим просмотра</Link>
                <Form
                    className="d-flex justify-content-center mx-auto"
                    id="search"
                    style={{ width: "30%", minWidth: "300px", marginTop: "0.7%" }}
                >
                    <Form.Control
                        type="search"
                        placeholder="Поиск по минимальной длине"
                        className="me-2"
                        aria-label="Search"
                        value={minLenghtFilter}
                        onChange={handleMinLenghtChange}
                    />
                </Form>

                </div>
                {!data || data?.roads.length === 0 ? <Loader />
                : <div style={{ margin: '2% 2% 0 2%', overflowX: 'auto' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th key={'Name'}>Название</th>
                                <th key={'Trustmanagment'}>Доверительное управление,км</th>
                                <th key={'Lenght'}>Протяженность трассы,км</th>
                                <th key={'Paidlenght'}>Протяженность платных участков,км</th>
                                <th key={'Category'}>Категория дороги</th>
                                <th key={'Numberofstripes'}>Количество полос</th>
                                <th key={'Speed'}>Скоростной режим,км.ч</th>
                                <th key={'Price'}>Цена,руб</th>
                                <th key={'Image'}>Изображение</th>
                                <th key={'Statusroad'}>Статус</th>
                                <th key={'Startofsection'}>Начало участка</th>
                                <th key={'Endofsection'}>Конец участка</th>
                                <th key={'Edit'}>Редактирование</th>
                                <th key={'Delete'}>Удаление</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.roads.map((item, index) => (
                                <tr key={index}>
                                    {Object.values(item).map((value, index) => {
                                        const excludedIndices = [0, 13];
                                        return excludedIndices.includes(index) ? null :
                                            <td key={index}>{value as React.ReactNode}</td>;
                                    }
                                    )}
                                    <td>
                                        <Link to={`roads/${item.Roadid}/edit`}>
                                        <Button variant="primary">
                                            Редактировать
                                        </Button>
                                        </Link>
                                    </td>
                                    <td><Button variant="danger" onClick={() => { handleDelete(item.Roadid) }}>
                                        Удалить
                                    </Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Link className='add-cons' to={"/roads/create"}>
                        <img src={addImg} />
                    </Link>
                </div>}
        </div> 
    );
}

export default TableMainPage;