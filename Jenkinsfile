pipeline {
    agent any

    environment {
        PROJECT_DIR = '/opt/fau_tams'
        COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout Code') {
            steps {
                dir("${env.PROJECT_DIR}") {
                    git branch: 'main', url: 'https://github.com/JyothsnaNagella/fau_tams.git'
                }
            }
        }

        stage('Inject Secrets') {
            steps {
                withCredentials([string(credentialsId: 'jwt-secret', variable: 'JWT_SECRET')]) {
                    dir("${env.PROJECT_DIR}") {
                        sh '''
                            echo "JWT_SECRET=${JWT_SECRET}" > .env
                            echo ".env file created with JWT_SECRET"
                        '''
                    }
                }
            }
        }

        stage('Pull Images') {
            steps {
                dir("${env.PROJECT_DIR}") {
                    sh "docker compose -f ${COMPOSE_FILE} pull"
                }
            }
        }

        stage('Build & Deploy') {
            steps {
                dir("${env.PROJECT_DIR}") {
                    sh "docker compose -f ${COMPOSE_FILE} up -d --build"
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Check logs and secrets.'
        }
    }
}
