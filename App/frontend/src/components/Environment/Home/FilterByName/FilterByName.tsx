import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FilterByName(colcar) {
    const collaboratorFilter = [''];

    console.log(colcar)
    const rows = [];

    const [nameFilter, setNameFilter] = useState<string | null>(collaboratorFilter[0]);

    for (let index = 0; index < colcar.length; index++) {

        if (colcar[index].collaborator.name) {
            collaboratorFilter.push(colcar[index].collaborator.name)
            console.log(collaboratorFilter)
        }

        let filterLower = nameFilter != null ? nameFilter.toLowerCase() : '';

        let nameLower = colcar[index].collaborator.name.toLowerCase();

        if (nameLower.includes(filterLower)) {
            colcar.push(
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
        }
    }

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={nameFilter}
                onChange={(event: any, newValue: string | null) => {
                    setNameFilter(newValue);
                }}
                options={collaboratorFilter}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Colaboradores" />}
            />
        </>
    )
}