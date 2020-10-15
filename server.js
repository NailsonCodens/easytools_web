const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.POST || 7000

const app = express();  

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html")
console.log('aaa')
  fs.readFile(filePath, "utf8", (err, data) => {
    if(err){
      return console.log(err)
    }
    console.log('aaa')


    data = data 
      .replace(/__TITLE__/g, "Aplicativo de aluguel de equipamentos e ferramentas! | EasyTools")
      .replace(/__DESCRIPTION__/g, "EasyTools, Alugue com facilidade, ferramentas e equipamentos que voc&ecirc; e seu neg&oacute;cio precisam! Precisou furar uma parede, consertar o guarda-roupa e não tem a ferramenta necessária? Alugue na EasyTools.");
    res.send(data)
    res.send('GET request to the homepage');

  });
});

app.get('/s/about-us', (req, res) => {
  const filePath = path.resolve(__dirname, "./build", "index.html")
console.log('aaa')
  fs.readFile(filePath, "utf8", (err, data) => {
    if(err){
      return console.log(err)
    }

    data = data 
      .replace(/__TITLE__/g, "oko okok kokokok  aluguel de equipamentos e ferramentas! | EasyTools")
      .replace(/__DESCRIPTION__/g, "okokokok, Alugue com facilidade, ferramentas e equipamentos que voc&ecirc; e seu neg&oacute;cio precisam! Precisou furar uma parede, consertar o guarda-roupa e não tem a ferramenta necessária? Alugue na EasyTools.");
    res.send(data)
  });
  
});


//app.use(express.static(path.resolve(__dirname, "./build")))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})