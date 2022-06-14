import moment from 'moment';
import React from 'react';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import Add from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Grid, TextField, Box, Button, Card, CardActions, CardContent, Collapse, FormControl, IconButton, MenuItem, Select, Stack, Typography, styled, Alert, AlertTitle } from '@mui/material';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ExpandMoreProps, InputsNotes, priorityEnum } from '../interfaces';
import { cardStyles } from '../styles/components/Annotation';
import { api } from '../services/api';

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ annotation }: { annotation: InputsNotes }) {
  const [expanded, setExpanded] = React.useState(false);
  const [toastAlert, setToastAlert] = React.useState({ show: false, message: '', success: false });
  const [noteData, setNoteData] = React.useState<InputsNotes>();

  const handleExpandClick = () => setExpanded(!expanded);


  const { register, handleSubmit, watch, control, setValue, getValues, formState: { errors } } = useForm<InputsNotes>({
    defaultValues: {
      dueDate: new Date(Date.now()),
      priority: "none"
    }
  });

  React.useEffect(() => {
    console.log('exect useEffect')
    async function fetchNote() {
      await api.post('notes', noteData)
        .then((result: any) => setToastAlert({ show: true, message: result.message, success: true }))
        .catch((error: any) => setToastAlert({ show: true, message: error.message, success: false }));
    }
    if (noteData?.id && toastAlert.show) fetchNote();

  }, [noteData])

  const onSubmit: SubmitHandler<InputsNotes> = async (data: InputsNotes) => {
    data.dueDate = moment(data.dueDate).format('YYYY-MM-DD');
    setNoteData(data);
  }

  // Change Values
  setValue("id", annotation.id);
  setValue("name", annotation.name);


  return (
    <React.Fragment>

      {
        toastAlert.show && toastAlert.success
          ? <Alert severity="success"><AlertTitle>Success</AlertTitle>{toastAlert.message}</Alert>
          : <Alert severity="error"><AlertTitle>Error</AlertTitle>{toastAlert.message}</Alert >
      }

      <Card sx={cardStyles}>

        <CardActions disableSpacing>

          <IconButton aria-label="add to favorites">
            <Add />
          </IconButton>

          <TextField
            {...register("name")}
            defaultValue={getValues("name")}
            id="outlined-name"
            variant="outlined"
            InputProps={{ style: { height: 35 } }}
          />

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >

            <Grid container spacing={2}>

              <Grid item xs={6}>
                <Typography paragraph>Notes</Typography>
                <TextField
                  id='outlined-notes'
                  multiline
                  rows={9}
                  fullWidth
                  {...register("notes")}
                  defaultValue={getValues("notes")}
                />
              </Grid>

              <Grid container item xs={6} direction="row">

                <Grid item xs={12}>
                  <Typography paragraph>Due Date</Typography>

                  <Controller
                    control={control}
                    defaultValue={annotation.dueDate}
                    render={({ field: { onChange, value } }) => (
                      <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        adapterLocale={moment.locale("pt-br")}
                      >
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            inputFormat="yyyy/MM/dd"
                            value={value}
                            onChange={onChange}
                            renderInput={(params: any) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    )}
                    name="dueDate"
                  />
                </Grid>

                <Grid item xs={12} sx={{ marginTop: 2 }}>
                  <Typography paragraph>Priority</Typography>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        id="select-priority"
                        defaultValue={getValues("priority")}
                        {...register("priority")}
                      >
                        <MenuItem defaultChecked value="none">None</MenuItem>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Button type='submit' color='success' variant="contained" sx={{ marginRight: 2 }}>Save</Button>
                  <Button color='error' variant="contained">Delete</Button>
                </Grid>
              </Grid>

            </Grid>

          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
}
