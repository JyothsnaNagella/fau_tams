pipeline {
    agent any

    options {
        ansiColor('xterm')                  // Colorized output
        timestamps()                        // Timestamped logs
        timeout(time: 30, unit: 'MINUTES')  // Auto-fail if it hangs
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
                    # Tear down compose stack, remove volumes and orphans
                    docker compose down --volumes --remove-orphans || true

                    # Explicitly force remove lingering containers that could conflict
                    docker rm -f mysql || true
                    docker rm -f node || true
                    docker rm -f nginx || true

                    # Reclaim disk space
                    docker system prune -af || true
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Installing dependencies and building frontend…'
                dir('frontend') {
                    sh '''
                        echo "Running npm ci (deterministic install)…"
                        npm ci --no-audit --progress=false

                        echo "Running production build (warnings only)…"
                        CI='' npm run build
                    '''
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Rebuilding & recreating containers…'
                sh '''
                    docker compose up -d --build --force-recreate
                '''
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

