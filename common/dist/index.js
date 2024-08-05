"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z_signin = exports.z_createUserMembership = exports.z_createMembership = exports.z_createUser = exports.z_createAdmin = void 0;
const zod_1 = require("zod");
// SCHEMAS
exports.z_createAdmin = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
exports.z_createUser = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(10).max(10),
    address: zod_1.z.string(),
    sex: zod_1.z.enum(["male", "female"]),
});
exports.z_createMembership = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    durationDays: zod_1.z.number(),
    price: zod_1.z.number(),
});
exports.z_createUserMembership = zod_1.z.object({
    userId: zod_1.z.string().uuid(),
    membershipId: zod_1.z.string().uuid(),
    endDate: zod_1.z.string().datetime(),
    priceAtPurchase: zod_1.z.number(),
});
exports.z_signin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
