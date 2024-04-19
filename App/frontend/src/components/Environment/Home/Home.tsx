import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Brand from '@/components/Common/Brand/Brand';
import Dashboards from '../Dashboards/Dashboards';
import Filter from './Filter/Filter';
import CarTable from './CarTable/CarTable';

import "./Style.scss";

interface Car {
  id: string;
  edv: string;
  name: string;
  car: string;
  color: string;
  licensePlate: string;
  In: string;
  out: string;
  status: string;
}

const BasicTable = () => {
  const [colcar, setColCar] = useState<Car[]>([]);
  const [nameFilter, setNameFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Car[]>('http://localhost:5293/api/InAndOut');
        setColCar(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Lógica para criar as linhas da tabela
  const rows = colcar.filter(row => !nameFilter || row.name.toLowerCase().includes(nameFilter.toLowerCase()));

  const getUniqueNames = () => {
    return Array.from(new Set(colcar.map(row => row.name)));
  };

  return (
    <div className="Big_Container">
      <div className="Filter_By_Name">
        <Filter
          value={nameFilter}
          onChange={(event: React.ChangeEvent<{}>, newValue: string | null) => {
            setNameFilter(newValue);
          }}
          options={getUniqueNames()}
        />
      </div>

      <Dashboards />

      <CarTable rows={rows} />
    </div>
  );
};

export default BasicTable;
