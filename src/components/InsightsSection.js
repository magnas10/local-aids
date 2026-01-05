import React from 'react';
import './InsightsSection.css';

function InsightsSection() {
  const mainStats = [
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      number: '2,456', 
      label: 'Help Requests',
      trend: '+12% this month',
      color: '#3498db'
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
      ),
      number: '15,890', 
      label: 'Active Volunteers',
      trend: '+8% this month',
      color: '#20b2aa'
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
        </svg>
      ),
      number: '42,340', 
      label: 'Tasks Completed',
      trend: '+23% this month',
      color: '#27ae60'
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      ),
      number: '4.9/5', 
      label: 'Average Rating',
      trend: 'Based on 12K reviews',
      color: '#f39c12'
    }
  ];

  const activityData = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 80 },
    { label: 'Wed', value: 55 },
    { label: 'Thu', value: 90 },
    { label: 'Fri', value: 75 },
    { label: 'Sat', value: 95 },
    { label: 'Sun', value: 70 }
  ];

  const topCategories = [
    { name: 'Grocery Shopping', count: 845, percentage: 28 },
    { name: 'Transportation', count: 612, percentage: 20 },
    { name: 'Home Repairs', count: 534, percentage: 18 },
    { name: 'Companionship', count: 489, percentage: 16 },
    { name: 'Technology Help', count: 356, percentage: 12 }
  ];

  return (
    <section className="insights-section">
      <div className="insights-wrapper">
        {/* Header */}
        <div className="insights-header">
          <span className="insights-badge">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{marginRight: '6px'}}>
              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
            </svg>
            Live Data
          </span>
          <h2>Community Insights</h2>
          <p>Real-time statistics showing our community's impact across Australia</p>
        </div>

        {/* Main Stats */}
        <div className="main-stats">
          {mainStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-trend">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Insights */}
        <div className="detailed-insights">
          {/* Activity Chart */}
          <div className="insight-box activity-chart">
            <h3>Weekly Activity</h3>
            <div className="chart-container">
              {activityData.map((day, index) => (
                <div key={index} className="chart-bar-wrapper">
                  <div 
                    className="chart-bar" 
                    style={{ height: `${day.value}%` }}
                  >
                    <span className="bar-value">{day.value}</span>
                  </div>
                  <span className="bar-label">{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="insight-box top-categories">
            <h3>Top Help Categories</h3>
            <div className="categories-list">
              {topCategories.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-rank">#{index + 1}</span>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.count}</span>
                  </div>
                  <div className="category-bar-bg">
                    <div 
                      className="category-bar-fill" 
                      style={{ width: `${category.percentage * 3}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Feed */}
        <div className="live-feed">
          <div className="live-indicator">
            <span className="pulse"></span>
            <span>Live updates</span>
          </div>
          <div className="feed-items">
            <div className="feed-item">
              <span className="feed-icon">•</span>
              <span>Sarah helped with grocery shopping in <strong>Melbourne</strong></span>
              <span className="feed-time">2 min ago</span>
            </div>
            <div className="feed-item">
              <span className="feed-icon">•</span>
              <span>New transport request in <strong>Sydney</strong></span>
              <span className="feed-time">5 min ago</span>
            </div>
            <div className="feed-item">
              <span className="feed-icon">⭐</span>
              <span>5-star review received in <strong>Brisbane</strong></span>
              <span className="feed-time">8 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsightsSection;
