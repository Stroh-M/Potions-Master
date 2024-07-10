import express, { response } from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const SPELLS_API_URL = "https://wizard-world-api.herokuapp.com/Spells";
const POTIONS_API_URL = "https://wizard-world-api.herokuapp.com/Elixirs";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/spells", async (req, res) => {
    console.log(req.body.type);
    try {
        const response = await axios.get(`${SPELLS_API_URL}?type=${req.body.type}`);
        const result = response.data;
        console.log(result);
        res.render("spells.ejs", {
            content: result
        });
    } catch (error) {
        res.status(500);
        console.log(error);
    }
});

app.post("/potions", async (req, res) => {
    console.log(req.body.difficulty);
    try {
        const response = await axios.get(`${POTIONS_API_URL}?difficulty=${req.body.difficulty}`);
        const result = response.data;
        console.log(result)
        console.log(result[0].ingredients);
        res.render("potions.ejs", {
            content: result,
        });
    } catch (error) {
        res.status(500);
        console.log(error);
    }
});

app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});