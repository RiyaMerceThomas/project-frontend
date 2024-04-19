import './App.css';
import { countryList } from './data/countryList';
import { useState } from 'react';
import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import FormSelectElement from './formSelectElement';
import { checkDengueInfection } from './framework/checkDengueInfection';
import { green, red } from '@mui/material/colors';

function Dengu() {
  const [formElement, setFormElement] = useState({
    'gender':'',
    'fever':0,
    'eye_pain':0,
    'muscle_pain':0,
    'headache':0,
    'bone_pain':0,
    'nausea_or_vomitting':0,
    'rash':0,
    'joint_pain':0,
    'bp':'',
    'platelet_count':'',
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
  const requireFields = ['gender','bp','platelet_count'];

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
      let infected = await checkDengueInfection(formElement);
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
          <Typography sx={{ textAlign: 'center' }} variant='h2'>Dengue Predictor</Typography>
        </ThemeProvider>
      </Box>
      <Box sx={{ marginLeft: "5%", marginRight: "5%" }}>
        <Grid container spacing={1}>
          
          <Grid item lg={3} xs={12}>
            <FormSelectElement name="Gender" list={["Male", "Female"]} value={formElement} setter={setFormElement} />
          </Grid>
          <Grid item lg={3} xs={12}>
            <TextField id="platelet_count" label="Platelet Count" variant="outlined" value={formElement.age} type="number" sx={{ width: 230 }}
              onChange={(event) => setFormElement({ ...formElement, platelet_count: event.target.value })}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <TextField id="bp" label="Blood Pressure" variant="outlined" value={formElement.age} type="text" sx={{ width: 230 }}
              onChange={(event) => setFormElement({ ...formElement, bp: event.target.value })}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ marginTop: "5%", marginBottom: "5%" }} textAlign={'left'}>
          <Grid container>
            
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.fever}
                  onChange={(event) => setFormElement({ ...formElement, fever: event.target.checked ? 1 : 0 })}
                />}
                label="Fever"
              />
            </Grid>
            
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.eye_pain}
                  onChange={(event) => setFormElement({ ...formElement, eye_pain: event.target.checked ? 1 : 0 })}
                />}
                label="Eye Pain"
              />
            </Grid>

            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.muscle_pain}
                  onChange={(event) => setFormElement({ ...formElement, muscle_pain: event.target.checked ? 1 : 0 })}
                />}
                label="Muscle Pain"
              />
            </Grid>

            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.headache}
                  onChange={(event) => setFormElement({ ...formElement, headache: event.target.checked ? 1 : 0 })}
                />}
                label="Headache"
              />
            </Grid>

            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.bone_pain}
                  onChange={(event) => setFormElement({ ...formElement, bone_pain: event.target.checked ? 1 : 0 })}
                />}
                label="Bone Pain"
              />
            </Grid>
            
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.nausea_or_vomitting}
                  onChange={(event) => setFormElement({ ...formElement, nausea_or_vomitting: event.target.checked ? 1 : 0 })}
                />}
                label="Nausea/Vomitting"
              />
            </Grid>
            
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.rash}
                  onChange={(event) => setFormElement({ ...formElement, rash: event.target.checked ? 1 : 0 })}
                />}
                label="Rash"
              />
            </Grid>
            
            <Grid item lg={2} xs={12}>
              <FormControlLabel control={
                <Checkbox checked={formElement.joint_pain}
                  onChange={(event) => setFormElement({ ...formElement, joint_pain: event.target.checked ? 1 : 0 })}
                />}
                label="Joint Pain"
              />
            </Grid>
          </Grid>
        </Box>

        <Typography sx={{ textAlign: 'right' }} variant='h6'>Please enter patelet count in numericals</Typography>
        <Typography sx={{ textAlign: 'right' }} variant='h6'>  Normal:150,000-450,000</Typography>
        <Typography sx={{ textAlign: 'right' }} variant='h6'>  High: Above 450,000</Typography>
        <Typography sx={{ textAlign: 'right' }} variant='h6'>  Low: Below 150,000 </Typography> 
        <Typography sx={{ textAlign: 'right' }} variant='h6'>Please enter bp in normal format(eg:120/80)</Typography>


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

export default Dengu;
