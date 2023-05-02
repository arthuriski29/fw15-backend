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
  ALTER TABLE "events" ADD COLUMN "createdBy" INTEGER;

  DROP TABLE "categories";
  DROP TABLE "partners";
  INSERT INTO "eventCategories" ("eventId", "categoryId") VALUES
(1,1), (1,6), (2,7), (3,3), (4,4), (5,5);
  INSERT INTO "events" ("createdBy") VALUES
(1,1), (1,6), (2,7), (3,3), (4,4), (5,5);


INSERT INTO "reservationStatus" ("name") VALUES
('PENDING'), ('PAID'), ('EXPIRED');
INSERT INTO "reservationSections" ("name", "price") VALUES
('SECTION REG, ROW 1', 15), ('SECTION VIP, ROW 2', 35), ('SECTION VVIP, ROW 3', 50);
INSERT INTO "paymentMethod" ("name") VALUES
('card'), ('bankTransfer'), ('retail'), ('eMoney');
INSERT INTO "reservations" ("eventId", "userId", "status", "paymentMethodId") VALUES
(1, 8, 1, 4), (6, 10, 2, 2), (2 ,11, 3, 3);
INSERT INTO "reservationTicket" ("reservationId", "sectionId", "quantity") VALUES
(1, 1, 5), (2, 3, 10), (3, 2, 9);
