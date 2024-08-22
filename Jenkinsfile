pipeline {
    agent { label 'Jenkinsagent1' }
    tools {
        jdk 'Java21'
        maven 'Maven3'
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
      }
   }
