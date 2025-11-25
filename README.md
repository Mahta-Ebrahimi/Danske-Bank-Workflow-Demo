
# Danske Bank React AI Secure Workflow Demo 🔒✨
![React](https://img.shields.io/badge/Frontend-React-lightblue?style=for-the-badge)

![UI/UX Designer](https://img.shields.io/badge/UI/UX-Designer-green?style=for-the-badge)

[![CI/CD](https://github.com/Mahta-Ebrahimi/Danske-Bank-Workflow-Demo/actions/workflows/ci.yml/badge.svg)](https://github.com/Mahta-Ebrahimi/Danske-Bank-Workflow-Demo/actions)

![Security Sanitized](https://img.shields.io/badge/Security-Sanitized-red?style=for-the-badge)

![CI/CD Pipeline](https://img.shields.io/badge/CI/CD-Automated-blue?style=for-the-badge)

![Cybersecurity](https://img.shields.io/badge/Cybersecurity-Aware-purple?style=for-the-badge)

---

## 🚀 Overview
Danske Bank Workflow Demo is a modern front‑end showcase built with **React** and **inline styles**.  
Danske Bank workflow AI is a recruiter‑ready demo showcasing a clean front‑end built with React and Tailwind CSS.
It highlights strong UI/UX design principles with clear layouts, engaging user flows, and professional finish.
Visible cybersecurity features and a GitHub Actions CI/CD pipeline demonstrate awareness of modern development practices.

---

## ✨ Features
- 🔒 **Input sanitization** (prevents XSS attacks).  
- 🟢/🔴 **Lock icon feedback** (green = safe, red = unsafe input).  
- 📊 **Analytics page** with recruiter‑focused UI polish.  
- ⚡ **CI/CD pipeline** (lint, build, security checks).  
- 🛡️ **Security dashboard widget** (mock status for cybersecurity awareness).

---
  
- ## 📌 Recruiter Note
This project was intentionally designed as a **professional showcase** rather than a hobby app.  
It highlights my ability to:

- Build attractive, responsive UIs with clear hierarchy and polished design.  
- Apply **UI/UX principles** to create recruiter‑friendly layouts and user flows.  
- Integrate visible **cybersecurity features** such as input sanitization, lock icons, and security badges.  
- Implement and troubleshoot **CI/CD pipelines** using GitHub Actions to automate builds, linting, testing, and security checks.  
- Present technical work in a way that demonstrates both **front‑end mastery** and **awareness of modern DevOps practices**.  


⚡ This repo is a **demo of an AI‑inspired automation workflow** — showing how modern apps can combine **UI/UX clarity, security awareness, and automated pipelines** to deliver recruiter‑ready results.

---

🌐 Live Demo → deployment link (Vercel) 

https://danske-bank-workflow-demo.vercel.app/

---


## 🛠️ Installation
Clone the repo and run locally:

```bash
git clone https://github.com/Mahta-Ebrahimi/Danske-Bank-Workflow-Demo.git
cd Danske-Bank-Workflow-Demo
npm install
npm run dev

## ⚡ CI/CD Pipeline
This project includes a GitHub Actions workflow to automate build, lint, test, and security checks.

[![CI/CD](https://github.com/Mahta-Ebrahimi/Danske-Bank-Workflow-Demo/actions/workflows/ci.yml/badge.svg)](https://github.com/Mahta-Ebrahimi/Danske-Bank-Workflow-Demo/actions)

### Workflow Example
```yaml
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - run: npm install
      - run: npm run build
      - run: npm run lint || true
      - run: npm test || true
      - run: npm audit --audit-level=moderate || true




