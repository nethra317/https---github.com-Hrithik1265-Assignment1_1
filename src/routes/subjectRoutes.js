const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Create Subject
router.post('https://api.iqlabsacademy.com/424f_0659/api/v1/hod/subject/', subjectController.createSubject);

// Get Subjects
router.get(' https://api.iqlabsacademy.com/424f_0659/api/v1/hod/subject/', subjectController.getSubjects);

// Update Subject Name
router.patch('https://api.iqlabsacademy.com/424f_0659/api/v1/hod/group/subject/', subjectController.updateSubject);

// Delete Subject
router.delete('https://api.iqlabsacademy.com/424f_0659/api/v1/hod/group/subject/', subjectController.deleteSubject);

// Enable/Disable Subject
router.put('https://api.iqlabsacademy.com/424f_0659/api/v1/hod/group/subject/', subjectController.enableDisableSubject);

module.exports = router;
