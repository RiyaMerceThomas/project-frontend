import './App.css';
import { useState } from 'react';
import { Alert, Box, Button, Checkbox, FormControlLabel, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import FormSelectElement from './formSelectElement';
import { green, red } from '@mui/material/colors';
import { checkInfection } from './framework/checkInfection';

function Infection() {
    const checkbox_labels = [
        'fever',
        'cough',
        'headache',
        'sore_throat',
        'chills',
        'vomiting',
        'fatigue',
        'weight_loss',
        'loss_of_appetite',
        'dizziness',
        'itching',
        'rashes',
        'joint_pain',
        'eye_pain',
        'muscle_pain',
        'stomach_ache',
        'forgetfulness',
        'swelling_in_joints',
        'breathing_difficulty',
        'respiratory_problems',
        'yellowing_of_skin_or_mouth',
        'yellowing_of_eyes',
        'pale_colored_stool',
        'dark_urine',
    ];

    const [formElement, setFormElement] = useState({
        'age': '',
        'gender': '',
        'district': '',
        'fever': 0,
        'cough': 0,
        'headache': 0,
        'sore_throat': 0,
        'chills': 0,
        'vomiting': 0,
        'fatigue': 0,
        'weight_loss': 0,
        'loss_of_appetite': 0,
        'dizziness': 0,
        'itching': 0,
        'rashes': 0,
        'joint_pain': 0,
        'eye_pain': 0,
        'muscle_pain': 0,
        'stomach_ache': 0,
        'forgetfulness': 0,
        'swelling_in_joints': 0,
        'breathing_difficulty': 0,
        'respiratory_problems': 0,
        'yellowing_of_skin_or_mouth': 0,
        'yellowing_of_eyes': 0,
        'pale_colored_stool': 0,
        'dark_urine': 0,
    });

    const district_list = [
        'kasargod',
        'alappuzha',
        'kannur',
        'idukki',
        'thiruvanathapuram',
        'ernakulam',
        'kozhikode',
        'kollam',
        'malappuram',
        'pathanamthitta',
        'kottayam',
    ]
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
    const requireFields = ['gender', 'district', 'age'];

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
            let infected = await checkInfection(formElement);
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
                    <Typography sx={{ textAlign: 'center' }} variant='h2'>Infection Predictor</Typography>
                </ThemeProvider>
            </Box>
            <Box sx={{ marginLeft: "5%", marginRight: "5%" }}>
                <Grid container spacing={1}>

                    <Grid item lg={3} xs={12}>
                        <FormSelectElement name="Gender" list={["male", "female"]} value={formElement} setter={setFormElement} />
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <TextField id="age" label="Age" variant="outlined" value={formElement.age} type="number" sx={{ width: 230 }}
                            onChange={(event) => setFormElement({ ...formElement, age: event.target.value })}
                        />
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <FormSelectElement name="District" list={district_list} value={formElement} setter={setFormElement} />
                    </Grid>
                </Grid>

                <Box sx={{ marginTop: "5%", marginBottom: "5%" }} textAlign={'left'}>
                    <Grid container>

                        {
                            checkbox_labels.map(x => {
                                console.log(x);
                                let label = x.replaceAll("_"," ");
                                label = label.charAt(0).toUpperCase() + label.slice(1);
                                return( 
                                <Grid item lg={2} xs={12}>
                                    <FormControlLabel control={
                                        <Checkbox checked={formElement[x]}
                                            onChange={(event) => setFormElement({ ...formElement, [x]: event.target.checked ? 1 : 0 })}
                                        />}
                                        label={label}
                                    />
                                </Grid>
                                );
                            })
                        }
                    </Grid>
                </Box>
                <Box textAlign={'center'}>
                    <Box>
                        <Button variant="contained" onClick={onPredictButtonClick}>
                            Predict
                        </Button>
                    </Box>
                    {result !== '' ?
                        <div tabIndex={0} id="result">
                            <Box marginTop={"2%"}>
                                <img width={100} src={result !== "none" ? "infected.png" : "notinfected.png"} alt="banner"/>
                                <Typography variant='h4' fontWeight={600} color={result ? red[700] : green[700]}>
                                    {result !== "none" ? "You are most likely Infected with " + result : "You are most likely not Infected"}
                                </Typography>
                            </Box>
                        </div>
                        : ''}
                </Box>
                
             
            </Box>
        </main >
    );
}

export default Infection;
