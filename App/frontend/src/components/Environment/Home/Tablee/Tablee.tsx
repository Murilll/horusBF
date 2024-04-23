import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useCallback, useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import Brand from '@/components/Common/Brand/Brand';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dashboards from '../Dashboards/Dashboards';

import "./Style.scss";

export default function BasicTable() {
  const [colcar, setColCar] = useState<any[]>([]);

  const collaboratorFilter = [""];
  const statusListFilter = [""];

  const [nameFilter, setNameFilter] = useState<string | null>(collaboratorFilter[0]);
  const [statusFilter, setStatusFilter] = useState<string | null>(statusListFilter[0]);

  function createData(
    id: string,
    edv: string,
    name: string,
    car: string,
    color: string,
    licensePlate: string,
    In: string,
    out: string,
    status: string
  ) {
    return { id, edv, name, car, color, licensePlate, In, out, status };
  }

  const rows = [];

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

    if (colcar[index].collaborator.name) {
      collaboratorFilter.push(colcar[index].collaborator.name)
    }

    if (colcar[index].car == null) {
      colcar[index].car = {
        name: "...",
        color: "...",
      }
      colcar[index].collaborator = {
        edv: "...",
        name: "...",
      }
      colcar[index].status = colcar[index].status;
      colcar[index].car.licensePlate = colcar[index].licensePlateUnknown;
    }

    var dateIn = colcar[index].in;
    var dateInFormated = new Date(dateIn)
    var In = dateInFormated.getDate() + "/" + dateInFormated.getMonth() + "/" + dateInFormated.getFullYear() + "," + "  " + dateInFormated.getHours() + ":" + dateInFormated.getMinutes() + ":" + dateInFormated.getSeconds();

    var dateOut = colcar[index].out;
    var dateOutFormated = new Date(dateOut)
    var Out = dateOutFormated.getDate() + "/" + dateOutFormated.getMonth() + "/" + dateOutFormated.getFullYear() + "," + "  " + dateOutFormated.getHours() + ":" + dateOutFormated.getMinutes() + ":" + dateOutFormated.getSeconds();

    if (colcar[index].out <= "0001-01-01T00:00:00Z") {
      Out = "..."
    }

    let filterLower = nameFilter != null ? nameFilter.toLowerCase() : '';
    let filterStatus = statusFilter != null ? statusFilter : "";

    let nameLower = colcar[index].collaborator.name.toLowerCase();
    let statusLower = colcar[index].status;

    if (nameLower.includes(filterLower) && statusLower.includes(filterStatus)) {
      rows.push(createData(
        colcar[index].id,
        colcar[index].collaborator.edv,
        colcar[index].collaborator.name,
        colcar[index].car.name,
        colcar[index].car.color,
        colcar[index].car.licensePlate,
        In,
        Out,
        colcar[index].status
      )
      )
    }
  }

  var nomesSet = new Set(collaboratorFilter);
  const uniqueItemsArray = Array.from(nomesSet);

  return (
    <div className="Big_Container">
      <div className="Filter_By_Name">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={nameFilter}
          onChange={(event: any, newValue: string | null) => {
            setNameFilter(newValue);
          }}
          options={uniqueItemsArray}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Colaboradores" />}
        />
      </div>

      <div className="Filter_By_Name">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          value={statusFilter}
          onChange={(event: any, newValue: string | null) => {
            setStatusFilter(newValue);
          }}
          options={["Entrou", "Saiu", "Carro não cadastrado"]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Status" />}
        />
      </div>

      <Dashboards />

      <TableContainer sx={{ maxHeight: '100%' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{
            backgroundColor: "white",

            fontSize: 96
          }}>
            <TableRow>
              <TableCell>
                <Typography variant="h6">EDV</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">NOME</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">CARRO</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">COR</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">LICENSE PLATE</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">IN</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">OUT</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">STATUS</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.edv}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.car}</TableCell>
                <TableCell align="left">{row.color}</TableCell>
                <TableCell align="left">{row.licensePlate}</TableCell>
                <TableCell align="left">{row.In}</TableCell>
                <TableCell align="left">{row.out}</TableCell>
                <TableCell align="center">
                  {row.status == "Saiu" ? (
                    <div className="Ctn_Status">
                      <div className="Ctn_Status_Exit">
                        {row.status}
                      </div>
                      <div className="Ctn_Status_Exit_Circle">
                        .
                      </div>
                    </div>
                  ) : (
                    row.status == "Entrou" ? (
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
      </TableContainer >
    </div>
  );
}