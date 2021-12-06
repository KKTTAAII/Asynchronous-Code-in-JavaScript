const url = "http://numbersapi.com/";
const fourNumbers = [];
const favNumbers = [2,13,18,25];
const parentDiv = document.querySelector(".all-nums");

for (let i = 0; i < favNumbers.length; i++){
    fourNumbers.push(axios.get(url+`${favNumbers[i]}?json`))
}

function addFactsToPage(fact){
    const numDiv = document.createElement("div");
    parentDiv.appendChild(numDiv);
    numDiv.innerHTML = fact;
    numDiv.className = "child-div"
}

Promise.all(fourNumbers)
    .then(resp => resp.forEach(num => addFactsToPage(num.data.text)))
    .catch(err => console.log("Error"));



