/*
  Warnings:

  - A unique constraint covering the columns `[roleDescriptionId]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Roles_roleDescriptionId_key" ON "Roles"("roleDescriptionId");
