import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import styles from '../../src/styles/Home.module.css';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" className={styles.footer}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://mui.com/" sx={{ margin: "0 5px" }}>
          Your Website
      </MuiLink>
      {new Date().getFullYear()}.
    </Typography>
  );
}
