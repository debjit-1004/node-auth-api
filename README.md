
---

## Architecture

This project follows a modular and layered architecture:

1. **Controllers**:  
   Contain the business logic and interact with the models. For example:
   - `authController.js`: Handles login, registration, and token generation.
   - `roleController.js`: Manages role assignment and permissions.

2. **Models**:  
   Define the database structure using Mongoose. For example:
   - `User.js`: Represents a user schema with fields like `name`, `email`, `password`, and `role`.
   - `Role.js`: Represents roles and their permissions.

3. **Routes**:  
   Define API endpoints and map them to appropriate controllers. For example:
   - `/auth`: Endpoints for login and registration.
   - `/admin`: Endpoints accessible only by admin users.

4. **Middlewares**:  
   Ensure security and validation of requests:
   - `authMiddleware.js`: Verifies JWT tokens and assigns user roles.
   - `roleMiddleware.js`: Checks user permissions for specific routes.

5. **Helpers**:  
   Contain reusable utility functions, such as hashing passwords or generating JWT tokens.

6. **Views and Public**:  
   Used for rendering client-facing templates or serving static files (optional).

---

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/user-roles-auth
   cd user-roles-auth

2. Install dependencies:
   npm install 

3. Set up the environment variables in a .env file:
   PORT=3000
   DB_URI=mongodb://localhost:27017/user_roles_db
   JWT_SECRET=your_secret_key

4. Run the application:
   npm run dev

