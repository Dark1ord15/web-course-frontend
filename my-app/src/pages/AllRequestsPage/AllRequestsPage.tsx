import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRequests } from '../../redux/request/requestActions';
import { RootState } from '../../redux/store';
import Navbar from '../../widgets/Navbar/Navbar';
import Table from 'react-bootstrap/Table';
import Loader from '../../widgets/Loader/Loader';

const AllRequestsPage = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state: RootState) => state.request.data);
  const status = useSelector((state: RootState) => state.request.status);

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

  useEffect(() => {
    dispatch(getAllRequests());
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
  </tr>
))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AllRequestsPage;
