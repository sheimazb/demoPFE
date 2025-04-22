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
      <h1 class="welcome-text">Hi, I'm Chaima!<br>Welcome to my project advancement</h1>
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
      src: 'assets/spring-boot-logs.png',
      title: 'Spring Boot Docker Logs',
      description: 'JSON formatted logs from Spring Boot application in Docker'
    },
    {
      id: 2,
      src: 'assets/dotnet-logs.png',
      title: '.NET Docker Logs',
      description: 'JSON formatted logs from .NET application in Docker'
    },
    {
      id: 3,
      src: 'assets/fluentd-logs.png',
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
  "timestamp": "2025-03-15T10:30:00Z",
  "level": "ERROR",
  "service": "authentication",
  "message": "Failed login attempt",
  "metadata": {
    "userId": "user123",
    "ipAddress": "192.168.1.1",
    "browser": "Chrome 120.0"
  }
}</div>
          <p>This standardized format ensures consistent logging across all system components and facilitates automated processing.</p>
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