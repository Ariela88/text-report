const fs = require('fs');

const fileUrl = process.argv[2];
const outputURl = createOutputUrl(fileUrl);


const data = readFile(fileUrl);

if (data) {

    const report = createReport(data);
    writeData(outputURl, report);
}

function createOutputUrl(url) {


    const splittedUrl = url.split('.');
    const lastPart = splittedUrl.pop();
    const firstPart = splittedUrl.join('.');
    const finalPart = firstPart + '-report.' + lastPart;

    return finalPart

}


function createReport(data) {

    let report = 'numero di caratteri: ' + countChars(data) + '\n' + 
                 'numero di parole: ' + countWords(data) + '\n' + 
                 'parole più usate: ' + mostUsedWord(data) + '\n' +
                 'caratteri più usati: ' + mostUsedChars(data);

    return report;
}


function countChars(data) {

    const dataWithoutSpaces = data.replace(/ /g, '');
    return dataWithoutSpaces.length;

}


function countWords(data) {

    const dataArray = data.split(' ');

    return dataArray.length;


}

function mostUsedChars(data){
    const dataWithoutSpaces = data.replace(/ /g, '');

    let charMap = {}

    for (let i = 0; i < dataWithoutSpaces.length; i++) {
        const char = dataWithoutSpaces[i];

        if(charMap[char]){

            charMap[char] += 1;
            
        }else{
            charMap[char] = 1;
        }
        
    } 



    const keyValues = Object.entries(charMap)

   keyValues.sort((el1,el2)=> {
    
    const firstValue = el1[1];
    const secondValue = el2[1];
    return secondValue - firstValue
   });

   return keyValues[0][0];
}

function mostUsedWord(data){

 
    const splittedData = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()/(\r\n|\n|\r)/]/g,"").split(' ');

    let wordMap = {}

    for (let i = 0; i < splittedData.length; i++) {
        const word = splittedData[i];

        if(wordMap[word]){

            wordMap[word] += 1;
            
        }else{
            wordMap[word] = 1;
        }
        
    } 

    console.log(wordMap)

    const keyValues = Object.entries(wordMap)

   keyValues.sort((el1,el2)=> {
    
    const firstValue = el1[1];
    const secondValue = el2[1];
    
    return secondValue - firstValue
   });

   return keyValues[0][0];






}

function readFile(url) {
    try {
        const data = fs.readFileSync(url, "utf8");
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}



function writeData(url, data) {
    try {
        fs.writeFileSync(url, data);
    } catch (err) {
        console.error(err.message);
    }
}


