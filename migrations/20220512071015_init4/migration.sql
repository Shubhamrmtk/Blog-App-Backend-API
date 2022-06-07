-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "like" BOOLEAN NOT NULL DEFAULT false,
    "dislike" BOOLEAN NOT NULL DEFAULT false,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
