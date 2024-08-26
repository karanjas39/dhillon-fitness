import { z } from "zod";

// SCHEMAS
export const z_createAdmin = z.object({
  email: z.string().trim().email(),
  name: z.string().trim(),
  password: z.string().trim().min(6),
});

export const z_updateAdmin = z.object({
  email: z.string().trim().email(),
  name: z.string().trim(),
  dailyTarget: z.number(),
});

export const z_createUser = z
  .object({
    name: z.string().trim(),
    email: z.string().trim().email().or(z.literal("").optional()),
    dob: z.string().trim().datetime({ precision: 3 }).optional(),
    phone: z.string().trim().min(10).max(10),
    address: z.string().trim(),
    sex: z.enum(["male", "female"]),
    membershipId: z.string().trim().uuid().or(z.literal("").optional()),
    paymentAmount: z.coerce.number().or(z.literal(0).optional()),
    startDate: z
      .string()
      .trim()
      .datetime({ precision: 3 })
      .or(z.literal("").optional()),
  })
  .refine(
    (data) => {
      const { membershipId, startDate } = data;
      const allProvided = membershipId !== "" && startDate !== "";
      const noneProvided = membershipId === "" && startDate === "";
      return allProvided || noneProvided;
    },
    {
      message:
        "If one of 'membershipId' or 'startDate' is provided, all must be provided.",
      path: ["membershipId", "startDate"],
    }
  );

export const z_updateUser = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().optional(),
  email: z.string().trim().email().or(z.literal("").optional()),
  phone: z.string().trim().min(10).max(10).optional(),
  address: z.string().trim().optional(),
  dob: z.string().trim().datetime({ precision: 3 }).optional(),
  sex: z.enum(["male", "female"]).optional(),
});

export const z_clearBalance = z.object({
  userId: z.string(),
  amount: z.number(),
  type: z.enum(["refund", "payment"]),
});

export const z_createMembership = z.object({
  name: z.string().trim(),
  description: z.string().trim().optional(),
  durationDays: z.number(),
  price: z.number(),
});

export const z_userActivation = z.object({
  userId: z.string(),
  active: z.boolean(),
});

export const z_onlyActive = z.object({
  onlyActive: z.boolean(),
});

export const z_createUserMembership = z.object({
  userId: z.string(),
  membershipId: z.string(),
  paymentAmount: z.number(),
  startDate: z.string().trim().datetime({ precision: 3 }),
});

export const z_updateUserMembership = z.object({
  id: z.string().trim().uuid(),
  membershipId: z.string().trim().uuid().optional(),
  startDate: z.string().trim().datetime({ precision: 3 }).optional(),
  endDate: z.string().trim().datetime({ precision: 3 }).optional(),
  priceAtPurchase: z.number().optional(),
  paymentAmount: z.number().optional(),
});

export const z_deleteUserMembership = z.object({
  id: z.string(),
  userId: z.string(),
});

export const z_signin = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});

export const z_id = z.object({
  id: z.string().trim().uuid(),
});

export const z_updateMembership = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().optional(),
  description: z.string().trim().optional(),
  durationDays: z.number().optional(),
  price: z.number().optional(),
  active: z.boolean().optional(),
});

export const z_updatePassword = z.object({
  newPassword: z.string().trim().min(6),
  confirmNewPassword: z.string().trim().min(6).optional(),
  prevPassword: z.string().trim().min(6),
});

// Types
export type z_createAdmin_type = z.infer<typeof z_createAdmin>;
export type z_updateAdmin_type = z.infer<typeof z_updateAdmin>;
export type z_clearBalance_type = z.infer<typeof z_clearBalance>;
export type z_userActivation_type = z.infer<typeof z_userActivation>;
export type z_updatePassword_type = z.infer<typeof z_updatePassword>;
export type z_createUser_type = z.infer<typeof z_createUser>;
export type z_updateUser_type = z.infer<typeof z_updateUser>;
export type z_createMembership_type = z.infer<typeof z_createMembership>;
export type z_deleteUserMembership_type = z.infer<
  typeof z_deleteUserMembership
>;
export type z_updateMembership_type = z.infer<typeof z_updateMembership>;
export type z_createUserMembership_type = z.infer<
  typeof z_createUserMembership
>;
export type z_updateUserMembership_type = z.infer<
  typeof z_updateUserMembership
>;
export type z_signin_type = z.infer<typeof z_signin>;
export type z_id_type = z.infer<typeof z_id>;
export type z_onlyActive_type = z.infer<typeof z_onlyActive>;
