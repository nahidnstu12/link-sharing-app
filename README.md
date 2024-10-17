## Assignment (DEV LINK SHARE)

# DevLinks - Profile Links Management App

DevLinks is a full-stack web application that allows users to create, update, delete, and reorder profile links, along with managing their profile details. It is built using **Next.js**, **React**, **MongoDB**, and **Tailwind CSS** with **Context API** for state management, **React Hook Form** for form handling, and **Yup Resolver** for validation. Here, when profile upload through api, this will store in public/uploads folder, save in mongo link, later serve to frontend

## Features

Users should be able to:

- Create, read, update, delete links and see previews in the mobile mockup
- Receive validations if the links form is submitted without a URL or with the wrong URL pattern for the platform
- Drag and drop links to reorder them (**not implemented**)
- Add profile details like profile picture, first name, last name, and email
- Receive validations if the profile details form is saved with no first or last name
- Preview their devlinks profile and copy the link to their clipboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page 
- Save details to a database (build the project as a full-stack app) 
- Create an account and log in (add user authentication to the full-stack app)

### Live Demo
You can try out the live demo at https://link-sharing-app-test.vercel.app/login

You can login with the following credentials or sign up:
```
email : nahid@mail.com
password : password
```

Here is the planning and workflow documentation for this project on Notion: [Assignment Dev Share Link](https://nahid-me.notion.site/Assignment-dev-share-link-11aca934b37480dc93f7eebeb021708c)



### Future Work (Not Completed Yet):
- Backend input validation.
- Link reordering through drag-and-drop functionality.
- Public sharing of the profile link.

## Tech Stack

- **Frontend**:
  - **NEXTJS** - React framework for server-side rendering and static site generation.
  - **YUP** - Schema validation library for form validation.
  - **TAILWIND CSS** - Utility-first CSS framework for styling.

- **Backend**:
  - **MongoDB** - NoSQL database for storing user profiles and links.
  - **Mongoose** - ORM for MongoDB.
  - **Next.js API Routes** - Used to create API endpoints for authentication and data management.

- **State Management**:
  - **Context API** - For managing global application state.



## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/nahidnstu12/link-sharing-app.git
    cd link-sharing-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:

    ```bash
    NEXT_PUBLIC_SECRET_KEY=your-actual-secret-key
    NEXT_PUBLIC_API_URL= http://localhost:3600/api
    MONGODB_URI= mongodb://localhost:27017/link_sharing
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Navigate to `http://localhost:3600` in your browser.

## API Endpoints

- **POST /api/auth/register**: Create a new user.
- **POST /api/auth/login**: Authenticate a user.
- **POST /api/profile/update**: Update profile details (first name, last name, email, profile picture).
- **POST /api/links**: Create a new link.
- **GET /api/links**: Fetch all user links.
- **PUT /api/links/:id**: Update a specific link.
- **DELETE /api/links/:id**: Delete a specific link.
- **POST /api/upload**: Upload prfile photo

## Database Models

### User MOdel

```
{
  email: string;
  password: string;
  photo_path?: string;
  first_name: string;
  last_name: string;
}
```

### Link Model

```
platform: string,
link: string,
color: string,
user_id: string, FK
```

### Project Structure


```
/public
  /images       # Static images
  /uploads      # Uploads image store
/src
  /@core
    /components  # UI components
    /context     # Context API files
    /helpers     # Utility functions
    /hooks       # Custom React hooks
    /lib         # Libraries 
    /types       # TypeScript types
  /app
    /api         # API routes
  /backend
    /models      # Database models
    /services    # Business logic
    db.ts        # Database connection
package.json     # Dependencies and scripts
README           # Project documentation


```
