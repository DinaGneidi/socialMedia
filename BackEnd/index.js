const app = require("./src/app")
PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{console.log(`Serve running on https://localhost:${PORT}`)})