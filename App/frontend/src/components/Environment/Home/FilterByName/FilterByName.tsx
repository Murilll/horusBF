import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FilterByName(data) {
    const collaboratorFilter = [''];

    // console.log(data)
    const rows = [];

    const [nameFilter, setNameFilter] = useState<string | null>(collaboratorFilter[0]);

    for (let index = 0; index < data.length; index++) {

        console.log(data[index].collaborator.name)

        if (data[index].collaborator.name) {
            collaboratorFilter.push(data[index].collaborator.name)
            console.log(collaboratorFilter)
        }

        let filterLower = nameFilter != null ? nameFilter.toLowerCase() : '';

        let nameLower = data[index].collaborator.name.toLowerCase();

        if (nameLower.includes(filterLower)) {
            data.push(
                data[index].id,
                data[index].collaborator.edv,
                data[index].collaborator.name,
                data[index].car.name,
                data[index].car.color,
                data[index].car.licensePlate,
                In,
                Out,
                data[index].status
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