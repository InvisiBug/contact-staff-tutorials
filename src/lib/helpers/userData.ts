import { user1 } from "../../users/user1";
import type { Meta, Move } from "@/lib/types";

export type UserMoveData = Partial<Omit<Meta, "id">>;
export type UserMoveDataSet = readonly Readonly<Record<string, UserMoveData>>[];

export const userData = {
  user1,
} satisfies Record<string, UserMoveDataSet>;

export type UserId = keyof typeof userData;

export const getUserMoves = (userId: UserId = "user1"): UserMoveDataSet => userData[userId];

/**
 * Applies a user's move-specific values over the values from the staff database.
 * Staff moves without a matching user entry are returned unchanged.
 */
export const enrichStaffDatabase = (moves: readonly Move[], userMoves: UserMoveDataSet): Move[] => {
  const overridesByMoveId = new Map<string, UserMoveData>();

  userMoves.forEach((userMove) => {
    Object.entries(userMove).forEach(([moveId, overrides]) => {
      overridesByMoveId.set(moveId, overrides);
    });
  });
  console.log("🚀 ~ enrichStaffDatabase ~ overridesByMoveId:", overridesByMoveId);

  return moves.map((move) => {
    const overrides = overridesByMoveId.get(move.meta.id);
    console.log("🚀 ~ enrichStaffDatabase ~ overrides:", overrides);

    return overrides
      ? {
          ...move,
          meta: {
            ...move.meta,
            ...overrides,
          },
          overriddenProperties: [...new Set([...(move.overriddenProperties ?? []), ...Object.keys(overrides)])],
        }
      : move;
  });
};
