pipeline {
    agent any
    
    environment {
        ENV_FILE = credentials('002')
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Setup Environment') {
            steps {
                // Debug information
                sh 'pwd'
                sh 'whoami'
                sh 'ls -la'
                
                // Set permissions
                sh 'chmod -R 755 .'
                
                // Copy environment file using withCredentials
                withCredentials([file(credentialsId: '002', variable: 'ENV_FILE')]) {
                    script {
                        // Use Jenkins file operations
                        def envContent = readFile(env.ENV_FILE)
                        writeFile file: '.env.local', text: envContent
                        
                        // Verify file creation
                        sh 'ls -la .env.local'
                    }
                }
            }
        }
        stage('Install') {
            steps {
                // Ensure npm is available
                sh 'npm --version'
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        // Add additional stages as needed
    }
    
    post {
        always {
            // Always run this to clean up, regardless of build result
            cleanWs()
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed. Please check the logs for details.'
        }
    }
}
