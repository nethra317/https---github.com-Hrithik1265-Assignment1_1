const express = require('express');
const bodyParser = require('body-parser');
const subjectRoutes = require('./routes/subjectRoutes');

const app = express();

app.use(bodyParser.json());

// Add Subject Routes
app.use('/api/v1/hod/subject', subjectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
