import { TextField, Box } from '@mui/material/';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';

import './Style.scss';
import BasicAlerts from './BasicAlerts/BasicAlerts';

export default function RegisterCollaborator() {
    const router = useRouter()

    const [name, setName] = useState("")
    const [edv, setEDV] = useState("")
    const [car, setCar] = useState("")
    const [color, setColor] = useState("")
    const [plate, setPlate] = useState("")
    const [collaboratorId, setCollaboratorId] = useState("")

    const [isActive, setActive] = useState(false)

    const handleClick = () => {
        router.push('/registerCollaborator');
    };

    const send = async () => {
        const Collaborator = {
            Name: name,
            EDV: edv,
        };
        const res = await axios.post("http://localhost:5293/api/Collaborators", Collaborator);

        await setCollaboratorId(res.data.id)

        const Car = {
            Name: car,
            Color: color,
            LicensePlate: plate,
            CollaboratorId: collaboratorId
        };
        const res2 = await axios.post("http://localhost:5293/api/Cars", Car);

        handleClick()

        setActive(true)

        const timer = setTimeout(() => {
            setActive(false);
            setName("")
            setEDV("")
            setCar("")
            setColor("")
            setPlate("")
            setCollaboratorId("")
        }, 2000);
    }

    return (
        <>
            <div className='Container'>
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
                    <TextField style={{ width: '35rem' }} label="EDV" onChange={e => setEDV(e.target.value)} />
                    <TextField style={{ width: '35rem' }} label="Nome do colaborador" onChange={e => setName(e.target.value)} />
                    <TextField style={{ width: '35rem' }} label="Carro" onChange={e => setCar(e.target.value)} />
                    <TextField style={{ width: '35rem' }} label="Cor" onChange={e => setColor(e.target.value)} />
                    <TextField style={{ width: '35rem' }} label="Placa" onChange={e => setPlate(e.target.value)} />

                    <Button style={{ width: '35rem' }} variant="contained" onClick={() => send()}>
                        Enviar
                    </Button>
                </Box>
            </div>
            <div className="Alert">
                {isActive && <BasicAlerts />}
            </div>
        </>
    )
}