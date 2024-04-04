import { TextField, Box } from '@mui/material/';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import axios from 'axios';
import Button from '@mui/material/Button';

const teste = () => {
    axios({
        method: "get",
        url: "http://localhost:5293/collaborator/teste",
    });
}

export default function RegisterCar() {
    return (
        <div className="Container">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                
                <TextField style={{ width: '35rem' }} label="EDV" />
                <TextField style={{ width: '35rem' }} label="Nome do colaborador" />
                <TextField style={{ width: '35rem' }} label="Carro" />
                <TextField style={{ width: '35rem' }} label="Cor" />
                <TextField style={{ width: '35rem' }} label="Placa" />

                <Button style={{ width: '35rem' }} variant="contained" onClick={() => teste()}>
                    Send
                </Button>
            </Box>
        </div>
    )
}