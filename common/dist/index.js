"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z_updatePassword = exports.z_updateMembership = exports.z_id = exports.z_signin = exports.z_deleteUserMembership = exports.z_updateUserMembership = exports.z_createUserMembership = exports.z_onlyActive = exports.z_userActivation = exports.z_createMembership = exports.z_clearBalance = exports.z_updateUser = exports.z_createUser = exports.z_updateAdmin = exports.z_createAdmin = void 0;
const zod_1 = require("zod");
// SCHEMAS
exports.z_createAdmin = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    name: zod_1.z.string().trim(),
    password: zod_1.z.string().trim().min(6),
});
exports.z_updateAdmin = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    name: zod_1.z.string().trim(),
    dailyTarget: zod_1.z.number(),
});
exports.z_createUser = zod_1.z
    .object({
    name: zod_1.z.string().trim(),
    email: zod_1.z.string().trim().email().or(zod_1.z.literal("").optional()),
    dob: zod_1.z.string().trim().datetime({ precision: 3 }),
    phone: zod_1.z.string().trim().min(10).max(10),
    address: zod_1.z.string().trim(),
    sex: zod_1.z.enum(["male", "female"]),
    membershipId: zod_1.z.string().trim().uuid().or(zod_1.z.literal("").optional()),
    paymentAmount: zod_1.z.coerce.number().or(zod_1.z.literal(0).optional()),
    startDate: zod_1.z
        .string()
        .trim()
        .datetime({ precision: 3 })
        .or(zod_1.z.literal("").optional()),
})
    .refine((data) => {
    const { membershipId, startDate } = data;
    const allProvided = membershipId !== "" && startDate !== "";
    const noneProvided = membershipId === "" && startDate === "";
    return allProvided || noneProvided;
}, {
    message: "If one of 'membershipId' or 'startDate' is provided, all must be provided.",
    path: ["membershipId", "startDate"],
});
exports.z_updateUser = zod_1.z.object({
    id: zod_1.z.string().trim().uuid(),
    name: zod_1.z.string().trim().optional(),
    email: zod_1.z.string().trim().email().or(zod_1.z.literal("").optional()),
    phone: zod_1.z.string().trim().min(10).max(10).optional(),
    address: zod_1.z.string().trim().optional(),
    dob: zod_1.z.string().trim().datetime({ precision: 3 }).optional(),
    sex: zod_1.z.enum(["male", "female"]).optional(),
});
exports.z_clearBalance = zod_1.z.object({
    userId: zod_1.z.string().trim().uuid(),
    amount: zod_1.z.coerce.number(),
    type: zod_1.z.enum(["refund", "payment"]),
});
exports.z_createMembership = zod_1.z.object({
    name: zod_1.z.string().trim(),
    description: zod_1.z.string().trim().optional(),
    durationDays: zod_1.z.coerce.number(),
    price: zod_1.z.coerce.number(),
});
exports.z_userActivation = zod_1.z.object({
    userId: zod_1.z.string().trim().uuid(),
    active: zod_1.z.boolean(),
});
exports.z_onlyActive = zod_1.z.object({
    onlyActive: zod_1.z.boolean(),
});
exports.z_createUserMembership = zod_1.z.object({
    userId: zod_1.z.string().trim().uuid(),
    membershipId: zod_1.z.string().trim().uuid(),
    paymentAmount: zod_1.z.coerce.number(),
    startDate: zod_1.z.string().trim().datetime(),
});
exports.z_updateUserMembership = zod_1.z.object({
    id: zod_1.z.string().trim().uuid(),
    membershipId: zod_1.z.string().trim().uuid().optional(),
    startDate: zod_1.z.string().trim().datetime({ precision: 3 }).optional(),
    endDate: zod_1.z.string().trim().datetime({ precision: 3 }).optional(),
    priceAtPurchase: zod_1.z.coerce.number().optional(),
    paymentAmount: zod_1.z.coerce.number().optional(),
});
exports.z_deleteUserMembership = zod_1.z.object({
    id: zod_1.z.string().trim().uuid(),
    userId: zod_1.z.string().trim().uuid(),
});
exports.z_signin = zod_1.z.object({
    email: zod_1.z.string().trim().email(),
    password: zod_1.z.string().trim().min(6),
});
exports.z_id = zod_1.z.object({
    id: zod_1.z.string().trim().uuid(),
});
exports.z_updateMembership = zod_1.z.object({
    id: zod_1.z.string().trim().uuid(),
    name: zod_1.z.string().trim().optional(),
    description: zod_1.z.string().trim().optional(),
    durationDays: zod_1.z.coerce.number().optional(),
    price: zod_1.z.coerce.number().optional(),
    active: zod_1.z.boolean().optional(),
});
exports.z_updatePassword = zod_1.z.object({
    newPassword: zod_1.z.string().trim().min(6),
    confirmNewPassword: zod_1.z.string().trim().min(6).optional(),
    prevPassword: zod_1.z.string().trim().min(6),
});
