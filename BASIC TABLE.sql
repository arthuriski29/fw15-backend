CREATE TABLE "users" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "username" VARCHAR(255),
  "email" VARCHAR(255) UNIQUE,
  "password" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);

INSERT INTO "users" ("email", "password") VALUES ('fazztrack@mail.com', '1234');
UPDATE "users" SET "email"='admin@mail.com' WHERE "id"=1;
DELETE FROM "users" WHERE "id"=5;
SELECT * FROM "users" WHERE "id"=325;




CREATE TABLE "profile" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "picture" VARCHAR(255),
  "fullName" VARCHAR(255),
  "phoneNumber" VARCHAR(255),
  "gender" BOOLEAN,
  "profession" VARCHAR(255),
  "nationality" VARCHAR(255),
  "birthDate" DATE,

  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
ALTER TABLE "profile" DROP COLUMN "phoneNumber";
ALTER TABLE "profile" ADD COLUMN "phoneNumber" VARCHAR(255);
ALTER TABLE "profile" ADD COLUMN "userId" INTEGER;


CREATE TABLE "events" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "picture" VARCHAR(255),
  "title" VARCHAR(255),
  "date" DATE,
  "cityId" INTEGER,
  "descriptions" TEXT,

  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "eventCategories" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "eventId" INTEGER,
  "categoryId" INTEGER,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "categories" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "cities" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "picture" VARCHAR(255),
  "name" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "partners" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "picture" VARCHAR(255),
  "name" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservationSections" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255),
  "price" INTEGER,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservationStatus" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "paymentMethod" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "name" VARCHAR(255),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservations" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "eventId" INTEGER,
  "userId" INTEGER,
  "status" INTEGER,
  "paymentMethodId" INTEGER,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "reservationTicket" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "reservationId" INTEGER,
  "sectionId" INTEGER,
  "quantity" INTEGER,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);
CREATE TABLE "wishlist" (
  "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "eventId" INTEGER,
  "userId" INTEGER,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);

CREATE TABLE "forgotRequest" (
"id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
"email" VARCHAR(255),
"code" VARCHAR(255),
"createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NULL
);


ALTER TABLE "profile" ADD COLUMN "userId" INTEGER;

CREATE TABLE "forgotRequest" (
"id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
"email" VARCHAR(255),
"code" VARCHAR(255),
"createdAt" TIMESTAMP DEFAULT NOW(),
"updatedAt" TIMESTAMP DEFAULT NULL
);

SELECT * FROM "forgotRequest" WHERE "email"='undertaker@mail.com' AND "code"='692990';
SELECT * FROM "forgotRequest" WHERE "email"='undertaker@mail.com';
 DELETE FROM "forgotRequest" WHERE "id"='2' RETURNING *;
 DELETE FROM "profile" WHERE "email"='undertaker@mail.com' RETURNING *;
 DELETE FROM "profile" WHERE "id"='6' RETURNING *;
 DELETE FROM "profile" WHERE "id"='3' RETURNING *;
 DELETE FROM "users" WHERE "email"='lionelmessi@mail.com' RETURNING *;
 DELETE FROM "users" WHERE "id"='2' RETURNING *;
  SELECT * FROM "profile" WHERE "userId"=7;

  ALTER TABLE "cities" ADD COLUMN "mapLocation" VARCHAR(255);

  DROP TABLE "categories";
  DROP TABLE "partners";
