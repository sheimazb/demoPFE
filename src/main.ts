import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface ConsoleImage {
  id: number;
  src: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div *ngIf="!started" class="landing-page">
      <div class="avatar-wrapper">
        <div class="avatar-container">
          <div class="avatar-frame">
            <img src="https://st5.depositphotos.com/29094582/66194/i/450/depositphotos_661944618-stock-photo-cartoon-smiling-cute-girl-yellow.jpg" 
                 alt="Profile" 
                 class="avatar-image">
          </div>
          <div class="avatar-glow"></div>
        </div>
      </div>
      <h1 class="welcome-text">Hi, I'm Chaima!<br>Welcome to my project achivements </h1>
      <button class="start-button" (click)="started = true">
        <i class="fas fa-rocket"></i>
        Start Journey
      </button>
    </div>

    <div *ngIf="started" class="main-interface">
      <button class="back-button" (click)="started = false">
        <i class="fas fa-arrow-left"></i>
      </button>

      <div class="project-description">
        <h2>Log Management System</h2>
        <p>A comprehensive solution for collecting, analyzing, and resolving error logs through collaboration between different roles.</p>
        
        <div class="pipeline-section">
          <h3 class="pipeline-title">System Architecture &amp; Workflow</h3>
          
          <div class="pipeline-diagram">
            <div class="pipeline-stage">
              <div class="pipeline-icon">
                <i class="fas fa-code"></i>
              </div>
              <div class="pipeline-content">
                <h4>Application Logging</h4>
                <p>Projects emit structured JSON logs with standardized format and project-specific tags</p>
              </div>
            </div>
            <div class="pipeline-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="pipeline-stage">
              <div class="pipeline-icon">
                <i class="fas fa-filter"></i>
              </div>
              <div class="pipeline-content">
                <h4>Fluent Bit Forwarder</h4>
                <p>Filters logs by level and forwards errors to the Fluentd aggregator</p>
              </div>
            </div>
            <div class="pipeline-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="pipeline-stage">
              <div class="pipeline-icon">
                <i class="fas fa-random"></i>
              </div>
              <div class="pipeline-content">
                <h4>Fluentd Aggregator</h4>
                <p>Collects, processes, and routes logs to the ticket microservice</p>
              </div>
            </div>
            <div class="pipeline-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="pipeline-stage">
              <div class="pipeline-icon">
                <i class="fas fa-ticket-alt"></i>
              </div>
              <div class="pipeline-content">
                <h4>Ticket Microservice</h4>
                <p>Saves logs as tickets tagged by project for tracking and resolution</p>
              </div>
            </div>
            <div class="pipeline-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
            <div class="pipeline-stage">
              <div class="pipeline-icon">
                <i class="fas fa-brain"></i>
              </div>
              <div class="pipeline-content">
                <h4>Gemini AI Analysis</h4>
                <p>Analyzes stack traces and suggests recommended solutions</p>
              </div>
            </div>
          </div>
          
          <div class="recap-details">
            <h3>How It Works</h3>
            <p>Our Log Management System provides an end-to-end solution for error handling across multiple projects:</p>
            
            <ol class="process-steps">
              <li><strong>Project Setup:</strong> Partners configure their applications with standardized logging and project tags</li>
              <li><strong>Log Collection:</strong> Fluent Bit agent forwards error logs based on log level filtering</li>
              <li><strong>Log Aggregation:</strong> Fluentd centrally collects logs from all applications and services</li>
              <li><strong>Ticket Creation:</strong> Each error automatically becomes a ticket associated with its source project</li>
              <li><strong>AI-Powered Analysis:</strong> Gemini AI model reads the extended stack trace to provide comprehensive error analysis</li>
              <li><strong>Solution Recommendation:</strong> Developers receive AI-suggested solutions, simplifying the debugging process</li>
            </ol>
            
            <div class="key-benefits">
              <h4><i class="fas fa-star"></i> Key Advantages</h4>
              <ul>
                <li>Centralized error management for all projects</li>
                <li>Automatic error filtering and prioritization</li>
                <li>AI-enhanced solution recommendations</li>
                <li>Simplified debugging workflow for developers</li>
                <li>Full traceability of errors across the system</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="actors-grid">
          <div class="actor-card">
            <i class="fas fa-user-tie actor-icon"></i>
            <h3 class="actor-title">Manager</h3>
            <p class="actor-description">Oversees the project and monitors overall progress</p>
          </div>
          <div class="actor-card">
            <i class="fas fa-handshake actor-icon"></i>
            <h3 class="actor-title">Partner</h3>
            <p class="actor-description">Collaborates on implementation and integration</p>
          </div>
          <div class="actor-card">
            <i class="fas fa-bug actor-icon"></i>
            <h3 class="actor-title">Tester</h3>
            <p class="actor-description">Identifies and reports system issues</p>
          </div>
          <div class="actor-card">
            <i class="fas fa-code actor-icon"></i>
            <h3 class="actor-title">Developer</h3>
            <p class="actor-description">Proposes and implements error solutions</p>
          </div>
          <div class="actor-card">
            <i class="fas fa-shield-alt actor-icon"></i>
            <h3 class="actor-title">Admin</h3>
            <p class="actor-description">Manages system access and security</p>
          </div>
        </div>
      </div>

      <div class="button-container">
        <button class="feature-button format-logs" (click)="openDialog('format')">
          <i class="fas fa-list-check"></i>
          Format Logs
        </button>
        <button class="feature-button example" (click)="openDialog('example')">
          <i class="fas fa-code"></i>
          Example
        </button>
        <button class="feature-button coming-soon" (click)="openDialog('coming')">
          <i class="fas fa-rocket-launch"></i>
          What's Coming
        </button>
      </div>

      <div *ngIf="activeDialog" class="dialog-overlay" (click)="closeDialog()">
        <div class="dialog" (click)="$event.stopPropagation()">
          <button class="close-button" (click)="closeDialog()">×</button>
          <h2 class="dialog-title">
            <i [class]="dialogIcon"></i>
            {{ dialogTitle }}
          </h2>
          <div class="dialog-content" [innerHTML]="dialogContent"></div>
          
          <!-- Console Images Section -->
          <div *ngIf="activeDialog === 'example'" class="console-images">
            <div *ngFor="let image of consoleImages" class="console-card" (click)="expandImage(image)">
              <img [src]="image.src" [alt]="image.title" class="console-preview">
              <h4>{{ image.title }}</h4>
              <p>{{ image.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Expanded Image Modal -->
      <div *ngIf="expandedImage" class="image-modal" (click)="closeExpandedImage()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="close-modal" (click)="closeExpandedImage()">&times;</button>
          <img [src]="expandedImage.src" [alt]="expandedImage.title" class="expanded-image">
          <div class="image-info">
            <h3>{{ expandedImage.title }}</h3>
            <p>{{ expandedImage.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <style>
      .avatar-wrapper {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 0 auto;
      }

      .avatar-container {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .avatar-frame {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 25px rgba(0, 123, 255, 0.3);
      }

      .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .avatar-container:hover .avatar-image {
        transform: scale(1.1);
      }

      .avatar-glow {
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border-radius: 50%;
        background: linear-gradient(45deg, #00ff88, #00a1ff);
        opacity: 0;
        z-index: -1;
        transition: opacity 0.3s ease;
      }

      .avatar-container:hover .avatar-glow {
        opacity: 0.5;
        animation: glowPulse 2s infinite;
      }

      @keyframes glowPulse {
        0% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.1); opacity: 0.3; }
        100% { transform: scale(1); opacity: 0.5; }
      }

      /* Benefits Section Styles */
      .benefits-title {
        margin-top: 2rem;
        margin-bottom: 1.5rem;
        color: #4c9aff;
        font-size: 1.5rem;
        text-align: center;
        position: relative;
        padding-bottom: 0.5rem;
      }

      .benefits-title:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 3px;
        background: linear-gradient(90deg, #4c9aff, #d4a8ff);
        border-radius: 3px;
      }

      .benefits-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }

      .benefit-card {
        background: linear-gradient(145deg, #2c2c2c, #323232);
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        transition: transform 0.3s, box-shadow 0.3s;
        position: relative;
        overflow: hidden;
        text-align: center;
      }

      .benefit-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      }

      .benefit-card:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #4c9aff, #d4a8ff);
        border-radius: 4px 4px 0 0;
      }

      .benefit-icon {
        font-size: 2rem;
        color: #4c9aff;
        margin-bottom: 1rem;
      }

      .benefit-card h4 {
        color: #ffffff;
        margin: 0.5rem 0;
        font-size: 1.2rem;
      }

      .benefit-card p {
        color: #cccccc;
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .implementation-note {
        margin-top: 2rem;
        padding: 1rem;
        background: rgba(76, 154, 255, 0.1);
        border-left: 4px solid #4c9aff;
        border-radius: 0 4px 4px 0;
        color: #dddddd;
      }

      .console-images {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 2rem;
      }

      .console-card {
        background: #2a2a2a;
        border-radius: 10px;
        padding: 1rem;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .console-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      }

      .console-preview {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
      }

      .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1100;
      }

      .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90vh;
        background: #2d2d2d;
        padding: 2rem;
        border-radius: 12px;
      }

      .expanded-image {
        max-width: 100%;
        max-height: 70vh;
        object-fit: contain;
      }

      .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.3s ease;
      }

      .close-modal:hover {
        color: #ff4444;
      }

      .image-info {
        margin-top: 1rem;
        color: white;
      }

      /* Pipeline Section Styles */
      .pipeline-section {
        margin: 2rem 0 3rem;
        padding: 1.5rem;
        background: rgba(30, 30, 30, 0.7);
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .pipeline-title {
        text-align: center;
        color: #4c9aff;
        margin-bottom: 2rem;
        font-size: 1.6rem;
        position: relative;
        padding-bottom: 0.8rem;
      }

      .pipeline-title:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 3px;
        background: linear-gradient(90deg, #4c9aff, #e985f7);
        border-radius: 3px;
      }

      .pipeline-diagram {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 2.5rem;
      }

      .pipeline-stage {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 180px;
        text-align: center;
        background: linear-gradient(145deg, #2a2a2a, #333333);
        border-radius: 10px;
        padding: 1.2rem 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .pipeline-stage:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
      }

      .pipeline-icon {
        background: linear-gradient(135deg, #3a3a3a, #262626);
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin-bottom: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      }

      .pipeline-icon i {
        font-size: 1.8rem;
        background: linear-gradient(90deg, #4c9aff, #e985f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .pipeline-content h4 {
        color: #ffffff;
        margin: 0.5rem 0;
        font-size: 1.1rem;
      }

      .pipeline-content p {
        color: #b8b8b8;
        font-size: 0.85rem;
        line-height: 1.4;
      }

      .pipeline-arrow {
        color: #4c9aff;
        font-size: 1.5rem;
        margin: 0 0.2rem;
      }

      @media (max-width: 768px) {
        .pipeline-diagram {
          flex-direction: column;
        }
        
        .pipeline-stage {
          width: 100%;
          max-width: 300px;
        }
        
        .pipeline-arrow {
          transform: rotate(90deg);
          margin: 0.5rem 0;
        }
      }

      .recap-details {
        background: rgba(25, 25, 25, 0.6);
        border-radius: 10px;
        padding: 1.5rem;
        margin-top: 2rem;
      }

      .recap-details h3 {
        color: #4c9aff;
        margin-bottom: 1rem;
        font-size: 1.4rem;
      }

      .process-steps {
        padding-left: 1.5rem;
        counter-reset: step-counter;
        list-style-type: none;
        margin-bottom: 1.5rem;
      }

      .process-steps li {
        position: relative;
        padding: 0.5rem 0 0.5rem 2rem;
        margin-bottom: 0.8rem;
        color: #e0e0e0;
        counter-increment: step-counter;
      }

      .process-steps li::before {
        content: counter(step-counter);
        position: absolute;
        left: 0;
        top: 0.45rem;
        width: 24px;
        height: 24px;
        background: linear-gradient(135deg, #4c9aff, #e985f7);
        border-radius: 50%;
        color: #ffffff;
        font-weight: bold;
        font-size: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .process-steps li strong {
        color: #ffffff;
      }

      .key-benefits {
        background: linear-gradient(135deg, rgba(76, 154, 255, 0.1), rgba(233, 133, 247, 0.1));
        border-radius: 8px;
        padding: 1.2rem;
        margin-top: 1.5rem;
      }

      .key-benefits h4 {
        color: #ffffff;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        display: flex;
        align-items: center;
      }

      .key-benefits h4 i {
        color: #ffcc00;
        margin-right: 0.5rem;
      }

      .key-benefits ul {
        padding-left: 1.5rem;
        margin: 0;
      }

      .key-benefits li {
        color: #e0e0e0;
        margin-bottom: 0.5rem;
        position: relative;
      }

      .key-benefits li::before {
        content: "•";
        color: #4c9aff;
        font-weight: bold;
        position: absolute;
        left: -1rem;
      }
    </style>
  `
})
export class App {
  started = false;
  activeDialog = '';
  dialogTitle = '';
  dialogContent = '';
  dialogIcon = '';
  videoUrl: SafeResourceUrl;
  expandedImage: ConsoleImage | null = null;

  consoleImages: ConsoleImage[] = [
    {
      id: 1,
      src: 'assets/infoSpring.png',
      title: 'Spring Boot Docker Logs Level: "INFO"',
      description: 'JSON formatted logs from Spring Boot application in Docker'
    },
    {
      id: 2,
      src: 'assets/errorSpring.png',
      title: 'Spring Boot Docker Logs Level: "ERROR"',
      description: 'JSON formatted logs from Spring Boot application in Docker'
    },
    {
      id: 3,
      src: 'assets/infoDotnet.png',
      title: '.NET Docker Logs Level: "INFO"',
      description: 'JSON formatted logs from .NET application in Docker'
    },
    {
      id: 4,
      src: 'assets/dotnetError.png',
      title: '.NET Docker Logs Level: "ERROR"',
      description: 'JSON formatted logs from .NET application in Docker'
    },
    {
      id: 5,
      src: 'assets/fluentd.png',
      title: 'Fluentd Console',
      description: 'Logs aggregation in Fluentd Docker container'
    }
  ];

  constructor(private sanitizer: DomSanitizer) {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/dQw4w9WgXcQ');
  }

  openDialog(type: string) {
    this.activeDialog = type;
    switch(type) {
      case 'format':
        this.dialogIcon = 'fas fa-list-check';
        this.dialogTitle = 'Format Logs';
        this.dialogContent = `
          <p>Our log format follows a structured JSON schema for better analysis and processing:</p>
          <div class="json-preview">
{
  "instant": {
    "epochSecond": 1745238353,
    "nanoOfSecond": 32380016
  },
  "thread": "Thread-8",
  "level": "Error",
  "loggerName": "MyApp.Controllers.ErrorController",
  "message": "External service error: Failed to connect to dependent service",
  "thrown": {
    "name": "System.Net.Http.HttpRequestException",
    "message": "No such host is known",
    "localizedMessage": "No such host is known",
    "commonElementCount": 0,
    "extendedStackTrace": "System.Net.Http.HttpRequestException: No such host is known ..."
  }
}
}</div>
          <p>This standardized format ensures consistent logging across all system components and facilitates automated processing.</p>
          
          <h3 class="benefits-title">Benefits of Structured JSON Logging</h3>
          <div class="benefits-grid">
            <div class="benefit-card">
              <i class="fas fa-search benefit-icon"></i>
              <h4>Enhanced Searchability</h4>
              <p>Structured fields make it easy to search and filter logs by specific attributes, reducing troubleshooting time.</p>
            </div>
            <div class="benefit-card">
              <i class="fas fa-chart-line benefit-icon"></i>
              <h4>Advanced Analytics</h4>
              <p>Fields can be easily extracted for visualization, metrics, and trend analysis across systems.</p>
            </div>
            <div class="benefit-card">
              <i class="fas fa-robot benefit-icon"></i>
              <h4>Machine Processing</h4>
              <p>Consistent JSON format enables automated log analysis, anomaly detection, and alerting.</p>
            </div>
            <div class="benefit-card">
              <i class="fas fa-project-diagram benefit-icon"></i>
              <h4>Cross-Service Correlation</h4>
              <p>Common format makes it easy to trace issues across microservices and distributed systems.</p>
            </div>
            <div class="benefit-card">
              <i class="fas fa-tools benefit-icon"></i>
              <h4>Tool Compatibility</h4>
              <p>Works seamlessly with Fluentd, Elasticsearch, Kibana, and other monitoring tools in the ecosystem.</p>
            </div>
            <div class="benefit-card">
              <i class="fas fa-shield-alt benefit-icon"></i>
              <h4>Security Analysis</h4>
              <p>Structured data helps in identifying security patterns and potential threats more efficiently.</p>
            </div>
          </div>
          
          <p class="implementation-note"><strong>Implementation Note:</strong> Using this format consistently across Spring Boot, .NET, and other projects ensures unified log management and analysis capabilities.</p>
        `;
        break;
      case 'example':
        this.dialogIcon = 'fas fa-code';
        this.dialogTitle = 'Console Outputs';
        this.dialogContent = `
          <p>Here are the console outputs from different parts of our system:</p>
        `;
        break;
      case 'coming':
        this.dialogIcon = 'fas fa-rocket-launch';
        this.dialogTitle = "What's Coming Next";
        this.dialogContent = `
          <p>We're excited to announce these upcoming features:</p>
          <ul class="feature-list">
            <li><strong>Smart Notification System:</strong> Real-time alerts with customizable rules and priority levels for different user roles.</li>
            <li><strong>AI-Powered Recommendation Engine:</strong> Suggests solutions based on historical error patterns and successful resolutions.</li>
            <li><strong>Advanced Task Management:</strong> Comprehensive task tracking with automated assignments and progress monitoring.</li>
            <li><strong>Deployment Pipeline:</strong> Streamlined deployment process with automated testing and validation.</li>
          </ul>
          <p>These enhancements will significantly improve our system's efficiency and user experience.</p>
        `;
        break;
    }
  }

  closeDialog() {
    this.activeDialog = '';
    this.expandedImage = null;
  }

  expandImage(image: ConsoleImage) {
    this.expandedImage = image;
  }

  closeExpandedImage() {
    this.expandedImage = null;
  }
}

bootstrapApplication(App, {
  providers: []
});