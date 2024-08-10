import express from "express";
const app = express ();

import { router as moviesRouter } from "./router/movies.js";
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, (err) => {
    console.log(
        err
        ? `Error launching server: ${err.message}` 
        : `Server running on port http://127.0.0.1:${PORT} \n
        Ctrl + C to exit...`
 );
});

app.use("/api/movies", moviesRouter);