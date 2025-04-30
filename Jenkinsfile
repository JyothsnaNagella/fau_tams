pipeline {
           agent any
       
           options {
               ansiColor('xterm')             // nice colored logs
               timestamps()                   // prepends each line with a timestamp
               timeout(time: 30, unit: 'MINUTES') // fail if it hangs
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
                              echo "🔄 npm ci (deterministic install)…"
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
                      // --build picks up your new server.js & compose changes
                      // --force-recreate ensures the node container gets the new DB_HOST
                      sh 'docker compose up -d --build --force-recreate'
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
