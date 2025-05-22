pipeline{
    agent any
    stages{
        stage('Docker build'){
            steps{
            echo "starting docker build"
            withCredentials([
                string(credentialsId: 'auth-db-host', variable: 'DB_HOST'),
                string(credentialsId: 'auth-db-name', variable: 'DB_NAME'),
                string(credentialsId: 'auth-db-user', variable: 'DB_USER'),
                string(credentialsId: 'auth-db-pass', variable: 'DB_PASS'),
                string(credentialsId: 'jwt-secret',variable: 'JWT_SECRET'),
            ]){
                sh "docker build -t todo_services/auth_service ."
            }
            sh "docker images"
            }
        }
        stage('Upload to AWS ECR'){
            environment {
                AWS_CREDENTIALS  = credentials('aws-creds')
            }
            steps{
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', 
                                  credentialsId: 'aws-creds',
                                  accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                                  secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    sh "aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/c5d4m2m5"
                    sh "docker tag todo_services/auth_service:latest public.ecr.aws/c5d4m2m5/todo_services/auth_service:latest"
                    sh "docker push public.ecr.aws/c5d4m2m5/todo_services/auth_service:latest"
                }
                echo "Done"
            }
        }
        stage('confirmation'){
            steps{
                script {
                    def response = sh(script: "aws ecr-public describe-repositories --repository-names nodejs/sserver", returnStdout: true)
                    echo "Response: ${response}"
                }
                echo "Done with confirmation"
            }
        }
    }

}