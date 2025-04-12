pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Docker Artifacts') {
            steps {
                echo 'Cleaning up old Docker images and containers...'
                sh '''
                    docker compose down --volumes --remove-orphans || true
                    docker system prune -af || true
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Installing dependencies and building frontend...'
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build and Start Containers') {
            steps {
                echo 'Building and starting containers...'
                sh 'docker compose up -d --build --no-cache'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
