import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function PrioritySelectComponentUI() {
  const [priority, setPriority] = React.useState('none');

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Priority:</InputLabel>
        <Select
          id="demo-simple-select"
          value={priority}
          onChange={handleChange}
        >
          <MenuItem value={10}>None</MenuItem>
          <MenuItem value={20}>Low</MenuItem>
          <MenuItem value={30}>Medium</MenuItem>
          <MenuItem value={40}>High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
