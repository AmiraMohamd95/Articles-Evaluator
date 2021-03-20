function checkForUrl(inputText) {
    console.log ("in check url method"); 
    let urlPattern = new RegExp(
        /^((?:https?:\/\/)?[^.\/]+(?:\.[^.\/]+)+(?:\/.*)?)$/
    );
    console.log ("url valid "+urlPattern.test(inputText));
    return urlPattern.test(inputText); 
}

export { checkForUrl };
