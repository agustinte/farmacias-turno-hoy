-- CreateTable
CREATE TABLE "FarmaciaLocalidad" (
    "farmaciaId" INTEGER NOT NULL,
    "localidadId" INTEGER NOT NULL,

    PRIMARY KEY ("farmaciaId", "localidadId"),
    CONSTRAINT "FarmaciaLocalidad_farmaciaId_fkey" FOREIGN KEY ("farmaciaId") REFERENCES "Farmacia" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FarmaciaLocalidad_localidadId_fkey" FOREIGN KEY ("localidadId") REFERENCES "Localidad" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Preserve each pharmacy's existing locality association.
INSERT INTO "FarmaciaLocalidad" ("farmaciaId", "localidadId")
SELECT "id", "localidadId" FROM "Farmacia";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Farmacia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT,
    "lat" REAL,
    "lng" REAL
);
INSERT INTO "new_Farmacia" ("direccion", "id", "lat", "lng", "nombre", "telefono")
SELECT "direccion", "id", "lat", "lng", "nombre", "telefono" FROM "Farmacia";
DROP TABLE "Farmacia";
ALTER TABLE "new_Farmacia" RENAME TO "Farmacia";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "FarmaciaLocalidad_localidadId_idx" ON "FarmaciaLocalidad"("localidadId");
