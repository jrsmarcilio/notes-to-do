import React from 'react';
import { Box, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import { headerStyles, typographyTitle } from '@/styles';
import NoteContext from '@/context/notes';
import MenuIcon from '@mui/icons-material/Menu';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useRouter } from 'next/router';

export default function HeaderNotes() {
  const router = useRouter();
  const { clearCompletedTask } = React.useContext(NoteContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const onClearCompletedTask = () => {
    clearCompletedTask();
    handleClose();
  };
  return (
    <Box sx={headerStyles}>
      <IconButton color="primary" onClick={() => router.reload()}>
        <RefreshIcon />
      </IconButton>

      <Typography variant="h4" component="h1" gutterBottom sx={typographyTitle}>
        Notes To Do
      </Typography>

      <div>
        <IconButton
          color="primary"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ 'aria-labelledby': 'basic-button' }}
        >
          <MenuItem onClick={onClearCompletedTask}>
            Clear completed tasks
          </MenuItem>
        </Menu>
      </div>
    </Box>
  );
}
