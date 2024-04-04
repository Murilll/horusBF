import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Brand from '@/components/Common/Brand/Brand';

import "./Style.scss";

export default function BasicTable() {
  const [colcar, setColCar] = useState<any[]>([]);

  function createData(
    edv: string,
    name: string,
    car: string,
    color: string,
    licensePlate: string,
    In: string,
    out: string,
    status: string
  ) {
    return { edv, name, car, color, licensePlate, In, out, status };
  }

  const rows = [

  ];

  const handleGetCollaboratorsAndCars = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5293/api/InAndOut');
      setColCar(response.data)
    }
    catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5293')

    ws.addEventListener('open', () => {
      ws.send('Hello Server!');
    })

    ws.addEventListener('message', (event) => {
      handleGetCollaboratorsAndCars();
    });
  }, []);

  for (let index = 0; index < colcar.length; index++) {
    var dateIn = colcar[index].in;
    dateIn = dateIn.split('T');

    var hour = dateIn[1]

    rows.push(createData(
      colcar[index].collaborator.edv,
      colcar[index].collaborator.name,
      colcar[index].car.name,
      colcar[index].car.color,
      colcar[index].car.licensePlate,
      dateIn[0] + ", " + hour,
      colcar[index].out,
      colcar[index].status
    )
    )
  }

  return (
    <TableContainer sx={{ maxHeight: '100%' }} component={Paper}>
      <Brand />
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>EDV</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Car</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">License Plate</TableCell>
            <TableCell align="right">In</TableCell>
            <TableCell align="right">Out</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.edv}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.edv}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.car}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.licensePlate}</TableCell>
              <TableCell align="right">{row.In}</TableCell>
              <TableCell align="right">{row.out}</TableCell>
              <TableCell align="right">
                <div className={row.status == "Saiu" ? "Ctn_Status_Exit" : "Ctn_Status_In"}>
                  {row.status}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer >
  );
}