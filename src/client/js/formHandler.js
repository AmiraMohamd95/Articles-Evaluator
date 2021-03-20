async function handleSubmit(event) {
    alert ("in handle submit method ");
    event.preventDefault()
    // check what text was put into the form field
    let url = document.getElementById('url').value;
    alert (url);
    let logger = document.getElementById("logger");

    if (Client.checkForUrl(url)){
        let submitBtn = document.getElementById("submitBtn");
        try{
            submitBtn.disabled = true;
            logger.innerText = "Working...";
            const apiCall = await fetch(`http://localhost:8081/scan/${url}`);
            const apiResponse = await apiCall.json();
            
            document.getElementById("results").innerHTML = 
            `<table>
                <tr><td>Sentiment: </td><td>Result</td></tr>
                <tr><td>Agreement: </td><td>${apiResponse.agreement.toLowerCase()}</td></tr>
                <tr><td>Subjectivity: </td><td>${apiResponse.subjectivity.toLowerCase()}</td></tr>
                <tr><td>Confidence: </td><td>${apiResponse.confidence}</td></tr>
                <tr><td>Irony: </td><td>${apiResponse.irony.toLowerCase()}</td></tr>
                </table>`;
            
            submitBtn.disabled = false;
        }catch(err){
            submitBtn.disabled = false;
            alert(err.message);
            console.log(err.message);
            logger.innerText = "Error...";
        }
    }else {
        alert("Invalid URL, please make sure you entered a correct URL");
        logger.innerText =
        "Invalid URL, please try a correct URL like https://jamesclear.com/five-step-creative-process/";
    }
}
export { handleSubmit }
