const express = require('express');
const { generateCode } = require('./generateCode')
const { executeCode } = require("./executeCode")
const cors = require("cors")

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.json({
        hello: "hello world"
    })
})
app.post("/run", async (req, res) => {
    const { lang = "cpp", code } = req.body;
    if (code === undefined) {
        return res.status(400).json({
            success: false,
            message: "Empty code body",
            data: {}
        })
    }
    try {
        // convert the code data into a code file
        const filePath = await generateCode(lang, code);
        // then run the file and send back the response
        const output = await executeCode(filePath, lang);
        return res.status(200).json({
            success: true,
            message: "success",
            data: {
                filePath,
                output
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal serveer error",
            data: {
                error
            }
        })
    }
})

app.listen(5000, () => {
    console.log("Listning on port 5000");
})