// Filter.tsx
import React, { FC } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface FilterProps {
  options: string[];
  value: string | null;
  onChange: (event: React.ChangeEvent<{}>, value: string | null) => void;
}

const Filter: FC<FilterProps> = ({ options, value, onChange }) => {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      value={value}
      onChange={onChange}
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Colaboradores" />}
    />
  );
};

export default Filter;
