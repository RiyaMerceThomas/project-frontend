import './App.css';
import { countryList } from './data/countryList';
import { useState } from 'react';
import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import FormSelectElement from './formSelectElement';
import { checkCovidInfection } from './framework/checkCovidInfection';
import { green, red } from '@mui/material/colors';

function Covid() {
  const [formElement, setFormElement] = useState({
    'country': '',
    'age': '',
    'gender': '',
    'fever': '',
    'body_pain': 0,
    'runny_nose': 0,
    'difficulty_in_breathing': 0,
    'nasal_congestion': 0,
    'sore_throat': 0,
    'severity': '',
    'contact_with_covid_patient': '',
  });
  const theme = createTheme();

  theme.typography.h2 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  };
  const requireFields = ['country', 'age', 'gender', 'fever', 'severity', 'contact_with_covid_patient','spo2'];

  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function onPredictButtonClick() {
    setErrorMessage('');

    for (var x = 0; x < requireFields.length; x++) {
      if (formElement[requireFields[x]] === '') {
        let field = (requireFields[x][0].toUpperCase() + requireFields[x].slice(1)).replaceAll('_', ' ');
        setErrorMessage(`Please fill the field ${field}`);
        return;
      }
    }
    try {
      let infected = await checkCovidInfection(formElement);
      setResult(infected);
      document.getElementById('result').focus();
    } catch (err) {
      setErrorMessage("Couldn't connect to backend!");
    }

  }

  return (
    <main className='App'>
      <Box sx={{ marginBottom: "5%" }}>
        <ThemeProvider theme={theme}>
          <Typography sx={{ textAlign: 'center' }} variant='h2'>Covid Predictor</Typography>
        </ThemeProvider>
      </Box>
      <Box sx={{ marginLeft: "5%", marginRight: "5%" }}>
        <Grid container spacing={1}>
          <Grid item lg={3} xs={12}>
            <FormSelectElement name="Country" list={countryList} value={formElement} setter={setFormElement} />
          </Grid>

          <Grid item lg={3} xs={12}>
            <FormSelectElement name="Gender" list={["Male", "Female", "Transgender"]} value={formElement} setter={setFormElement} />
          </Grid>

          <Grid item lg={3} xs={12}>
            <FormSelectElement name="Severity" label="Fever" list={['Mild', 'Moderate', 'Severe']} value={formElement} setter={setFormElement} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <FormSelectElement name="Contact_with_covid_patient" list={['Yes', 'No', 'Not known']} value={formElement} setter={setFormElement} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <FormSelectElement name="spo2" list={['High', 'Low']} value={formElement} setter={setFormElement} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <TextField id="age" label="Age" variant="outlined" value={formElement.age} type="number" inputProps={{ min: 1, max: 100 }} sx={{ width: 230 }}
              onChange={(event) => setFormElement({ ...formElement, age: event.target.value })}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <TextField id="fever" label="Fever" variant="outlined" value={formElement.fever} type="text" sx={{ width: 230 }}
              onChange={(event) => setFormElement({ ...formElement, fever: event.target.value })}
            />
          </Grid>
        </Grid>
        


        <Box sx={{ marginTop: "5%", marginBottom: "5%" }} textAlign={'left'}>
          <Grid container>
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.body_pain}
                  onChange={(event) => setFormElement({ ...formElement, body_pain: event.target.checked ? 1 : 0 })}
                />}
                label="Body Pain"
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.runny_nose}
                  onChange={(event) => setFormElement({ ...formElement, runny_nose: event.target.checked ? 1 : 0 })}
                />}
                label="Runny Nose"
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.difficulty_in_breathing}
                  onChange={(event) => setFormElement({ ...formElement, difficulty_in_breathing: event.target.checked ? 1 : 0 })}
                />}
                label="Difficulty in breathing"
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.nasal_congestion}
                  onChange={(event) => setFormElement({ ...formElement, nasal_congestion: event.target.checked ? 1 : 0 })}
                />}
                label="Nasal congestion"
              />
            </Grid>
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.sore_throat}
                  onChange={(event) => setFormElement({ ...formElement, sore_throat: event.target.checked ? 1 : 0 })}
                />}
                label="Sore throat"
              />
            </Grid>
          </Grid>

        </Box>

        <Typography sx={{ textAlign: 'right' }} variant='h6'>SpO2 reading:-</Typography>
        <Typography sx={{ textAlign: 'right' }} variant='h6'>  High: Above 90% </Typography>
        <Typography sx={{ textAlign: 'right' }} variant='h6'>  Low: Below 90% </Typography>
        
        <Typography sx={{ textAlign: 'right' }} variant='h6'>Fever:-</Typography>
        <Typography sx={{ textAlign: 'right' }} variant='h6'>Enter in fahrenheit</Typography>
        
        

        <Box textAlign={'center'}>
          <Box>
            <Button variant="contained" onClick={onPredictButtonClick}>
              Predict
            </Button>
          </Box>
          {result !== '' ?
            <div tabIndex={0} id="result">
              <Box marginTop={"2%"}>
                <img width={100} src={result ? "infected.png" : "notinfected.png"} />
                <Typography variant='h4' fontWeight={600} color={result ? red[700] : green[700]}>
                  {result ? "You are most likely Infected" : "You are most likely not Infected"}
                </Typography>
              </Box>
            </div>
            : ''}
        </Box>
        
      </Box>
    </main >
  );
}

export default Covid;
