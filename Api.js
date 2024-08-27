const express = require("express")
const app = express()
const bodyp = require("body-parser")
const compiler = require("compilex")
const options = { stats: true }
compiler.init(options)
app.use(bodyp.json())
app.use("/codemirror-5.65.16", express.static("D:/WEB DEVOLOPMENT/MY OWN PROJECT/Compilerr/codemirror-5.65.16"))
app.use("/codemirror-5.65.16", express.static(__dirname + "/codemirror-5.65.16"))
app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted")
    })
    res.sendFile("D:/WEB DEVOLOPMENT/MY OWN PROJECT/Compilerr/index.html")
})
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    try {
        //FOR C/CPP LANG....
        if (lang == "C_&_Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }

                });

                //res is the response object
            }
            else {
                //if windows  
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        //FOR JAVA LANG....
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                });
            }
            else { 
                //if windows  
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        //FOR PYTHON LANG....
        else if (lang == "Python") {
            if (!input) {
                //if windows  
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    } else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }

})
app.listen(1000)