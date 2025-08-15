// SEO Score Widget - Embeddable Component
class SEOScoreWidget {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            theme: options.theme || 'dark',
            size: options.size || 'medium',
            showDetails: options.showDetails !== false,
            autoRefresh: options.autoRefresh !== false,
            ...options
        };
        
        this.scores = {
            overall: 95,
            performance: 92,
            mobile: 98,
            security: 96
        };
        
        this.init();
    }
    
    init() {
        this.createWidget();
        this.updateScores();
        
        if (this.options.autoRefresh) {
            setInterval(() => this.updateScores(), 300000); // 5 minutes
        }
    }
    
    createWidget() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        const widget = document.createElement('div');
        widget.className = `seo-widget seo-widget-${this.options.theme} seo-widget-${this.options.size}`;
        widget.innerHTML = this.getWidgetHTML();
        
        container.appendChild(widget);
        this.addStyles();
    }
    
    getWidgetHTML() {
        return `
            <div class="seo-widget-header">
                <h3>🚀 SEO Score</h3>
                <button class="seo-refresh-btn" onclick="this.parentElement.parentElement.parentElement.refreshScores()">
                    🔄
                </button>
            </div>
            <div class="seo-score-display">
                <div class="seo-main-score">
                    <span class="seo-score-value" id="seo-main-score">95</span>
                    <span class="seo-score-label">/100</span>
                </div>
                <div class="seo-score-status">Excellent</div>
            </div>
            ${this.options.showDetails ? `
            <div class="seo-details">
                <div class="seo-detail-item">
                    <span class="seo-detail-label">Performance</span>
                    <span class="seo-detail-value" id="seo-performance">92</span>
                </div>
                <div class="seo-detail-item">
                    <span class="seo-detail-label">Mobile</span>
                    <span class="seo-detail-value" id="seo-mobile">98</span>
                </div>
                <div class="seo-detail-item">
                    <span class="seo-detail-label">Security</span>
                    <span class="seo-detail-value" id="seo-security">96</span>
                </div>
            </div>
            ` : ''}
            <div class="seo-update-time">
                Updated: <span id="seo-last-update">Just now</span>
            </div>
        `;
    }
    
    addStyles() {
        if (document.getElementById('seo-widget-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'seo-widget-styles';
        style.textContent = `
            .seo-widget {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                padding: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                color: #ffffff;
                transition: all 0.3s ease;
            }
            
            .seo-widget:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 180, 255, 0.2);
            }
            
            .seo-widget-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .seo-widget-header h3 {
                margin: 0;
                font-size: 1.1rem;
                color: #00b4ff;
            }
            
            .seo-refresh-btn {
                background: none;
                border: none;
                color: #00b4ff;
                cursor: pointer;
                font-size: 1rem;
                padding: 5px;
                border-radius: 5px;
                transition: all 0.3s ease;
            }
            
            .seo-refresh-btn:hover {
                background: rgba(0, 180, 255, 0.2);
                transform: rotate(180deg);
            }
            
            .seo-score-display {
                text-align: center;
                margin-bottom: 15px;
            }
            
            .seo-main-score {
                display: flex;
                align-items: baseline;
                justify-content: center;
                gap: 5px;
            }
            
            .seo-score-value {
                font-size: 2.5rem;
                font-weight: bold;
                color: #00ff88;
            }
            
            .seo-score-label {
                font-size: 1rem;
                color: #888;
            }
            
            .seo-score-status {
                font-size: 0.9rem;
                color: #00ff88;
                font-weight: 600;
                margin-top: 5px;
            }
            
            .seo-details {
                margin-bottom: 15px;
            }
            
            .seo-detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .seo-detail-item:last-child {
                border-bottom: none;
            }
            
            .seo-detail-label {
                font-size: 0.9rem;
                color: #ccc;
            }
            
            .seo-detail-value {
                font-size: 0.9rem;
                font-weight: 600;
                color: #00b4ff;
            }
            
            .seo-update-time {
                font-size: 0.8rem;
                color: #888;
                text-align: center;
            }
            
            /* Size variations */
            .seo-widget-small {
                padding: 15px;
            }
            
            .seo-widget-small .seo-score-value {
                font-size: 2rem;
            }
            
            .seo-widget-small .seo-details {
                display: none;
            }
            
            .seo-widget-large {
                padding: 25px;
            }
            
            .seo-widget-large .seo-score-value {
                font-size: 3rem;
            }
            
            /* Theme variations */
            .seo-widget-light {
                background: rgba(0, 0, 0, 0.1);
                color: #333;
            }
            
            .seo-widget-light .seo-detail-label {
                color: #666;
            }
            
            .seo-widget-light .seo-update-time {
                color: #666;
            }
            
            @media (max-width: 768px) {
                .seo-widget {
                    padding: 15px;
                }
                
                .seo-score-value {
                    font-size: 2rem;
                }
                
                .seo-details {
                    display: none;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    updateScores() {
        // Simulate real-time score updates
        this.scores = {
            overall: Math.floor(Math.random() * 5) + 90,
            performance: Math.floor(Math.random() * 8) + 85,
            mobile: Math.floor(Math.random() * 3) + 95,
            security: Math.floor(Math.random() * 4) + 92
        };
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        const mainScore = document.getElementById('seo-main-score');
        const performance = document.getElementById('seo-performance');
        const mobile = document.getElementById('seo-mobile');
        const security = document.getElementById('seo-security');
        const lastUpdate = document.getElementById('seo-last-update');
        
        if (mainScore) mainScore.textContent = this.scores.overall;
        if (performance) performance.textContent = this.scores.performance;
        if (mobile) mobile.textContent = this.scores.mobile;
        if (security) security.textContent = this.scores.security;
        if (lastUpdate) lastUpdate.textContent = new Date().toLocaleTimeString();
    }
    
    refreshScores() {
        const btn = document.querySelector('.seo-refresh-btn');
        if (btn) {
            btn.textContent = '⏳';
            btn.disabled = true;
            
            setTimeout(() => {
                this.updateScores();
                btn.textContent = '🔄';
                btn.disabled = false;
            }, 2000);
        }
    }
}

// Usage Examples:
// 
// 1. Basic widget:
// new SEOScoreWidget('seo-container');
//
// 2. Small widget without details:
// new SEOScoreWidget('seo-container', { size: 'small', showDetails: false });
//
// 3. Large widget with light theme:
// new SEOScoreWidget('seo-container', { size: 'large', theme: 'light' });
//
// 4. Widget with custom options:
// new SEOScoreWidget('seo-container', {
//     size: 'medium',
//     theme: 'dark',
//     showDetails: true,
//     autoRefresh: true
// });
