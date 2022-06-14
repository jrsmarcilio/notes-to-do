import type { NextPage } from 'next';
import React, { Fragment, useState } from 'react';

import { Add } from '@mui/icons-material';
import { Card, CardActions, IconButton, TextField, Container } from '@mui/material';
import { Alert } from '@mui/material';

import { v4 } from 'uuid';
import Annotation from '../../src/components/Annotation';
import Copyright from '../../src/components/Copyright';
import HeaderNotes from '../../src/components/Header';
import { InputsNotes } from '../../src/interfaces';
import { cardStyles } from '../../src/styles/components/Annotation';
import { containerStyles } from '../../src/styles/Notes';

const Notes: NextPage = () => {
  const [inputName, setInputName] = useState("");

  const [notes, setNotes] = useState<InputsNotes[]>([]);

  const handleInputNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setInputName(name);
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputName !== "") {
      setNotes([{ id: v4(), name: inputName }, ...notes]);
      setInputName("");
    }
  }

  return (
    <Fragment>
      <HeaderNotes />
      <Container maxWidth="md" sx={containerStyles}>
        {notes.map((note: InputsNotes) => <Annotation key={note.id} annotation={note} />)}

        <Card sx={cardStyles}>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites"><Add /></IconButton>
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

export default Notes;
