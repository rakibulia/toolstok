import { eq } from "drizzle-orm";

import { db } from "@/db";
import { contributions } from "@/db/schema";
import {
  createContributionSchema,
  type CreateContributionInput,
} from "@/validation/contribution";

export async function createContribution(
  userId: string,
  input: CreateContributionInput,
) {
  const validated = createContributionSchema.parse(input);

  const [contribution] = await db
    .insert(contributions)
    .values({
      type: validated.type,
      status: "pending",
      userId,
      resourceId: validated.resourceId,
      title: validated.title,
      description: validated.description,
      payload: validated.payload,
    })
    .returning();

  return contribution;
}

export async function getContributionForUser(
  contributionId: string,
  userId: string,
) {
  const result = await db
    .select()
    .from(contributions)
    .where(eq(contributions.id, contributionId))
    .limit(1);

  const contribution = result[0];

  if (!contribution || contribution.userId !== userId) {
    return null;
  }

  return contribution;
}