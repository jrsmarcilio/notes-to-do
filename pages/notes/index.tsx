import type { NextPage } from 'next';
import { Fragment } from 'react';
import Container from '@mui/material/Container';

import Annotation from '../../src/components/Annotation';
import Copyright from '../../src/components/Copyright';
import HeaderNotes from '../../src/components/Header';

import { containerStyles } from '../../src/styles/Notes'

const Notes: NextPage = () => {
  return (
    <Fragment>
      <HeaderNotes />
      <Container maxWidth="md" sx={containerStyles}>

        <Annotation />

      </Container>
      <Copyright />
    </Fragment>
  );
};

export default Notes;
