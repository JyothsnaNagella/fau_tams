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
                        export CI=true
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Rebuilding & recreating containers…'
                sh '''
                    docker compose -f docker-compose.yml up -d --build --force-recreate
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment successful!'
        }
        failure {
            echo '🚨 Pipeline failed. Check logs above.'
        }
    }
}
