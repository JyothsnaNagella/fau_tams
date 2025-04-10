pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/JyothsnaNagella/fau_tams'
        BRANCH = 'main'
    }

    stages {
        stage('Clone Repo') {
            steps {
                sh '''
                    rm -rf fau_tams
                    git clone -b ${BRANCH} ${GIT_REPO}
                '''
            }
        }

        stage('Reset containers') {
            steps {
                sh '''
                    cd fau_tams
                    docker compose down -v || true
                    docker rm -f mysql || true
                '''
            }
        }

        stage('Build & Start') {
            steps {
                sh '''
                    cd fau_tams
                    docker compose -f docker-compose.yml up -d --build
                '''
            }
        }
    }
}
