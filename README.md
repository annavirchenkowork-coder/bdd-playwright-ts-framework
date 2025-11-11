# 🧩 BDD Playwright TypeScript Framework
### 🧠 A Type-safe BDD Automation Framework for modern web testing — powered by Playwright, CucumberJS, and TypeScript.<br>
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Playwright](https://img.shields.io/badge/Playwright-1.56.1-2EAD33?logo=playwright)
![CucumberJS](https://img.shields.io/badge/CucumberJS-12.2.0-23D96C?logo=cucumber)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![ESLint](https://img.shields.io/badge/ESLint-Configured-4B32C3?logo=eslint)
![Prettier](https://img.shields.io/badge/Code_Style-Prettier-F7B93E?logo=prettier)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)


**The BDD Playwright TypeScript Framework** is a modular, end-to-end **test automation project** built to validate a secure and seamless **Self-Enrollment Portal (SEP)** checkout experience.  
This upgraded version is powered by **TypeScript**, ensuring type safety, cleaner IntelliSense, and maintainable code for large-scale automation projects.

It covers the full user journey — from product selection and personal data entry to payment plan configuration, terms agreement, and final payment — ensuring accuracy and stability across user flows.

---

## 📚 Table of Contents
1. [Prerequisites](#Prerequisites)
2. [Environment Setup](#environment-setup)
3. [Framework Structure and Usage](#framework-structure-and-usage)
4. [Project and Git Workflow](#project-and-git-workflow)<br>

## ⚙️ Prerequisites

Before running this project, ensure the following tools are installed:

- **Node.js** ≥ v18  
- **npm** ≥ v6 (comes with Node)
- **Git**
- **Visual Studio Code** (recommended IDE)
- **Playwright browsers** (installed automatically)

## 💻 Environment Setup
This project is fully set up and ready to run. To explore or test it on your own device:

### 1. Clone the Repository
```sh
git clone https://github.com/<your-username>/bdd-playwright-framework.git
```

### 2. Open the Project in Your IDE
Navigate to the cloned folder and open it in **VS Code** or your preferred IDE.

### 3. Install Dependencies
```sh
npm install
```

### 4. Configure Environment Variables
This framework uses sample credentials to run end-to-end tests on the demo environment.

If you’d like to run the tests locally, create a `.env` file in the project root with the following content:
```
SEP_QA_URL = https://qa.sep.tdtm.cydeo.com/taws
SEP_USERNAME = automation-user
SEP_PASSWORD = 123abc

CARD_NUMBER = 4242424242424242
EXPIRATION_DATE = 12/28
CVC = 368
ZIP_CODE = 22102
```

⚠️ These are demo credentials for the public test environment. No personal or sensitive data is involved.

The framework uses the dotenv package to load these variables securely into your local environment.

### 5. Run the Tests
To execute all BDD scenarios:
```sh
npm test
```
To execute tests by specific tag or suite:
```sh
npm run test:tag
```

### 6. View the HTML Report
After execution:
```sh
npm run Mac-open:report
```
or on Windows:
```sh
npm run Windows-open:report
```
The report will be available under /reports and can be opened directly in your browser.

## 🧩 Framework Structure and Usage

### 🗂️ 1. `features` Folder
Holds all **Gherkin feature files.**
Each file has a unique tag, allowing specific scenarios to be executed via package.json scripts.

### 🪝 2. `hooks` Folder
Contains **Cucumber global** hooks and Playwright utilities for page and browser lifecycle management.

### 📄 3. `pages` Folder
Stores **Page Object Model (POM)** classes and web element locators.
Every page class should inherit from BasePage and be registered inside globalPagesSetup.js to maintain consistent page access across Playwright fixtures.

### 🧭 4. `steps` Folder
Includes all **step definitions** for the corresponding feature files.<br>
Each file’s name should match its feature file for better traceability.<br>

### ⚙️ 5. `cucumber.cjs` File
Configuration file for **CucumberJS**, specifying paths for steps, support files, formatters, and report output — enabling flexible BDD-style test execution.

### 📦 6. `package.json` File
Defines essential project metadata and dependencies:

- **`Project name`**:  bdd-playwright-framework
- **`Version`**: Marks the current version at "1.0.0"
- **`Entry point`**: Points to the main entry file of the project, "index.js"
- **`Scripts`**: Custom npm commands for test execution and report generation
- **`Dependencies`**: Playwright, Cucumber, dotenv, and reporting libraries
- **`Type`**: Specifies the module system, set to "module" for ES Module support

This configuration powers seamless integration between CucumberJS and Playwright, supporting readable BDD test flows and HTML report generation.<br>

## 🌱 Project and Git Workflow
This project follows a clean and collaborative branching model:
### 1. Clone the repo
```sh
git clone https://github.com/<your-username>/bdd-playwright-framework.git
```
### 2. Create a new branch (for enhancements, fixes, or new tests)
```sh
git checkout -b feature/your-feature-name
```
### 3. Commit your changes
```sh
git add .
git commit -m "Add new feature test for payment flow"
```

### 4. Push to GitHub
```sh
git push origin feature/your-feature-name
```

### 5. Open a Pull Request
Submit a PR to the develop branch once your feature or fix is ready for review.

##
🧠 Highlights of TypeScript Upgrade
- 🔐 **Strict typing** — fewer runtime errors and safer refactors
- ⚡ **Faster debugging** — IntelliSense across steps and pages
- 🧩 **Reusable interfaces** for page objects and data models
- 🧱 **Cleaner architecture** — supports scalable, multi-module test suites
- 🧾 **Improved maintainability** with clear type inference

## ✅ Final Note
This repository demonstrates a **robust, scalable, and type-safe BDD testing framework** powered by **Playwright, CucumberJS, and TypeScript.**
It embodies best practices in automation design, from modular POM patterns to Git hygiene and reporting clarity.

Run it, explore it, extend it — and enjoy smooth, behavior-driven testing 🚀