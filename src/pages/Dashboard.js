import React from 'react';
import './Pages.css';

function Dashboard() {
  const dashboardData = {
    overview: [
      { label: 'Total Donations', value: '$12,450', icon: '$', change: '+12%' },
      { label: 'Active Volunteers', value: '234', icon: '•', change: '+8%' },
      { label: 'Events This Month', value: '8', icon: '•', change: '+2' },
      { label: 'People Helped', value: '1,420', icon: '♡', change: '+15%' }
    ],
    recentActivity: [
      { action: 'New volunteer registered', time: '2 hours ago', type: 'volunteer' },
      { action: 'Donation received: $250', time: '5 hours ago', type: 'donation' },
      { action: 'Event registration: Health Workshop', time: '1 day ago', type: 'event' },
      { action: 'Support request resolved', time: '2 days ago', type: 'support' },
      { action: 'New community story shared', time: '3 days ago', type: 'story' }
    ],
    upcomingTasks: [
      { task: 'Review volunteer applications', deadline: 'Today', priority: 'high' },
      { task: 'Prepare workshop materials', deadline: 'Tomorrow', priority: 'medium' },
      { task: 'Send newsletter', deadline: 'Dec 1', priority: 'low' },
      { task: 'Update event calendar', deadline: 'Dec 3', priority: 'medium' }
    ]
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your activities and community impact</p>
      </div>
      
      <div className="dashboard-overview">
        {dashboardData.overview.map((item, index) => (
          <div key={index} className="overview-card">
            <div className="overview-icon">{item.icon}</div>
            <div className="overview-details">
              <span className="overview-value">{item.value}</span>
              <span className="overview-label">{item.label}</span>
            </div>
            <span className="overview-change positive">{item.change}</span>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-dot ${activity.type}`}></div>
                <div className="activity-details">
                  <p>{activity.action}</p>
                  <span>{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Upcoming Tasks</h3>
          <div className="tasks-list">
            {dashboardData.upcomingTasks.map((task, index) => (
              <div key={index} className="task-item">
                <input type="checkbox" />
                <div className="task-details">
                  <p>{task.task}</p>
                  <span>Due: {task.deadline}</span>
                </div>
                <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
