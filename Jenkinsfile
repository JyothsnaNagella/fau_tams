pipeline {
    agent any

    environment {
        CI = 'true' // Disable prompts and enable non-interactive npm mode
    }

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
                    // Add logging for visibility and prevent hanging
                    sh '''
                        echo "Starting npm install..."
                        npm install --no-audit --progress=false

                        echo "Running npm build..."
                        npm run build
                    '''
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
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}
