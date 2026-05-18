-- CreateTable
CREATE TABLE "Localidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Farmacia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" TEXT,
    "lat" REAL,
    "lng" REAL,
    "localidadId" INTEGER NOT NULL,
    CONSTRAINT "Farmacia_localidadId_fkey" FOREIGN KEY ("localidadId") REFERENCES "Localidad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Turno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "farmaciaId" INTEGER NOT NULL,
    "fechaInicio" DATETIME NOT NULL,
    "fechaFin" DATETIME NOT NULL,
    CONSTRAINT "Turno_farmaciaId_fkey" FOREIGN KEY ("farmaciaId") REFERENCES "Farmacia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Localidad_slug_key" ON "Localidad"("slug");

-- CreateIndex
CREATE INDEX "Turno_fechaInicio_fechaFin_idx" ON "Turno"("fechaInicio", "fechaFin");
