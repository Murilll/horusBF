import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

export default function AccessibleTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const router = useRouter()

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        onChange={handleChange}
        value={value}
        aria-label="Tabs where selection follows focus"
        selectionFollowsFocus
      >
        <Tab label="Home" onClick={() => router.push('/home')} />
        <Tab label="Registrar Colaborador" onClick={() => router.push('/registerCollaborator')} />
        <Tab label="Dashboard" onClick={() => router.push('/dashboards')} />
      </Tabs>
    </Box>
  );
}