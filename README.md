# 🧪 Real-Time Regex Validator

A full-stack real-time regex validator built with **React**, **NestJS**, **Kafka**, **Redis**, **MongoDB**, and **Docker Compose**. This application enables users to validate inputs against regular expressions and receive live feedback on their validation status.

---

## 🚀 Features

- 🔍 Input and regex submission for validation
- ⚙️ Background service for regex validation
- 🔄 Real-time feedback via WebSocket
- 📦 Microservice communication powered by Kafka
- 💾 Persistent storage with MongoDB
- 🔔 Update propagation using Redis pub/sub
- 🐳 Easy local setup with Docker Compose

---

## 📸 Demo

![Screenshot](![screencapture-localhost-61234-2025-04-17-20_20_32](https://github.com/user-attachments/assets/feae8bbd-87d2-45c8-a883-e29e16ac152a))

---

## 🧱 Architecture

The application follows a microservices-based architecture with the following components:

1. **Frontend**: Built with React for a responsive and interactive user interface.
2. **Backend**: Developed using NestJS to handle API requests and manage business logic.
3. **Message Broker**: Kafka for reliable communication between services.
4. **Database**: MongoDB for storing validation jobs and results.
5. **Cache**: Redis for real-time pub/sub updates.
6. **Containerization**: Docker Compose for seamless deployment and local development.

---

## 🛠️ Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/regex-validator.git
    cd regex-validator
    ```

2. Start the application using Docker Compose:
    ```bash
    docker-compose up --build
    ```

3. Access the application at `http://localhost:3000`.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
