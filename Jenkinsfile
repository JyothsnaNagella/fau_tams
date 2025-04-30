pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                dir('/opt/fau_tams') {
                    git branch: 'main', url: 'https://github.com/JyothsnaNagella/fau_tams.git'
                }
            }
        }

        stage('Pull Latest Images') {
            steps {
                dir('/opt/fau_tams') {
                    sh 'docker compose -f docker-compose.yml pull'
                }
            }
        }

        stage('Rebuild & Deploy') {
            steps {
                dir('/opt/fau_tams') {
                    sh 'docker compose -f docker-compose.yml up -d --build'
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}
