const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
