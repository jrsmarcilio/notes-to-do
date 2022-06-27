import type { NextPage } from 'next';
import React, { Fragment, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Add } from '@mui/icons-material';
import { Card, CardActions, IconButton, TextField, Container, Tooltip } from '@mui/material';

import Annotation from '@/components/Annotation';
import Copyright from '@/components/Copyright';
import HeaderNotes from '@/components/Header';
import { INotes } from '@/interfaces';
import { cardStyles } from '@/styles';
import { containerStyles } from '@/styles';
import NoteContext from '@/context/notes';


const Home: NextPage = () => {
  const [inputName, setInputName] = useState("");
  const { syncNotes, addNote } = React.useContext(NoteContext);

  const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setInputName(name);
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputName !== "") {
      addNote({ id: uuid(), isActive: 0, name: inputName });
      setInputName("");
    }
  }

  return (
    <Fragment>
      <HeaderNotes />
      <Container maxWidth="md" sx={containerStyles}>
        {syncNotes.map((note: INotes, index: number) => <Annotation key={index} annotation={note} />)}

        <Card sx={cardStyles}>
          <CardActions disableSpacing>
            <Tooltip title="New annotation" placement='left-start'>
              <IconButton><Add /></IconButton>
            </Tooltip>
            <TextField
              value={inputName}
              onChange={handleInputNameChange}
              onKeyPress={handleKeyPress}
              variant="outlined"
              InputProps={{ style: { height: 35 } }}
            />
          </CardActions>
        </Card>

      </Container>
      <Copyright />
    </Fragment>
  );
};

export default Home;
