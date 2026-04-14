pipeline {
    agent any

    environment {
        ECR_REPO = "your-ecr-repo"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/<your-username>/contactlist-backend.git'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t $ECR_REPO:$IMAGE_TAG ."
            }
        }

        stage('Login to ECR') {
            steps {
                sh "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $ECR_REPO"
            }
        }

        stage('Push to ECR') {
            steps {
                sh "docker push $ECR_REPO:$IMAGE_TAG"
            }
        }

        stage('Deploy to EKS') {
            steps {
                sh "kubectl apply -f k8s/"
            }
        }
    }
}