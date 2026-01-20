import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, Toast } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts" 
           [class]="'toast toast-' + toast.type"
           [@slideIn]>
        <div class="toast-content">
          <span class="toast-icon">{{ getIcon(toast.type) }}</span>
          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close" (click)="close(toast.id)">&times;</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }

    .toast {
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s ease-out;
      display: flex;
      align-items: center;
      min-width: 300px;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .toast-content {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
    }

    .toast-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .toast-message {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
    }

    .toast-close {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: inherit;
      opacity: 0.7;
      padding: 0;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      transition: opacity 0.2s;
    }

    .toast-close:hover {
      opacity: 1;
    }

    .toast-success {
      background-color: #10b981;
      color: white;
    }

    .toast-error {
      background-color: #ef4444;
      color: white;
    }

    .toast-warning {
      background-color: #f59e0b;
      color: white;
    }

    .toast-info {
      background-color: #3b82f6;
      color: white;
    }
  `]
})
export class ToastComponent {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  getIcon(type: string): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  }

  close(id: number): void {
    this.toastService.remove(id);
  }
}
