import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRequests } from '../../redux/request/requestActions';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import Navbar from '../../widgets/Navbar/Navbar';
import Table from 'react-bootstrap/Table';
import Loader from '../../widgets/Loader/Loader';
import { loginSuccess, setRole } from '../../redux/auth/authSlice';
const AllRequestsPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state: RootState) => state.request.data);

  const formattedTime = (timestamp: string) => {
    if (timestamp.includes('0001-01-01')) {
      return "Не установлено";
    }
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedDate = new Date(timestamp).toLocaleDateString('ru-RU', options);

    return formattedDate;
  };
  const fetchData = async () => {
    try {
      await dispatch(getAllRequests());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
    if (window.localStorage.getItem("accessToken")) {
      dispatch(loginSuccess())
    }
    if (window.localStorage.getItem("role")) {
      const roleString = window.localStorage.getItem("role");
      const role = roleString ? parseInt(roleString) : 0;
      dispatch(setRole(role))
    }
    const pollingInterval = setInterval(() => {
      fetchData();
    }, 5000);
    return () => {
      clearInterval(pollingInterval);
    };
  }, [dispatch]);

  if (!requests || requests.length === 0) {
    return (
      <>
        <Navbar />
        <Loader />
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ margin: '10% 10% 0 10%' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th key={'Requeststatus'}>Статус заявки</th>
              <th key={'Creationdate'}>Дата создания</th>
              <th key={'Formationdate'}>Дата формирования</th>
              <th key={'Сomletiondate'}>Дата завершения</th>
              <th key={'Paidstatus'}>Статус оплаты</th>
              <th key={'more'}>Подробнее</th>
            </tr>
          </thead>
          <tbody>
          {requests.map((request, index) => (
  <tr key={index}>
    {Object.values(request).map((value, columnIndex) => {
      const excludedIndices = [0, 1, 6];
      const timeRows = [3, 4, 5];
      const paymentStatusColumnIndex = 7;
      
      if (excludedIndices.includes(columnIndex)) {
        return null;
      } else if (timeRows.includes(columnIndex)) {
        return <td key={columnIndex}>{formattedTime(value as string) as React.ReactNode}</td>;
      } else if (columnIndex === paymentStatusColumnIndex) {
        // Проверка, является ли текущий столбец (статус оплаты)
        const isPaymentStatusColumn = columnIndex === paymentStatusColumnIndex;
        
        // Если текущий столбец - статус оплаты и значение пусто, возвращаем "Не оплачено"
        return <td key={columnIndex}>{isPaymentStatusColumn && !value ? 'Не оплачено' : value as React.ReactNode}</td>;
      } else {
        return <td key={columnIndex}>{value as React.ReactNode}</td>;
      }
      
    })}
  <td><Link to={`/request/${request.Travelrequestid}`}>Подробнее</Link></td>
  </tr>
))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllRequestsPage;
