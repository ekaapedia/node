pipeline {
    agent any

    environment {
        IMAGE_NAME = 'node-app'
        DOCKERHUB_USER = 'ekagustiman'
        CONTAINER_NAME = 'node-app-container'
        CREDENTIALS_ID = 'docker' // ID dari Jenkins Credentials
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/main']], // Sesuaikan dengan nama branch
                        userRemoteConfigs: [[
                            url: 'https://github.com/ekaapedia/node.git', // Ganti dengan repository-mu
                            credentialsId: 'github' // Sesuai dengan ID credential yang dibuat
                        ]]
                    ])
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo '${DOCKER_PASS}' | docker login -u '${DOCKER_USER}' --password-stdin"
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "docker tag ${IMAGE_NAME}:latest ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                    sh "docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker pull ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                    sh "docker run -d --name ${CONTAINER_NAME} -p 4000:3000 ${DOCKERHUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh "docker image prune -f"
                }
            }
        }
    }
}
