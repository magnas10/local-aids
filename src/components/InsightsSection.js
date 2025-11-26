import React from 'react';
import './InsightsSection.css';

function InsightsSection() {
  const mainStats = [
    { 
      icon: '📋', 
      number: '2,456', 
      label: 'Help Requests',
      trend: '+12% this month',
      color: '#3498db'
    },
    { 
      icon: '👥', 
      number: '15,890', 
      label: 'Active Volunteers',
      trend: '+8% this month',
      color: '#20b2aa'
    },
    { 
      icon: '✅', 
      number: '42,340', 
      label: 'Tasks Completed',
      trend: '+23% this month',
      color: '#27ae60'
    },
    { 
      icon: '⭐', 
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
          <span className="insights-badge">📊 Live Data</span>
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
              <span className="feed-icon">🛒</span>
              <span>Sarah helped with grocery shopping in <strong>Melbourne</strong></span>
              <span className="feed-time">2 min ago</span>
            </div>
            <div className="feed-item">
              <span className="feed-icon">🚗</span>
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
