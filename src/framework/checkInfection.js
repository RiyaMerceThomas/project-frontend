import { sendRequest } from "./utils/sendRequest";

export async function checkInfection(input) {
    let response = await sendRequest(input,'/predict_infection');
    return response.infected;
}