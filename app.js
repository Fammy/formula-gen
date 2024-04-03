const express = require('express');
const mathjax = require('mathjax');
const app = express();

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.post('/api/latex2svg', (req, res) => {
    const body = req.body;

    if (!body.formula) {
        res.status(400).send("'formula' missing");
        return;
    }

    const formula = body.formula;

    mathjax.init({
        loader: {load: ['input/tex', 'output/svg']}
      }).then((MathJax) => {
        const svg = MathJax.tex2svg(formula, {display: true});
        res.setHeader('content-type', 'image/svg+xml');
        res.status(200).send(MathJax.startup.adaptor.innerHTML(svg));

      }).catch((err) => {
        res.status(400).send(err.message);
      });
});

app.post('/api/mathml2svg', (req, res) => {
    const body = req.body;

    if (!body.formula) {
        res.status(400).send("'formula' missing");
        return;
    }

    const formula = body.formula;

    mathjax.init({
        loader: {load: ['input/mml', 'output/svg']}
      }).then((MathJax) => {
        const svg = MathJax.mathml2svg(formula, {display: true});
        res.setHeader('content-type', 'image/svg+xml');
        res.status(200).send(MathJax.startup.adaptor.innerHTML(svg));

      }).catch((err) => {
        res.status(400).send(err.message);
      });
});

app.post('/api/asciimath2svg', (req, res) => {
    const body = req.body;

    if (!body.formula) {
        res.status(400).send("'formula' missing");
        return;
    }

    const formula = body.formula;

    mathjax.init({
        loader: {load: ['input/asciimath', 'output/svg']}
      }).then((MathJax) => {
        const svg = MathJax.asciimath2svg(formula, {display: true});
        res.setHeader('content-type', 'image/svg+xml');
        res.status(200).send(MathJax.startup.adaptor.innerHTML(svg));

      }).catch((err) => {
        res.status(400).send(err.message);
      });
});