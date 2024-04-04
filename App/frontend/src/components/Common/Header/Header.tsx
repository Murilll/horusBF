import { Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import Button from "@mui/material/Button";
import Brand from "../Brand/Brand";
import "./Style.scss";

export default function Header() {
    const router = useRouter()

    return (
        <>
            <div className="Container_All">
                <Brand />
                <div className="Container_Header">
                    <Typography variant="h4" >
                        BOSCH
                    </Typography>
                    <div className="Container_Button">
                        <Button type="button" onClick={() => router.push('/home')}>
                            Home
                        </Button>
                        <Button type="button" onClick={() => router.push('/registerCollaborator')}>
                            Registrar Colaborador
                        </Button>
                        {/* <Button type="button" onClick={() => router.push('/registerCar')}>
                            Registrar Carro
                        </Button> */}
                    </div>
                </div>
            </div>
        </>
    )
}