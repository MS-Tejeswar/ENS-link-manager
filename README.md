# ENS-link-manager
Below is a draft for a README file for your ENS management web application project. This document provides an overview of the project, instructions for setting it up, and details about its functionality.

---

# ENS Management Web Application

## Overview

This web application allows users to manage Ethereum Name Service (ENS) names by associating them with URLs. Users can check the registration status of ENS names, store new links, and update existing links through a user-friendly interface. The application is built using JavaScript for the frontend and Node.js with Express for the backend, leveraging MongoDB for data storage.

## Features

- **ENS Name Registration Check**: Verify if an ENS name is registered on the Ethereum blockchain.
- **Link Management**: Associate URLs with ENS names and update them as needed.
- **Redirection**: Redirect to the URL associated with a given ENS name.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript, Web3.js
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB

## Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud-based)
- Ethereum node provider (e.g., Alchemy)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure MongoDB**:
   - Update the `mongoUri` in `server.js` with your MongoDB connection string.

4. **Start the server**:
   ```bash
   node server.js
   ```

5. **Open the application**:
   - Open `index.html` in a web browser.

## Usage

### **Frontend**

- Navigate to the application in your web browser.
- Choose whether you are a new or existing user.
- Enter your ENS name and click "Check ENS" to verify registration.
- For new users, enter a URL to associate with your ENS name and click "Submit".
- For existing users, update your link by entering the old and new URLs and clicking "Update Link".

### **Backend**

- **POST `/storeLink`**: Stores a new ENS name and associated link.
- **PUT `/updateLink`**: Updates the link for an existing ENS name.
- **GET `/redirect/:ensName`**: Redirects to the URL associated with the given ENS name.

## Database Schema

The application uses a simple Mongoose schema to store ENS names and their associated URLs:

```javascript
const ensSchema = new mongoose.Schema({
  ensName: { type: String, required: true },
  link: { type: String, required: true },
});
```

## Future Improvements

- Implement user authentication for enhanced security.
- Add support for multiple blockchain networks.
- Improve error handling and user feedback.
- Enhance the frontend interface for better user experience.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

