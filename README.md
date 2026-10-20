# Simple Shop Project

A simple shop project implementing the same architecture as `almustasharCrmServerSide`.

## Architecture Overview

This project follows a modular, layered architecture pattern:

```
src/
├── app.js                 # Express app setup
├── server.js              # Entry point
├── config/                # Configuration files
│   ├── env.config.js      # Environment configuration
│   ├── database.js        # Database connection (Sequelize)
│   ├── messages.js        # Error/Success messages
│   ├── constants.js       # Regex patterns
│   ├── permissions.js     # Permission system
│   └── model.index.js     # Model relationships
├── core/                  # Core utilities and middlewares
│   ├── middlewares/
│   │   ├── auth.middleware.js       # JWT authentication
│   │   ├── validation.js            # AJV validation
│   │   ├── user.authorization.js    # Permission/Operation checks
│   │   ├── globalError.middleware.js # Global error handler
│   │   ├── rateLimiter.js           # Rate limiting
│   │   └── upload.middleware.js     # File upload handling
│   ├── utils/
│   │   ├── handleAsync.js           # Async wrapper
│   │   ├── AppError.js              # Custom error class
│   │   ├── pagination.js            # Pagination helpers
│   │   ├── global.schema.js         # Global validation schemas
│   │   └── password.utils.js        # Password hashing
│   └── jobs/
│       └── index.js                 # Cron jobs entry
└── modules/               # Feature modules
    ├── index.admin.router.js        # Admin routes aggregator
    ├── categories/                  # Category module
    │   ├── models/
    │   ├── services/
    │   ├── controllers/
    │   ├── routes/v1/
    │   ├── validations/
    │   └── category.config.js
    └── products/                    # Product module
        ├── models/
        ├── services/
        ├── controllers/
        ├── routes/v1/
        ├── validations/
        └── product.config.js
```

## Key Patterns Used

1. **Module-based Structure**: Each feature (categories, products) is self-contained
2. **Layered Architecture**: Routes → Controllers → Services → Models
3. **Configuration-driven**: Messages, validations, permissions in config files
4. **AJV Validation**: JSON Schema validation with custom error messages
5. **Permission System**: Page-level permissions + operation-level permissions
6. **Soft Deletes**: Using `isDeleted` flag instead of hard deletes
7. **Global Error Handling**: Centralized error handling with AppError class
8. **Async Wrapper**: `handleAsync` to catch async errors automatically

## Getting Started

1. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the database (MySQL):
   ```sql
   CREATE DATABASE simple_shop_db;
   ```

4. Run the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Categories
- `GET /api/dashboard/categories/v1` - List categories (paginated, searchable)
- `GET /api/dashboard/categories/v1/:id` - Get category by ID
- `POST /api/dashboard/categories/v1` - Create category
- `PATCH /api/dashboard/categories/v1/:id` - Update category
- `DELETE /api/dashboard/categories/v1/:id` - Soft delete category

### Products
- `GET /api/dashboard/products/v1` - List products (paginated, searchable, with category)
- `GET /api/dashboard/products/v1/:id` - Get product by ID
- `POST /api/dashboard/products/v1` - Create product
- `PATCH /api/dashboard/products/v1/:id` - Update product
- `DELETE /api/dashboard/products/v1/:id` - Soft delete product

## Permissions

The permission system uses:
- **Page Permissions**: `hasPermission(pagecheck.PERMISSIONS.CATEGORIES.id)`
- **Operation Permissions**: `hasOperation(OPERATIONS.READ/CREATE/UPDATE/DELETE)`

JWT token must include permissions in the payload:
```json
{
  "id": 1,
  "permissions": [
    { "permissionId": 1, "operations": [1, 2, 3, 4] }
  ]
}
```

## Technologies Used

- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **AJV** - JSON Schema validation
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **multer** - File uploads
- **helmet, cors, morgan** - Security & logging
- **express-rate-limit** - Rate limiting