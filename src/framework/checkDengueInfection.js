import { sendRequest } from "./utils/sendRequest";

export async function checkDengueInfection(input) {
    let response = await sendRequest(input,'/predict_dengue_infection');
    return response.infected;
}