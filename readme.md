# Encode Learning App - Back End

Welcome to the Encode Learning App back end repository! This is the server-side of our application, built with Node.js, Express, TypeScript, and MongoDB.

## Prerequisites

Before you start, make sure you have the following tools and services set up:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git
- MongoDB (You should have an active MongoDB instance or use a cloud-based solution like MongoDB Atlas)

## Getting Started

1. Clone the repository:

git clone https://github.com/MuhdHanish/En-Code-Server.git


2. Navigate to the project directory:


3. Install dependencies:

npm install


4. Start the server:

npm run dev


The server will start running on the specified port (default is 8000).

## Environment Variables

To run the Encode Learning App back end properly, you need to set up the following environment variables. Create a `.env` file in the root of your project and add the following:

```env
SENDER_EMAIL="Sender email address"
SENDER_PASSWORD="Sender email's one time password"
JWT_ACCESS_SECRET="Access secret create own"
JWT_REFRESH_SECRET="Refresh secret create own"
CLIENT_ORIGIN_URL="Client side deplyed url with customised domain"
DISTRIBUTED_ORIGIN_URL="If deployed on cloudfront service"
MONGO_CLOUD_URI="Mongo db cloud uri"

```
## Contributing

We welcome contributions from the community to help make Encode Learning App even better! If you'd like to contribute to this project, please follow our [Contributing Guidelines](CONTRIBUTING.md).

Here's how you can get started:

1. Fork this repository.

2. Clone your forked repository:

## License

This project is licensed under the [MIT License](LICENSE).

