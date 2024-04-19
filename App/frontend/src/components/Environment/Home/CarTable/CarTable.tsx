import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

interface Row {
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

interface CarTableProps {
  rows: Row[];
}

const CarTable: React.FC<CarTableProps> = ({ rows }) => {
  return (
    <TableContainer sx={{ maxHeight: '100%' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{
          backgroundColor: "white",
          fontSize: 96
        }}>
          <TableRow>
            <TableCell><Typography variant="h6">EDV</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">NOME</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">CARRO</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">COR</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">LICENSE PLATE</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">IN</Typography></TableCell>
            <TableCell align="left"><Typography variant="h6">OUT</Typography></TableCell>
            <TableCell align="center"><Typography variant="h6">STATUS</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.edv}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.car}</TableCell>
              <TableCell align="left">{row.color}</TableCell>
              <TableCell align="left">{row.licensePlate}</TableCell>
              <TableCell align="left">{row.In}</TableCell>
              <TableCell align="left">{row.out}</TableCell>
              <TableCell align="center">
                {row.status === "Saiu" ? (
                  <div className="Ctn_Status">
                    <div className="Ctn_Status_Exit">
                      {row.status}
                    </div>
                    <div className="Ctn_Status_Exit_Circle">
                      .
                    </div>
                  </div>
                ) : (
                  row.status === "Entrou" ? (
                    <div className="Ctn_Status">
                      <div className="Ctn_Status_In">
                        {row.status}
                      </div>
                      <div className="Ctn_Status_In_Circle">
                        .
                      </div>
                    </div>
                  ) : (
                    <div className="Ctn_Status">
                      <div className="Ctn_Status_Unknow">
                        {row.status}
                      </div>
                      <div className="Ctn_Status_Unknow_Circle">
                        .
                      </div>
                    </div>
                  )
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CarTable;
