# Use Case 1: Early Access

[![Watch the video](https://img.youtube.com/vi/qI0RNNN_-Ss/hqdefault.jpg)](https://youtu.be/qI0RNNN_-Ss)

## Introduction

This document outlines the steps required to test out the Early Access use case in our demo project. Early Access is a use case that allows select users to access and test new features before they are fully released.

## Prerequisites

Before implementing the Early Access use case, ensure you have:

- Followed the installation instructions from the [main README.md](./README.md)
- Created an account on [devcycle.com](https://app.devcycle.com)
- Created an account on [Auth0.com](https://auth0.com/)

## Implementation Steps

Follow the steps below to implement the Early Access use case in our demo React app:

### 1. **Configure Your Auth0 Application**

**Get Your Application Keys**

- When you signed up for Auth0, a new application was created for you, or you could have created a new one. You will need some details about that application to communicate with Auth0. You can get these details from the [Application Settings](https://manage.auth0.com/?_gl=1*1hu0jhu*_gcl_aw*R0NMLjE2ODc1NDU4NjIuQ2p3S0NBandoZFdrQmhCWkVpd0ExaWJMbVBvOWNFQ1dXQ19iQnk4MlluVkJxZkVjSTl5ZnRBSmREMDg0UU10OVIzSFpTQkh2VDdSU2R4b0NVQUlRQXZEX0J3RQ..*_gcl_au*NDc3NzMwODI0LjE2ODYyNTMwNjY.*rollup_ga*ODI3OTE5MTI0LjE2ODYyNTMwNjY.*rollup_ga_F1G3E656YZ*MTY4NzU0NTU2MS43LjEuMTY4NzU0NTk3OS42MC4wLjA.&_ga=2.206481939.1062554210.1687545561-827919124.1686253066&_gac=1.223431529.1687545862.CjwKCAjwhdWkBhBZEiwA1ibLmPo9cECWWC_bBy82YnVBqfEcI9yftAJdD084QMt9R3HZSBHvT7RSdxoCUAIQAvD_BwE#/applications) section in the Auth0 dashboard.

**Add keys to .env file**

- In the root directory of your project copy the .env.local.example file to .env.local and add the following environment variables:

```
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://{yourDomain}'
AUTH0_CLIENT_ID='{yourClientId}'
AUTH0_CLIENT_SECRET='{yourClientSecret}'
```

**Create Sample Users**

- Create three different users in your Auth0 tenant by visiting the [User Management](https://manage.auth0.com/dashboard) section in the Auth0 dashboard.
  - developer@domain1.com
  - beta@domain2.com
  - user@domain2.com

---

### 2. **Configure Your DevCycle Project**

**Create a New Project**

- In the [DevCycle Dashboard](https://app.devcycle.com/), create a new project. Name the project some variation of _Use Cases_

**Create a New Feature**

- In this new project, create a new `Release` feature (boolean) and name it _early-access_

**Create Targeting Rules**

- In the `Users & Targeting` rules for your Development environment, create three targeting rules (in order):
  - Developers: set initial _serve_ value to **Variation On**
  - Beta Users: set initial _serve_ value to **Variation Off**
  - All Users: set initial _serve_ value to **Variation Off**

**Add SDK key to .env file**

- Select the key icon (View API Keys) in the main navbar, and copy the client key for your Development Environment (it should look like dvc*client*\*\*\*\*)
- In the root directory of your project copy the .env.example file to .env and update it with the following environment variable:

```
NEXT_PUBLIC_DVC_SDK_KEY='{dvc_client_****}'
```

---

### 3. **Test Out Early Access Feature**

- Ensure your demo application is running at https://localhost:3000 by following the instructions in the [main README.md](./README.md) file.
- Login as **developer@domain1.com** using the credentials you created in Step 1, and select the context menu by clicking on your profile image.
  - If the DevCycle SDK has been successfully configured you should see the `Profile` menu item.
- Now Login as **beta@domain2.com** using the credentials you created in Step 1, and select the context menu by clicking on your profile image.
  - If targetting rules have been successfully configured you should not be able to see the `Profile` menu item.
- Update the targetting rule for beta users by changing the serve value to `Variation On`
  - Refresh your demo app at http://localhost:3000 and the `Profile` menu item should now be visible
- Repeat the above process for **user@domain2.com**

---

## Notes

- The Early Access feature flag can also be managed via the [DevCycle CLI](https://docs.devcycle.com/tools-and-integrations/cli).
- Please refer back to the [main README.md](./README.md) file for general instructions and contact information if any problems are encountered.
