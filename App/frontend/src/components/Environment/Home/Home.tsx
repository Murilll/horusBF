import * as React from 'react';
import Table from "./Tablee/Tablee";
import { useRouter } from 'next/navigation'
import { Button } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from 'react';

import "./Style.scss";

export default function Home() {
    const router = useRouter()

    async function teste() {
        const data = {
            LicensePlate: "654teste"
        }

        const res = await axios.post(`http://localhost:5293/api/InAndOut?LicensePlate=${data.LicensePlate}`)
        console.log(res.data)
    }

    return (
        <>
            <div className="Container_Home">
                <div className="Container_Table">
                    <Table />
                </div>
            </div>
        </>
    )
}