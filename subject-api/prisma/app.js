// Import necessary modules
import { PrismaClient } from '@prisma/client/edge'

const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

// Create a new subject
app.post('/subjects', async (req, res) => {
  const { description, subjectMasterId, chapters, semesters } = req.body;

  try {
    const newSubject = await prisma.subject.create({
      data: {
        description,
        subjectMaster: { connect: { id: subjectMasterId } },
        chapters,
        semesters,
      },
    });

    res.json(newSubject);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create subject' });
  }
});

// Delete a subject by ID
app.delete('/subjects/:id', async (req, res) => {
  const subjectId = req.params.id;

  try {
    const deletedSubject = await prisma.subject.delete({
      where: { id: subjectId },
    });

    res.json(deletedSubject);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete subject' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
