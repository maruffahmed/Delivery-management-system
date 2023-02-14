/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `RoleDescription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RoleDescription_name_key" ON "RoleDescription"("name");
