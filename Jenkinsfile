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
                echo '🧹 Cleaning up old Docker images and containers…'
                sh '''
                    #!/bin/bash
                    docker compose down --volumes --remove-orphans || true
                    docker system prune -af || true
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                echo '📦 Installing dependencies and building frontend…'
                dir('frontend') {
                    sh '''
                        #!/bin/bash
                        echo "🔄 npm ci (deterministic install)…"
                        npm ci --no-audit --progress=false

                        echo "🚧 Running production build (warnings only)…"
                        CI= npm run build
                    '''
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                echo '🚀 Rebuilding & recreating containers…'
                sh '''
                    #!/bin/bash
                    docker compose up -d --build --force-recreate
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully.'
        }
        failure {
            echo '❌ Pipeline failed. Check above for errors.'
        }
        always {
            echo '🔁 Pipeline finished.'
        }
    }
}

