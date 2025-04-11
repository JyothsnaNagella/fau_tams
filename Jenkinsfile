pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Shutdown existing containers') {
            steps {
                echo 'Stopping any running containers...'
                sh 'docker compose down || true'
            }
        }

        stage('Build and Start Containers') {
            steps {
                echo 'Building and starting containers...'
                sh 'docker compose -f docker-compose.yml up -d --build'
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
