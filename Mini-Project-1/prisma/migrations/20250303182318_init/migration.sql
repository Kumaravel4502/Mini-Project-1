-- CreateTable
CREATE TABLE "Student" (
    "Name" TEXT NOT NULL,
    "RollNo" INTEGER NOT NULL,
    "PhoneNumber" INTEGER NOT NULL,
    "Age" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_RollNo_key" ON "Student"("RollNo");
