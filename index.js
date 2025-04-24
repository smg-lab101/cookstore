const express = require("express");
const path = require("path");
const app = express();
const port = 3002;

// Serve static files
app.use(express.static(path.join(__dirname, 'public_html')));

app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'list.html'));
});

// Optional: routes to other pages
app.get("/detail", (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'detail.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
