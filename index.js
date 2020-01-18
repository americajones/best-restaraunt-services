
// required
const express = require("express");
const path = require("path");
// set up express app
const app = express();
const PORT = process.env.PORT || 3000;

//allowing express to use json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// table template
const tables = [
  {
    "id": "1",
    "name": "Keeley",
    "email": "keeley@email.com",
    "phone": 55555555555
  }
];

// waitlist template
const waitlist = [];

// links to each page's html
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
  console.log(tables);
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});


//json routes
app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

app.post("/api/tables", function (req, res) {
  const newTable = req.body;
  console.log(newTable);



  if (tables.length >= 5) {
    waitlist.push(newTable);
    res.json(false)
  } else {
    tables.push(newTable);
    console.log(tables);
    res.json(true)
  }

  // res.json(tables);

});



// Listener
// ===========================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
