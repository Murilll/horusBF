import { Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import Button from "@mui/material/Button";
import Brand from "../Brand/Brand";
import Logo from "../Logo/Logo";
import "./Style.scss";
import AccessibleTabs from "../AccessibleTabs/AccessibleTabs";

export default function Header() {
    const router = useRouter()

    return (
        <>
            <div className="Container_All">
                <Brand />
                <div className="Container_Header">
                    <Logo />
                    <div className="Container_Button">
                        <AccessibleTabs />
                    </div>
                </div>
            </div>
        </>
    )
}