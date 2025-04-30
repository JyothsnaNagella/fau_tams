pipeline {
    agent any

    environment {
        COMPOSE_FILE_CUSTOM = 'docker-command-f.yml'
    }

    options {
        ansiColor('xterm')
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Docker Artifacts') {
            steps {
                echo 'Cleaning up old Docker containers and images…'
                sh '''
                    docker compose down --volumes --remove-orphans || true
                    docker rm -f mysql || true
                    docker rm -f node || true
                    docker rm -f nginx-ssl || true
                    docker system prune -af || true
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Installing dependencies and building frontend…'
                dir('frontend') {
                    sh '''
                        echo Running npm ci (deterministic install)…
                        npm ci --no-audit --progress=false
                        echo Running production build (warnings only)…
                        CI= npm run build
                    '''
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Rebuilding & recreating containers using custom compose file…'
                sh 'docker compose -f $COMPOSE_FILE_CUSTOM up -d --build --force-recreate'
            }
        }
    }

    post {
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
        success {
            echo 'Pipeline succeeded. 🎉'
        }
    }
}
