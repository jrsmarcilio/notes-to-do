import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { headerStyles, typographyTitle } from '../../src/styles/components/Header'

export default function HeaderNotes() {
  return (
    <Box sx={headerStyles}>
      <Typography variant="h4" component="h1" gutterBottom sx={typographyTitle}>
        Notes To Do
      </Typography>
    </Box>
  );
}
