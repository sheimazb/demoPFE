import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  template: `
    <div *ngIf="!started" class="landing-page">
      <div class="avatar-container">
        <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" 
             alt="Profile" 
             class="avatar-image">
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
        </div>
      </div>
    </div>
  `
})
export class App {
  started = false;
  activeDialog = '';
  dialogTitle = '';
  dialogContent = '';
  dialogIcon = '';
  videoUrl: SafeResourceUrl;

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
        this.dialogTitle = 'Example Showcase';
        this.dialogContent = `
          <p>Watch this demonstration of our log management system in action:</p>
          <div class="video-container">
            <iframe
              src="${this.videoUrl}"
              title="Demo Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <p>This example shows how different roles interact with the system to resolve issues efficiently.</p>
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
  }
}

bootstrapApplication(App, {
  providers: []
});