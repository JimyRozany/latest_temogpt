-- CreateTable
CREATE TABLE "QuestionDegree" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "degree" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    CONSTRAINT "QuestionDegree_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "score" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "UserScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PassingDegree" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "degree" INTEGER NOT NULL
);
