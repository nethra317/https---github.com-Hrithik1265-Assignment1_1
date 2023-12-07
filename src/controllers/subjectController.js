const prisma = require('../models/subjectModel');

//create new subject
const createSubject = async (req, res) => {
  try {
         const { subject_name, category, sub_category, discipline, level, subject } = req.body;
         const newSubject = await prisma.subject.create({
           data: {
             description: subject_name,sub_category,discipline,subject, 
             subjectId: category,level,
             chapters: 0, // Replace with the appropriate value in Integer
             semesters: 0, // Replace with the appropriate value in Integer


           },
         });
     
         res.json({ sts: true, msg: 'Subject has been added successfully' });
       } catch (error) {
         console.error('Error in creating subject:', error);
         res.status(500).json({ sts: false, msg: 'Error in adding subject to database' });
       }
     };

     //getting the subjects list
const getSubjects = async (req, res) => {
         try {
                  // Fetch all subjects 
                  const subjects = await prisma.subject.findMany();
                  res.json({ sts: true, data: subjects });
         } catch (error) {
                  console.error('Error in fetching subjects list:', error);
                  res.status(500).json({ sts: false, msg: 'Error in fetching subjects list' });
         }
};
           
//update the subject naming
const updateSubject = async (req, res) => {
         try {
                  const { subject_id, subject_name } = req.body;
              
                  // Update the subject name
                  const updatedSubject = await prisma.subject.update({
                    where: {
                      id: subject_id, // ID of the subject to be updated
                    },
                    data: {
                      description: subject_name, // Assume subject_name corresponds to description
                    },
                  });
              
                  res.json({ sts: true, msg: 'Subject has been updated successfully' });
                } catch (error) {
                  console.error('Error in updating subject:', error);
                  res.status(500).json({ sts: false, msg: 'Error in updating subject' });
                }
};

//Delete the subject
const deleteSubject = async (req, res) => {
         try {
                  const { subject_ids } = req.body;
              
                  // Delete the subjects using subject_ids
                  const deleteResult = await prisma.subject.deleteMany({
                    where: {
                      id: {
                        in: subject_ids, // Array of subject IDs to be deleted
                      },
                    },
                  });
              
                  if (deleteResult.count > 0) {
                    res.json({ sts: true, msg: 'Subjects has been deleted successfully' });
                  } else {
                    res.json({ sts: false, msg: 'Subjects has not been deleted yet!' });
                  }
                } catch (error) {
                  console.error('Error in deleting subjects:', error);
                  res.status(500).json({ sts: false, msg: 'Error in deleting subjects' });
                }
};

//make the subject Active or Inactive
const enableDisableSubject = async (req, res) => {
         try {
                  const { subject_ids } = req.body;
              
                  // Fetch the current status of subjects
                  const currentSubjects = await prisma.subject.findMany({
                    where: {
                      id: {
                        in: subject_ids, // Array of subject IDs to be updated
                      },
                    },
                    select: {
                      id: true,
                      status: true, // Assuming 'status' is the field indicating subject status (enabled/disabled)
                    },
                  });
              
                  // Update the subjects' status (toggle between enabled and disabled)
                  const updatedSubjects = await prisma.subject.updateMany({
                    where: {
                      id: {
                        in: subject_ids, // Array of subject IDs to be updated
                      },
                    },
                    data: {
                      status: {
                        // Toggle the status based on the current status
                        set: currentSubjects.map((subject) => ({
                          id: subject.id,
                          status: !subject.status, // Toggle the status
                        })),
                      },
                    },
                  });
              
                  res.json({ sts: true, msg: 'Subjects has been updated successfully' });
                } catch (error) {
                  console.error('Error in updating subjects:', error);
                  res.status(500).json({ sts: false, msg: 'Error in updating subjects' });
                }
};

module.exports = {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  enableDisableSubject,
};
