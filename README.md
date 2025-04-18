
# 🧪 Real-Time Regex Validator

A full-stack real-time regex validator built with **React**, **NestJS**, **Kafka**, **Redis**, **MongoDB**, and **Docker Compose**. A distributed system that validates user inputs against configurable regular expressions with real-time feedback. The application demonstrates event-driven architecture patterns, microservice communication, and real-time update propagation.
---

## Workflow:

- User submits input via the frontend

- API Gateway receives the request and creates a validation job

- Validation Service processes jobs asynchronously via Kafka

- Results are stored in MongoDB and propagated via Redis Pub/Sub

- Frontend receives real-time updates through WebSocket

## ⚡ Real-Time Update Mechanism
Initial Request:

- Frontend POSTs to API Gateway
- Gateway creates job record in MongoDB
- Job event published to Kafka
  
 Validation Processing:

- Validation Service consumes Kafka events
- Processes regex validation with configurable delay
- Updates job status in MongoDB
  
Update Propagation:

- Service publishes update event to Redis channel
- API Gateway subscribes to Redis channels
- WebSocket connection pushes updates to frontend


---
## System Reliability
Fault Tolerance Strategies
- Kafka: Message persistence with replication factor 1
- MongoDB: Automatic retry logic in services
- Redis: Cache fallback for recent updates
Event Handling
- At-Least-Once Delivery: Kafka consumer offsets
- Idempotent Operations: MongoDB upserts
- Dead Letter Queue: Planned for failed validations

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

## ☁ Cloud Deployment (AWS)
Scaling Considerations
Frontend:
- S3 + CloudFront for static assets
- Auto-scaling EC2 or ECS Fargate
API Gateway:
- Application Load Balancer with multiple instances
- Configured health checks
Validation Service:
- Kafka consumer groups for parallel processing
- ECS Service auto-scaling based on SQS queue size
Data Services:
- Amazon MSK (Managed Kafka) with 3 brokers
- ElastiCache Redis Cluster
- DocumentDB with read replicas
Configuration Management
- Secrets: AWS Secrets Manager for credentials
- Parameters: AWS Systems Manager Parameter Store
- Infrastructure: Terraform for provisioning
- CI/CD: CodePipeline with ECR/ECS deployments

##  ⚙ Configuration
- Environment variables (set in docker-compose.yml):
- REGEX_PATTERN: Validation pattern (default: ^[A-Za-z0-9]+$)
- VALIDATION_DELAY: Processing delay in ms (default: 2000)
- Service connection strings for development

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

3. Access the application at `http://localhost:61234`.

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
