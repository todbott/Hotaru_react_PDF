async function Translate(pOne, pTwo, display, apiKey, one_string_to_translate, two_string_to_translate) {

    console.log(apiKey)

    let pOneURL = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey + "&source=" + pOne + "&target=" + display
    let pTwoURL = "https://translation.googleapis.com/language/translate/v2?key=" + apiKey + "&source=" + pTwo + "&target=" + display

    let toReturn = [];

    const requestOptions = {
      method: 'POST'
    };
    await fetch(pOneURL+"&q="+one_string_to_translate, requestOptions)
      .then(res => res.json())
      .then(
        ( res ) => { 
          toReturn.push(res.data.translations[0].translatedText.replace(/(&quot;)/g,"\""))
        }
        ).catch(
        ( error ) => { 
            console.log("There was an error: ", error); 
        }
    )
    await fetch(pTwoURL+"&q="+two_string_to_translate, requestOptions)
      .then(res => res.json())
      .then(
        ( res ) => { 
          toReturn.push(res.data.translations[0].translatedText.replace(/(&quot;)/g,"\""))
        }
        ).catch(
        ( error ) => { 
            console.log("There was an error: ", error); 
        }
    )      

    return toReturn;
    
}

export default Translate;