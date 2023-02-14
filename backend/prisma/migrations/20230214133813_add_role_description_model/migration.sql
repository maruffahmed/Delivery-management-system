/*
  Warnings:

  - You are about to drop the column `description` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Roles` table. All the data in the column will be lost.
  - Added the required column `roleDescriptionId` to the `Roles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "RoleDescription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Roles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "roleDescriptionId" INTEGER NOT NULL,
    CONSTRAINT "Roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Roles_roleDescriptionId_fkey" FOREIGN KEY ("roleDescriptionId") REFERENCES "RoleDescription" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Roles" ("id", "userId") SELECT "id", "userId" FROM "Roles";
DROP TABLE "Roles";
ALTER TABLE "new_Roles" RENAME TO "Roles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
