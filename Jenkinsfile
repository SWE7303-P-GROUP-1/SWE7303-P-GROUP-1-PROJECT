pipeline {
    agent { label 'Jenkinsagent1' }
    tools {
        jdk 'Java21'
        maven 'Maven3'
    }
    environment {
	    APP_NAME = "swe7303-p-group-1-project"
            RELEASE = "1.0.0"
            DOCKER_USER = "devopsprojectg1"
            DOCKER_PASS = 'dockerhub'
            IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
            IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
    }    
    stages{
        stage("Cleanup Workspace"){
                steps {
                cleanWs()
                }
        }

        stage("Checkout from SCM"){
                steps {
                    git branch: 'main', credentialsId: 'github', url: 'https://github.com/SWE7303-P-GROUP-1/SWE7303-P-GROUP-1-PROJECT'
                }
        }

        stage("Build Application"){
            steps {
                sh "mvn clean package"
            }

       }

       stage("Test Application"){
           steps {
                 sh "mvn test"
           }
       }  
        
       stage("SonarQube Analysis"){
           steps {
	           script {
		withSonarQubeEnv(credentialsId: 'jenkins-sonarqube-token') { 
                sh "mvn sonar:sonar"
		  }
	       }	
           }
        }

	stage("Quality Gate"){
           steps {
               script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'jenkins-sonarqube-token'
                }	
      	    }
	}	
	stage("Build & Push Docker Image") {
            steps {
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        docker_image = docker.build "${IMAGE_NAME}"
                    }

                    docker.withRegistry('',DOCKER_PASS) {
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')	
			}
     		    }
	        }  
           }
	}
   }
