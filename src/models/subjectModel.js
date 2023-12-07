const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//create subject
const createSubject = async ({ subject_name, category, sub_category, discipline, level, subject }) => {
         try {
           const newSubject = await prisma.subject.create({
             data: {
               description: subject_name,sub_category,discipline,level,subject,
               subjectId: category,
               chapters: 0,
               semesters: 0,
             },
           });
           return newSubject;
         } catch (error) {
           throw new Error('Error in creating subject');
         }
};
  
//Get all subjects
const getSubjects = async () => {
         try {
           const subjects = await prisma.subject.findMany();
           return subjects;
         } catch (error) {
           throw new Error('Error in fetching subjects');
         }
};
  
//update the subject with name
const updateSubject = async ({ subject_id, subject_name }) => {
         try {
           const updatedSubject = await prisma.subject.update({
             where: {
               id: subject_id,
             },
             data: {
               description: subject_name,
             },
           });
           return updatedSubject;
         } catch (error) {
           throw new Error('Error in updating subject');
         }
       
};
       
//delete the subject
const deleteSubjects = async (subjectIds) => {
         try {
           const deleteResult = await prisma.subject.deleteMany({
             where: {
               id: {
                 in: subjectIds,
               },
             },
           });
           return deleteResult.count;
         } catch (error) {
           throw new Error('Error in deleting subjects');
         }
};
       
//make active or inactive of a subject
const enableDisableSubjects = async (subjectIds) => {
         try {
           const currentSubjects = await prisma.subject.findMany({
             where: {
               id: {
                 in: subjectIds,
               },
             },
             select: {
               id: true,
               status: true,
             },
           });
       
           const updatedSubjects = await prisma.subject.updateMany({
             where: {
               id: {
                 in: subjectIds,
               },
             },
             data: {
               status: {
                 set: currentSubjects.map((subject) => ({
                   id: subject.id,
                   status: !subject.status,
                 })),
               },
             },
           });
       
           return updatedSubjects.count;
         } catch (error) {
           throw new Error('Error in updating subjects status');
         }
};
       
module.exports = {
         createSubject,
         getSubjects,
         updateSubject,
         deleteSubjects,
         enableDisableSubjects,
};
