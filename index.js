const inputText = document.getElementById("text-input");
const transformButton = document.getElementById("transform-button");
const clearButton = document.getElementById("clear-button");
const outputText = document.getElementById("text-output");

let sourceText;
let sourceLang;
let targetLang;
let transText;

let transLangs = ["ru", "id", "ar", "ka", "kk", "ja", "mn", "mg", "ru"];

transformButton.onclick = async () => {
	sourceText = inputText.value;
	console.log(sourceText);
	for (let i = 0; i < transLangs.length - 1; i++) {
		transText = await googleTranslate(transLangs[i], transLangs[i + 1], sourceText);
		//console.log(transLangs[i], transLangs[i + 1], sourceText, transText);
		sourceText = transText;
	}
	outputText.textContent = transText;
}

clearButton.onclick = () => {
	inputText.value = "";
}

async function googleTranslate(sourceLang, targetLang, sourceText) {
  try {
    
    let google_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    
    const googleResponse = await fetch(google_url, {
        method: "GET",
      });
    const translateResult = await googleResponse.json();
    const resArr = [];
    for (let i = 0; i < translateResult[0].length; i++) {
      resArr.push(translateResult[0][i][0]);
    }
    return resArr.join("");
  } catch (error) {
    return "Sorry, translation failed"
  }
}