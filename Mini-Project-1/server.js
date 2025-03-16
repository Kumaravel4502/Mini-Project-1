const { PrismaClient } = require("@prisma/client");
const express = require("express");
const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("API WORKING");
});

//GET: http://localhost:3002/students/

app.get("/students", async (req, res) => {
  //1. Data From Frontend [Optional]

  //2.DB Logic
  const studentData = await prisma.student.findMany();
  //3.Data to Frontend
  res.json({ data: studentData });
});

//GET: http://localhost:3002/students/:RollNo

app.get("/students/:RollNo", async (req, res) => {
  //1. Data From Frontend
  const data = req.params.RollNo;

  //2.DB Logic

  const studentData = await prisma.student.findUnique({
    where: {
      RollNo: data,
    },
  });

  //3.Data to Frontend
  res.json({ data: studentData });
});

//From client/frontend to server using Four possible methods

//params

// POST: http://localhost:3002/students

app.post("/students", async (req, res) => {
  //1. Data From Frontend

  const data = req.body;
  console.log(data);
  //2.DB Logic
  const newstudentdata=await prisma.student.create({
    data:{
      Name:data.Name,
      RollNo:data.RollNo,
      Age:data.Age,
      PhoneNumber:data.PhoneNumber
    }
  })
  
  //3.Data to Frontend
  res.json({ data: newstudentdata });
})


// PUT: http://localhost:3002/students


app.put("/students", async (req, res) => {
  //1. Data From Frontend

  const data = req.body;
  console.log(data);
  //2.DB Logic
  const newstudentdata=await prisma.student.update({
    data:{
      Name:data.Name,
      RollNo:data.RollNo,
      Age:data.Age,
      PhoneNumber:data.PhoneNumber
    },
    where: {
      RollNo: data.RollNo,
    }
  })
  
  //3.Data to Frontend
  res.json({ data: newstudentdata });
})



// DELETE: http://localhost:3002/students


app.delete("/students", async (req, res) => {
  //1. Data From Frontend

  const data = req.body;
  console.log(data);
  //2.DB Logic
await prisma.student.delete({
    where: {
      RollNo: data.RollNo,
    }
  })
  
  //3.Data to Frontend
  res.json({Message:"Deleted Successfully"});
})








app.listen(3002);
