pipeline {
    agent any

    environment {
        DOCKER_BUILDKIT = '1'
    }

    options {
        ansiColor('xterm')
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Docker Artifacts') {
            steps {
                echo 'Cleaning up old Docker images and containers…'
                sh '''
                    docker compose down --volumes --remove-orphans || true
                    docker system prune -af || true
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Installing dependencies and building frontend…'
                dir('frontend') {
                    sh '''
                        echo 🔄 npm ci (deterministic install)…
                        npm ci --no-audit --progress=false

                        echo Running production build (warnings only)…
                        CI= npm run build
                    '''
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Rebuilding & recreating containers…'
                withCredentials([string(credentialsId: 'jwt-secret-id', variable: 'JWT_SECRET')]) {
                    sh '''
                        echo Verifying JWT_SECRET: ****
                        docker compose up -d --build --force-recreate
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline finished.'
        }
        failure {
            echo '❌ Pipeline failed. Check above for errors.'
        }
    }
}
