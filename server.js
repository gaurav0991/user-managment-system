import app from "./app.js";

app.listen(
  process.env.PORT || 3000,
  console.log(`Sever running on PORT 3000 `.blue.bold)
);
