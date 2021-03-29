async function handleSubmit(event) {    
    event.preventDefault()
    let url = document.getElementById('url').value
    if (Client.checkForUrl(url)) {
        try {
            let log = document.getElementById("log");
            log.innerHTML = "processing...";
            const apicall = await fetch(`http://localhost:8081/apiurl/${url}`);
            const response = await apicall.json();
            log.innerHTML = "";
            document.getElementById("agreement").innerHTML = response.agreement.toLowerCase();
            document.getElementById("subjectivity").innerHTML = response.subjectivity.toLowerCase();
            document.getElementById("confidence").innerHTML = response.confidence.toLowerCase();
            document.getElementById("irony").innerHTML = response.irony.toLowerCase();

        }catch (err){
            log.innerHTML = err.message; 
        }
    }else {
        log.innerHTML = "not a valid url"; 
    }
}
export { handleSubmit }
