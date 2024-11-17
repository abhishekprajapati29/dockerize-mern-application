# Dockerize a 3-Tier MERN Application 🐳  

Welcome to the **Dockerized MERN Application** repository! This project demonstrates how to containerize a full-stack MERN (MongoDB, Express, React, Node.js) application using Docker. You'll learn to use both Docker CLI and Docker Compose to manage a multi-container application efficiently.

---

Project Structure 📂
--------------------

```plaintext
.
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── public
│   └── src
├── server
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
├── docker-compose.yml
└── README.md
```

Prerequisites 🛠️
-----------------

1.  Install Docker on your machine: Get Docker
    
2.  Clone this repository:
```bash
git clone https://github.com/abhishekprajapati29/dockerize-mern-application.git
cd dockerize-mern-application
```     

Getting Started 🚀
------------------

### Method 1: Using Docker CLI

#### 1\. Create a Docker Network

```bash
docker network create todo-mern
```

#### 2\. Run MongoDB Container

```bash
docker run -d -p 27017:27017 --name mongodb --net todo-mern mongo
```


#### 3\. Build and Run the Server Container

Navigate to the server directory and build the Docker image:

```bash
docker build -t todo-server-image .
```


Run the container:

```bash
docker run -d -p 8081:8081 -e MONGODB_URI=mongodb://mongodb:27017/todoApp --name todo-server --net todo-mern todo-server-image
```

#### 4\. Build and Run the Client Container

Navigate to the client directory and build the Docker image:

```bash
docker build -t todo-client-image .
```

Run the container:

```bash
docker run -d -p 5713:5713
```

### Method 2: Using Docker Compose

The easier way!

1.  Ensure Docker Compose is installed.
    
2.  Run the following command:
    ```bash
	docker-compose up --build
	```

This will:

*   Start MongoDB, Backend, and Frontend services.
    
*   Link them via Docker Compose’s network configuration.
    

Access the Application 🌐
-------------------------

*   **Frontend (React):** http://localhost:5713
    
*   **Backend (Express):** [http://localhost:8081](http://localhost:8081)
    

Key Features 🔑
---------------

*   **Networking:** Containers communicate seamlessly via Docker networks.
    
*   **Environment Variables:** Configured securely using Dockerfile and docker-compose.yml.
    
*   **Data Persistence:** MongoDB uses volumes to persist data.
    

Future Plans 🌟
---------------

*   Explore Docker alternatives like Podman and CRI-O.
    
*   Begin integrating the application with cloud services (AWS/GCP).
    

Author
------

**Abhishek Prajapati**

*   [LinkedIn](https://www.linkedin.com/in/abhishekprajapati29/)
    
*   [Hashnode Blog](https://devopsmasteryunlocking.hashnode.dev)
    

Contributions 🤝
----------------

Feel free to fork this repo, raise issues, or submit pull requests to enhance the project.

### License

This project is licensed under the MIT License.
