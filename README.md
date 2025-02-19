# Angular Project README

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.3.

## Project Overview

This is an Angular-based frontend application that utilizes PrimeNG for UI components. The project interacts with a fake API to perform CRUD operations on users and products while implementing authentication and authorization features.

## Technologies Used

-Frontend: Angular, PrimeNG, Tailwind CSS

-Backend API: Fake API with CRUD support

-Authentication: Implemented with Authorization & Authentication mechanisms

-Database: Simulated with a fake API

## Features

-User Authentication & Authorization

-CRUD Operations on Users & Products

-Responsive UI with PrimeNG and Bootstrap

-Routing and Navigation

-Form Validation

-State Management

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

-Node.js (LTS version recommended)

-Angular CLI

-npm

### Steps to Run the Project

1. Clone the repository:

```bash
git clone https://github.com/Jaouaher999/Estiam-Frontend.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

4. Open your browser and navigate to:

```bash
http://localhost:4200/
```

## API Integration

The project is integrated with a fake API that provides endpoints for:

-Users: Create, Read, Update

-Products: Create, Read, Update, Delete

-Authentication: Login and authorization

## Deployment

To deploy the project:

Build the application:

```bash
ng build --configuration=production
```

Serve the dist/ folder using a web server such as Nginx, Apache, or Firebase Hosting.

## Contributing

1. Fork the repository

2. Create a new branch (feature-branch)

3. Commit your changes

4. Push to your branch and create a pull request

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.