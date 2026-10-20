// ======================= PERMISSIONS SYSTEM =======================
// Defines permissions, operations, and helper functions for RBAC
// Used by middleware for page-level and operation-level authorization

export const OPERATIONS = Object.freeze({
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
});

export const PERMISSIONS = Object.freeze({
  USERS: {
    id: 1,
    name: "users",
  },
  PRODUCTS: {
    id: 2,
    name: "products",
  },
  CATEGORIES: {
    id: 3,
    name: "categories",
  },
});

export const allowedPermissions = Object.values(PERMISSIONS).map((p) => p.id);
export const allowedOperations = Object.values(OPERATIONS);

export const mapPermissionsToNames = (permissions) => {
  return permissions.map((p) => {
    const perm = Object.values(PERMISSIONS).find((perm) => perm.id === p.permissionId);
    return perm ? perm.name : p.permissionId;
  });
};

export const mapPermissionsToFullDetails = (permissions) => {
  return permissions.map((p) => {
    const perm = Object.values(PERMISSIONS).find((perm) => perm.id === p.permissionId);
    const operations = typeof p.operations === "string" ? JSON.parse(p.operations) : p.operations;
    return {
      permissionId: p.permissionId,
      permissionName: perm ? perm.name : "unknown",
      operations: operations.map((op) => {
        const opName = Object.keys(OPERATIONS).find((key) => OPERATIONS[key] === op);
        return opName ? opName.toLowerCase() : op;
      }),
    };
  });
};