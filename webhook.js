const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.json());

app.post("/update", (req, res) => {
    console.log("Webhook received!");
    exec("bash /var/www/html/update.sh", (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send("Error executing script.");
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send("Script error.");
        }
        console.log(`stdout: ${stdout}`);
        res.status(200).send("Updated successfully.");
    });
});

app.listen(3000, () => {
    console.log("Webhook server running on port 3000");
});
