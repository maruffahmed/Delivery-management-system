/*
  Warnings:

  - Added the required column `name` to the `PickUpPoints` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PickUpPoints" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "shopsId" INTEGER NOT NULL,
    CONSTRAINT "PickUpPoints_shopsId_fkey" FOREIGN KEY ("shopsId") REFERENCES "Shops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PickUpPoints" ("address", "area", "id", "isActive", "phone", "shopsId") SELECT "address", "area", "id", "isActive", "phone", "shopsId" FROM "PickUpPoints";
DROP TABLE "PickUpPoints";
ALTER TABLE "new_PickUpPoints" RENAME TO "PickUpPoints";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
