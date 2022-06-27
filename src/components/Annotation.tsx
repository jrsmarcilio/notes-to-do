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
  Collapse,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import NoteContext from '@/context/notes';
import { ExpandMoreProps, INotes, TypeNotes } from '@/interfaces';
import { cardStyles } from '@/styles';


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

export default function RecipeReviewCard({ annotation }: { annotation: INotes }) {
  const { removeNote, createNote, updateNote } = React.useContext(NoteContext);

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => setExpanded(!expanded);

  const { register, handleSubmit, watch, control, setValue, getValues, formState: { errors } } = useForm<TypeNotes>({
    defaultValues: {
      id: annotation.id || "",
      name: annotation.name,
      isActive: annotation.isActive,
      dueDate: new Date(annotation.dueDate || Date.now()),
      priority: annotation.priority || "none",
      notes: annotation.notes
    }
  });

  const onSubmit: SubmitHandler<TypeNotes> =
    (data: TypeNotes) => annotation.isActive ? updateNote(data) : createNote(data);
 
  const CheckSyncIcon = () => {
		const title: string = annotation.isActive ? 'Cloud Sync' : 'No Syncing Cloud';
		const Icon = () => annotation.isActive ?  <TurnedInIcon /> : <TurnedInNotIcon />
		const handleSyncNote = () => { setExpanded(true); handleSubmit(onSubmit); }
    return (
      <Tooltip title={title} placement="left-start">
        <IconButton onClick={handleSyncNote}>
          <Icon />
        </IconButton>
      </Tooltip>
    )
  }
  
  return (
    <React.Fragment>
      <Card sx={cardStyles}>
        <CardActions disableSpacing>
          <CheckSyncIcon />
          <TextField
            {...register("name")}
            defaultValue={getValues("name") || annotation.name}
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
              <input hidden defaultValue={getValues('id') || annotation.id} />
              <Grid item xs={6}>
                <Typography paragraph>Notes</Typography>
                <TextField
                  id='outlined-notes'
                  multiline
                  rows={9}
                  fullWidth
                  {...register("notes")}
                  defaultValue={getValues("notes") || annotation.notes}
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
                        dateFormats={{ keyboardDate: 'dd MM yyyy' }}
                      >
                        <Stack spacing={3}>
                          <DesktopDatePicker
                            inputFormat="DD/MM/YYYY"
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
                        defaultValue={getValues("priority") || annotation.priority || "none"}
                        {...register("priority")}
                      >
                        <MenuItem value="none"><em>None</em></MenuItem>
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
                    title={annotation.isActive ? 'Update' : 'Save' + 'annotation'}
                    placement='top-start'
                    sx={{ marginRight: 2 }}
                  >
                    <Button color='success' type="submit" variant="contained">
                      {annotation.isActive ? 'Update' : 'Save'}
                    </Button>
                  </Tooltip>

                  <Tooltip title="Delete" placement='top-start'>
                    <Button
                      color='error'
                      variant="contained"
                      type="button"
                      onClick={() => removeNote(annotation.id || '')}
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
