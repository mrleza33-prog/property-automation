pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Node') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run E2E Tests') {
            steps {
                bat 'npm run test:e2e'
            }
        }
    }

    post {
        always {

            archiveArtifacts artifacts: 'reports/**/*', fingerprint: true

            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'reports',
                reportFiles: 'index.html',
                reportName: 'Automation Report'
            ])

            script {
                try {
                    emailext(
                        to: 'l.hibbins@applyminds.com',
                        subject: "Automation Results - ${env.JOB_NAME} #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                        mimeType: 'text/html',
                        body: """
                            <h2>Playwright Automation Results</h2>

                            <p><b>Job:</b> ${env.JOB_NAME}</p>
                            <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                            <p><b>Status:</b> ${currentBuild.currentResult}</p>

                            <p>
                                <a href="${env.BUILD_URL}">
                                    View Jenkins Build
                                </a>
                            </p>

                            <p>
                                <a href="${env.BUILD_URL}Automation_Report/">
                                    View HTML Report
                                </a>
                            </p>
                        """
                    )
                } catch (err) {
                    echo "Email notification failed: ${err}"
                }
            }
        }
    }
}