import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import NoteContext from '@/context/notes';
import { ExpandMoreProps, INotes, TypeNotes } from '@/interfaces';
import { annotationCard, cardStyles, typographyDate } from '@/styles';
import moment from 'moment';
import { toast } from 'react-toastify';

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function AnnotationCard({ annotation }: { annotation: INotes }) {
  const { removeNote, createNote, changeDone } = React.useContext(NoteContext);

  const { register, handleSubmit, control, getValues, setValue } =
    useForm<TypeNotes>({
      defaultValues: {
        id: annotation.id,
        name: annotation.name,
        isActive: annotation.isActive,
        dueDate: new Date(annotation.dueDate || Date.now()),
        priority: annotation.priority || 'none',
        notes: annotation.notes,
        done: annotation.done || false,
      },
    });

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);
  const [completedTask, setCompletedTask] = React.useState(false);
  const [priority, setPriority] = React.useState(getValues('priority'));

  const handleChangePriority = (event: SelectChangeEvent) => {
    setValue('priority', event.target.value);
    setPriority(event.target.value as string);
  };

  const handleChangeCompletedTask = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (getValues('isActive') && getValues('id')) {
      changeDone(getValues('id'));
      setCompletedTask(event.target.checked);
    } else toast.error('Annotation no syncing cloud.', { autoClose: 1800 });
  };

  const onSubmit: SubmitHandler<TypeNotes> = async (data: TypeNotes) => {
    setValue('done', completedTask);
    const note: INotes = await createNote(data);
    if (note.id) {
      setValue('id', note.id || getValues('id'));
      setValue('name', note.name);
      setValue('isActive', note.isActive);
      setValue('notes', note.notes);
      setValue('dueDate', note.dueDate);
      setValue('priority', note.priority);
      setValue('done', note.done);
    }
  };

  const handleSyncNote = () => {
    setExpanded(true);
    handleSubmit(onSubmit);
  };

  const changeBorderColor = (): string => {
    let color: string = 'none';
    switch (priority) {
      case 'low':
        color = 'blue';
        break;
      case 'medium':
        color = 'orange';
        break;
      case 'high':
        color = 'red';
        break;
      default:
        color = 'none';
        break;
    }
    return color;
  };

  return (
    <React.Fragment>
      <Card sx={{ ...cardStyles, borderLeftColor: changeBorderColor() }}>
        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
          <Box>
            <Tooltip
              title={
                annotation.isActive || getValues('isActive')
                  ? 'Cloud Sync'
                  : 'No Syncing Cloud'
              }
              placement="left-start"
            >
              <IconButton onClick={handleSyncNote}>
                {annotation.isActive || getValues('isActive') ? (
                  <TurnedInIcon />
                ) : (
                  <TurnedInNotIcon />
                )}
              </IconButton>
            </Tooltip>
            <Checkbox
              checked={completedTask}
              onChange={handleChangeCompletedTask}
              inputProps={{ 'aria-label': 'Checkbox completed Task' }}
            />
            <TextField
              {...register('name')}
              defaultValue={getValues('name')}
              id="outlined-name"
              variant="outlined"
              InputProps={{ style: { height: 35 } }}
              sx={
                completedTask
                  ? { textDecoration: 'line-through' }
                  : { textDecoration: 'none' }
              }
            />
          </Box>
          <Box sx={annotationCard}>
            <Tooltip
              title={moment(getValues('dueDate')).format('YYYY/MM/DD hh:mm:ss')}
              placement="top-start"
            >
              <Typography variant="h6" component="h2" sx={typographyDate}>
                {moment(getValues('dueDate')).format('YYYY/MM/DD')}
              </Typography>
            </Tooltip>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Box>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <input hidden id="id" value={getValues('id')} />
              <Grid item xs={6}>
                <Typography paragraph>Notes</Typography>
                <TextField
                  id="outlined-notes"
                  multiline
                  rows={9}
                  fullWidth
                  {...register('notes')}
                  defaultValue={getValues('notes')}
                />
              </Grid>
              <Grid container item xs={6} direction="row">
                <Grid item xs={12}>
                  <Typography paragraph>Due Date</Typography>
                  <Controller
                    control={control}
                    defaultValue={getValues('dueDate')}
                    render={({ field: { onChange, value } }) => (
                      <LocalizationProvider
                        dateAdapter={AdapterMoment}
                        dateFormats={{ keyboardDate: 'dd MM yyyy' }}
                      >
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            inputFormat="DD/MM/YYYY"
                            value={value}
                            onChange={onChange}
                            renderInput={(params: any) => (
                              <TextField {...params} />
                            )}
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
                        value={priority}
                        onChange={handleChangePriority}
                        defaultValue="none"
                      >
                        <MenuItem value="none">
                          <em>None</em>
                        </MenuItem>
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
                  <Tooltip
                    title={
                      getValues('isActive') ? 'Update' : 'Save' + ' annotation'
                    }
                    placement="top-start"
                    sx={{ marginRight: 2 }}
                  >
                    <Button color="primary" type="submit" variant="contained">
                      {getValues('isActive') ? 'Update' : 'Save'}
                    </Button>
                  </Tooltip>

                  <Tooltip title="Delete" placement="top-start">
                    <Button
                      color="error"
                      variant="contained"
                      type="button"
                      onClick={() => removeNote(getValues('id'))}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </React.Fragment>
  );
}
