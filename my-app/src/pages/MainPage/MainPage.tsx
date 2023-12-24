    import './MainPage.css'
    import Navbar from '../../widgets/Navbar/Navbar'
    import Card from '../../widgets/Card/Card'
    import { Link, useNavigate } from 'react-router-dom';
    import Form from 'react-bootstrap/Form';
    import { ChangeEvent } from 'react';
    import { useState, useEffect } from 'react'
    // import Breadcrumb from 'react-bootstrap/Breadcrumb';
    import testData from '../../data';
    import MyBreadcrumbs from '../../widgets/MyBreadcrumbs/MyBreadcrumbs';
    import { useDispatch, useSelector } from 'react-redux';
    import { setActiveRequestID, setMinLenghtFilter } from '../../redux/filterAndActiveRequestID/actions';
    import { loginSuccess, loginFailure, setRole } from '../../redux/auth/authSlice';
    import { RootState } from '../../redux/store';
    import CartImg from '../../assets/cart-check-svgrepo-com.svg';
    import EmptyCartImg from '../../assets/cart-cross-svgrepo-com.svg'
    import axios from 'axios';
    import './MainPage.css'

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

    const MainPage: React.FC = () => {
        const [data, setData] = useState<Data | null>({ requestID: 0, roads: [] });
        const dispatch = useDispatch();
        const minLenghtFilter = useSelector((state: RootState) => state.filterAndActiveId.minLenghtFilter);
        const activeRequest = useSelector((state: RootState) => state.filterAndActiveId.activeRequestID);
        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
        const fetchData = async () => {
            console.log(minLenghtFilter);
            try {
                const url = minLenghtFilter ? `/api/roads/?minLength=${minLenghtFilter}` : '/api/roads/';
                const headers: Record<string, string> = {};
                
                // Добавьте заголовок Authorization только если есть токен
                const accessToken = localStorage.getItem("accessToken");
                if (accessToken) {
                    headers.Authorization = `Bearer ${accessToken}`;
                }
        
                const response = await fetch(url, { headers });
        
                if (!response.ok) {
                    throw new Error(`Ошибка при выполнении запроса: ${response.statusText}`);
                }
        
                const result = await response.json();
                localStorage.setItem("ActiveRequestId", result?.requestID?.toString() || '');
                dispatch(setActiveRequestID(result?.requestID));
                console.log(result); // Проверьте, что данные приходят корректно
                setData(result);
            } catch (error) {
                console.log(testData);
                const result = { ...testData }; // Создаем копию оригинальных данных
                if (minLenghtFilter) {
                    result.roads = testData.roads.filter((roads) => roads.Endofsection - roads.Startofsection >= parseInt(minLenghtFilter));
                }
                setData(result);
                console.error('ошибка при выполнении запроса:', error);
            }
        };
        
        

        const handleMinLenghtChange = (e: ChangeEvent<HTMLInputElement>) => {
            const minLenghtString = e.target.value !== '' ? parseInt(e.target.value).toString() : '';
            dispatch(setMinLenghtFilter(minLenghtString));
        };
        const buttonAddClicked = () => {
            if (!activeRequest) {
                fetchData()
            }
        }
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

                    <div className="row">
                        {data?.roads?.map((item) => (
                            <div key={item.Roadid} className="col-lg-4 col-md-4 col-sm-12">
                                <Card
                                    id={item.Roadid}
                                    name={item.Name}
                                    image={item.Image}
                                    price={item.Price}
                                    buttonAddClicked={buttonAddClicked}
                                />
                            </div>
                        ))}
                    </div>
                    {isAuthenticated ?
                        activeRequest ?
                            <Link className='cart' to='/shopping-cart'>
                                <img src={CartImg} />
                            </Link> :
                            <Link className='cart empty' to='/shopping-cart' >
                                <img src={EmptyCartImg} />
                            </Link>
                        : null
    }
                </div>
            </div>
        )

    }

    export default MainPage 