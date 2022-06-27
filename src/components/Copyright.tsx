import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import styles from '@/styles/Home.module.css';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" className={styles.footer}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://github.com/jrsmarcilio/notes-to-do" sx={{ margin: "0 5px" }}>
          Your Github
      </MuiLink>
      {new Date().getFullYear()}.
    </Typography>
  );
}
