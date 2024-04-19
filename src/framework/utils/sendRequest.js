export async function sendRequest(input,end_point) {
    let response = await fetch('http://localhost:5000' + end_point, {
        method: 'POST',
        body: JSON.stringify(input),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let data = await response.json();
    return data;
}
