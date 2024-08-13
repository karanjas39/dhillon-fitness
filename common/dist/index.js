"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z_updatePassword = exports.z_updateMembership = exports.z_id = exports.z_signin = exports.z_updateUserMembership = exports.z_createUserMembership = exports.z_onlyActive = exports.z_userActivation = exports.z_createMembership = exports.z_clearBalance = exports.z_updateUser = exports.z_createUser = exports.z_createAdmin = void 0;
const zod_1 = require("zod");
// SCHEMAS
exports.z_createAdmin = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
exports.z_createUser = zod_1.z
    .object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email().or(zod_1.z.literal("").optional()),
    dob: zod_1.z.string().datetime(),
    phone: zod_1.z.string().min(10).max(10),
    address: zod_1.z.string(),
    sex: zod_1.z.enum(["male", "female"]),
    membershipId: zod_1.z.string().uuid().optional(),
    paymentAmount: zod_1.z.coerce.number().optional(),
    startDate: zod_1.z.string().datetime().optional(),
})
    .refine((data) => {
    const { membershipId, paymentAmount, startDate } = data;
    const allProvided = membershipId && paymentAmount && startDate;
    const noneProvided = !membershipId && paymentAmount === undefined && !startDate;
    return allProvided || noneProvided;
}, {
    message: "If one of 'membershipId', 'paymentAmount', or 'startDate' is provided, all must be provided.",
    path: ["membershipId", "paymentAmount", "startDate"],
});
exports.z_updateUser = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().or(zod_1.z.literal("").optional()),
    phone: zod_1.z.string().min(10).max(10).optional(),
    address: zod_1.z.string().optional(),
    dob: zod_1.z.string().datetime().optional(),
    sex: zod_1.z.enum(["male", "female"]).optional(),
});
exports.z_clearBalance = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    amount: zod_1.z.coerce.number(),
});
exports.z_createMembership = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    durationDays: zod_1.z.coerce.number(),
    price: zod_1.z.coerce.number(),
});
exports.z_userActivation = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    active: zod_1.z.boolean(),
});
exports.z_onlyActive = zod_1.z.object({
    onlyActive: zod_1.z.boolean(),
});
exports.z_createUserMembership = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    membershipId: zod_1.z.string().uuid(),
    paymentAmount: zod_1.z.coerce.number(),
    startDate: zod_1.z.string().datetime(),
});
exports.z_updateUserMembership = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    membershipId: zod_1.z.string().uuid().optional(),
    startDate: zod_1.z.string().datetime().optional(),
    endDate: zod_1.z.string().datetime().optional(),
    priceAtPurchase: zod_1.z.coerce.number().optional(),
    paymentAmount: zod_1.z.coerce.number().optional(),
});
exports.z_signin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.z_id = zod_1.z.object({
    id: zod_1.z.string().uuid(),
});
exports.z_updateMembership = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    durationDays: zod_1.z.coerce.number().optional(),
    price: zod_1.z.coerce.number().optional(),
    active: zod_1.z.boolean().optional(),
});
exports.z_updatePassword = zod_1.z.object({
    newPassword: zod_1.z.string().min(6),
    confirmNewPassword: zod_1.z.string().min(6).optional(),
    prevPassword: zod_1.z.string().min(6),
});
