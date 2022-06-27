import { Box, Typography } from '@mui/material';
import { headerStyles, typographyTitle } from '@/styles';

export default function HeaderNotes() {
  return (
    <Box sx={headerStyles}>
      <Typography variant="h4" component="h1" gutterBottom sx={typographyTitle}>
        Notes To Do
      </Typography>
    </Box>
  );
}
