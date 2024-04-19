import { sendRequest } from "./utils/sendRequest";

export async function checkCovidInfection(input) {
    let response = await sendRequest(input,'/predict_covid_infection');
    return response.infected;
}