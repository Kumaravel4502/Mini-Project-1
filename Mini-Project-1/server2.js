const { PrismaClient } = require("@prisma/client");
const Express = require("express");
const server = Express();
const prisma = new PrismaClient();
server.use(Express.json()); //middleware

server.get("/", (req, res) => {
  res.send("API WORKING PerFectly");
});

server.get("/students", async (req, res) => {
  const studentdata = await prisma.student.findMany();
  res.json({ data: studentdata });
});

server.get("/students/:RollNo", async (req, res) => {
  //1. Data From Frontend
  const data = parseInt(req.params.RollNo);

  //2.DB Logic

  const studentData = await prisma.student.findUnique({
    where: {
      RollNo: data,
    },
  });

  //3.Data to Frontend
  res.json({ data: studentData });
});

//POST: http://localhost:3000/students

server.post("/students", async (req, res) => {
  //1. Data From Frontend
  const { Name, RollNo, Age, PhoneNumber } = req.body;

  //2.DB Logic
  const newStudentData = await prisma.student.create({
    data: {
      Name,
      RollNo,
      Age,
      PhoneNumber,
    },
  });
  res.json({ data: newStudentData });

  //3.Data to Frontend
});

//PUT: http://localhost:3000/students/

server.put("/students", async (req, res) => {
  //1. Data From Frontend
  const { Name, RollNo, Age, PhoneNumber } = req.body;

  //2.DB Logic
  const newStudentData = await prisma.student.update({
    data: {
      Name,
      RollNo,
      Age,
      PhoneNumber,
    },
    where: {
      RollNo: RollNo,
    },
  });
  //3.Data to Frontend
  res.json({ data: newStudentData });
});

// //DELETE: http://localhost:3000/students

// server.delete("/students", async (req, res) => {
//   //1. Data From Frontend
//   const { RollNo } = req.body;

//   //2.DB Logic
//   await prisma.student.delete({
//     where: {
//       RollNo: RollNo,
//     },
//   });
//   //3.Data to Frontend
//   res.json({ Message: " Deleted Student" });
// });

server.delete("/students", async (req, res) => {
  const { RollNo } = req.body;
  await prisma.student.delete({
    where: {
      RollNo: RollNo,
    },
  });
  res.json({ Message: " Deleted Student" });
});

server.listen(3000);
