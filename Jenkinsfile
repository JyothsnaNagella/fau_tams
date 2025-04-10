
pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "tams" // Optional: for naming containers
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/JyothsnaNagella/fau_tams', branch: 'main'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker-compose down || true'
            }
        }

        stage('Start New Containers') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed ❌'
        }
        success {
            echo 'App deployed successfully ✅'
        }
    }
}
