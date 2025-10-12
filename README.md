# the-privy

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Directory Tree](#directory-tree)
- [License](#license)
- [Credits](#credits)

---

## About

**the-privy** is a simple "members-only" web application built to demonstrate user authentication using Express.js, Passport.js, and PostgreSQL. Developed in conjunction with [The Odin Project](https://www.theodinproject.com/) Node.js curriculum, this project showcases practical usage of modern web development tools and libraries for secure user management.

---

## Tech Stack

- **Backend Framework:** Express.js
- **Authentication:** Passport.js
- **Database:** PostgreSQL
- **ORM/Database Driver:** pg
- **Session Store:** connect-pg-simple
- **Templating Engine:** EJS (with express-ejs-layouts)
- **Other Packages:** node:crypto, dotenv, etc.

---

## Demo

A live demo will be available soon.  
**[Demo Placeholder](https://your-demo-link.com)**

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (local or remote)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/the-privy.git
   cd the-privy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Create a `.env` and fill in your PostgreSQL credentials and session secrets.

4. **Initialize the database:**

   ```bash
   npm run init
   ```

5. **Start the application:**

   ```bash
   npm start
   ```

   - The app will be available at `http://localhost:5000` by default.

---

## Directory Tree

```txt
the-privy/
├── public/
│   └── css/
│       └── style.css
└── server/
    ├── app.js
    ├── config/
    │   └── passport.js
    ├── controllers/
    │   ├── passwordUtils.js
    │   └── queries.js
    ├── db/
    │   ├── init.js
    │   ├── pool.js
    │   ├── schema.sql
    │   └── seed.sql
    ├── routers/
    │   ├── authRouter.js
    │   └── indexRouter.js
    └── views/
        ├── layout.ejs
        └── pages/
            ├── index.ejs
            ├── login.ejs
            ├── post.ejs
            └── signup.ejs
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Credits

This project was developed as part of [The Odin Project](https://www.theodinproject.com/) Node.js curriculum.  
Special thanks to the Odin Project community for their guidance and resources.
