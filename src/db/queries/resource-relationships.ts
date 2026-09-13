import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  resourceRelationships,
  resourceRelationshipTypeEnum,
} from "@/db/schema";

export async function getResourceRelationships(
  resourceId: string,
) {
  return db
    .select()
    .from(resourceRelationships)
    .where(
      eq(
        resourceRelationships.sourceResourceId,
        resourceId,
      ),
    );
}

export async function getRelatedResources(
  resourceId: string,
  relationshipType?: (
    typeof resourceRelationshipTypeEnum.enumValues
  )[number],
) {
  const conditions = [
    eq(resourceRelationships.sourceResourceId, resourceId),
  ];

  if (relationshipType) {
    conditions.push(
      eq(
        resourceRelationships.relationshipType,
        relationshipType,
      ),
    );
  }

  return db
    .select()
    .from(resourceRelationships)
    .where(and(...conditions));
}

export async function getResourceRelationshipsByType(
  resourceId: string,
  relationshipType: (
    typeof resourceRelationshipTypeEnum.enumValues
  )[number],
) {
  return db
    .select()
    .from(resourceRelationships)
    .where(
      and(
        eq(
          resourceRelationships.sourceResourceId,
          resourceId,
        ),
        eq(
          resourceRelationships.relationshipType,
          relationshipType,
        ),
      ),
    );
}

export async function getResourceRelationship(
  sourceResourceId: string,
  targetResourceId: string,
  relationshipType: (
    typeof resourceRelationshipTypeEnum.enumValues
  )[number],
) {
  const result = await db
    .select()
    .from(resourceRelationships)
    .where(
      and(
        eq(
          resourceRelationships.sourceResourceId,
          sourceResourceId,
        ),
        eq(
          resourceRelationships.targetResourceId,
          targetResourceId,
        ),
        eq(
          resourceRelationships.relationshipType,
          relationshipType,
        ),
      ),
    )
    .limit(1);

  return result[0] ?? null;
}