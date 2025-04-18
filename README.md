
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
![screencapture-localhost-61234-2025-04-18-13_03_30](https://github.com/user-attachments/assets/2bd7f422-4140-4057-822b-fdbc76023f6e)
![screencapture-localhost-61234-2025-04-18-13_16_53](https://github.com/user-attachments/assets/767293b7-feff-4664-a864-ce747f490fc0)


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
    git clone https://github.com/Aseadd/regex-validator.git
    cd regex-validator
    ```

2. Start the application using Docker Compose:
    ```bash
    docker-compose up --build
    ```

3. Access the application at `[http://localhost:61234](http://localhost:61234/)`.

---

## 👥 Author <a name="author"></a>

Addis Tsega

- GitHub: [Aseadd](https://github.com/Aseadd)
- Twitter: [@AdaTsega](https://twitter.com/AdaTsega)
- LinkedIn: [addis-tsega](https://www.linkedin.com/in/addis-tsega/)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 📝 License <a name="license"></a>

This project is [MIT](./MIT.md) licensed.



<p align="right">(<a href="#readme-top">back to top</a>)</p>
