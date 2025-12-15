import React, { useState } from 'react';
import './Pages.css';

function RequestHelp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    helpType: '',
    urgency: '',
    details: '',
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      address: ''
    }
  });

  const steps = [
    { number: 1, title: 'Help Type', active: currentStep === 1, completed: currentStep > 1 },
    { number: 2, title: 'Details', active: currentStep === 2, completed: currentStep > 2 },
    { number: 3, title: 'Your Info', active: currentStep === 3, completed: currentStep > 3 },
    { number: 4, title: 'Review', active: currentStep === 4, completed: false }
  ];

  const helpTypes = [
    {
      id: 'transport',
      title: 'Transport',
      description: 'Medical appointments, shopping trips',
      icon: '🚗',
      selected: formData.helpType === 'transport'
    },
    {
      id: 'shopping',
      title: 'Shopping Assistance',
      description: 'Grocery shopping, errands',
      icon: '🛒',
      selected: formData.helpType === 'shopping'
    },
    {
      id: 'companionship',
      title: 'Companionship',
      description: 'Social visits, phone calls',
      icon: '👥',
      selected: formData.helpType === 'companionship'
    },
    {
      id: 'household',
      title: 'Household Help',
      description: 'Light cleaning, gardening',
      icon: '🏠',
      selected: formData.helpType === 'household'
    },
    {
      id: 'meal',
      title: 'Meal Support',
      description: 'Meal preparation, delivery',
      icon: '🍽️',
      selected: formData.helpType === 'meal'
    },
    {
      id: 'medical',
      title: 'Medical Support',
      description: 'Medication reminders, health check-ins',
      icon: '💊',
      selected: formData.helpType === 'medical'
    },
    {
      id: 'tech',
      title: 'Tech Support',
      description: 'Device setup, digital assistance',
      icon: '💻',
      selected: formData.helpType === 'tech'
    },
    {
      id: 'other',
      title: 'Other',
      description: 'Any other assistance needed',
      icon: '🤝',
      selected: formData.helpType === 'other'
    }
  ];

  const urgencyLevels = [
    {
      id: 'low',
      title: 'Low',
      description: 'Within 2 weeks',
      color: '#2196f3'
    },
    {
      id: 'normal',
      title: 'Normal',
      description: 'Within 1 week',
      color: '#4caf50'
    },
    {
      id: 'high',
      title: 'High',
      description: 'Within 2-3 days',
      color: '#ff9800'
    },
    {
      id: 'urgent',
      title: 'Urgent',
      description: 'ASAP',
      color: '#f44336'
    }
  ];

  const handleHelpTypeSelect = (type) => {
    setFormData({ ...formData, helpType: type });
  };

  const handleUrgencySelect = (urgency) => {
    setFormData({ ...formData, urgency });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="help-form-content">
            <h2>What type of help do you need?</h2>
            <div className="help-types-grid">
              {helpTypes.map((type) => (
                <div
                  key={type.id}
                  className={`help-type-card ${type.selected ? 'selected' : ''}`}
                  onClick={() => handleHelpTypeSelect(type.id)}
                >
                  <div className="help-type-icon-container">
                    <span className="help-type-icon">{type.icon}</span>
                  </div>
                  <div className="help-type-content">
                    <div className="help-type-dot"></div>
                    <h3>{type.title}</h3>
                    <p>{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 style={{ marginTop: '40px' }}>How urgent is your request?</h3>
            <div className="urgency-grid">
              {urgencyLevels.map((level) => (
                <div
                  key={level.id}
                  className={`urgency-card ${formData.urgency === level.id ? 'selected' : ''}`}
                  onClick={() => handleUrgencySelect(level.id)}
                  style={{ borderColor: formData.urgency === level.id ? level.color : '#e0e0e0' }}
                >
                  <div 
                    className="urgency-dot" 
                    style={{ backgroundColor: level.color }}
                  ></div>
                  <div>
                    <h4>{level.title}</h4>
                    <p>{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="help-form-content">
            <h2>Tell us more details</h2>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Please provide more details about the help you need..."
              rows="6"
              className="details-textarea"
            />
          </div>
        );
      case 3:
        return (
          <div className="help-form-content">
            <h2>Your contact information</h2>
            <div className="contact-form">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.contactInfo.name}
                onChange={(e) => setFormData({
                  ...formData,
                  contactInfo: { ...formData.contactInfo, name: e.target.value }
                })}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.contactInfo.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contactInfo: { ...formData.contactInfo, phone: e.target.value }
                })}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.contactInfo.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contactInfo: { ...formData.contactInfo, email: e.target.value }
                })}
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.contactInfo.address}
                onChange={(e) => setFormData({
                  ...formData,
                  contactInfo: { ...formData.contactInfo, address: e.target.value }
                })}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="help-form-content">
            <h2>Review your request</h2>
            <div className="review-section">
              <div className="review-item">
                <h4>Help Type:</h4>
                <p>{helpTypes.find(t => t.id === formData.helpType)?.title}</p>
              </div>
              <div className="review-item">
                <h4>Urgency:</h4>
                <p>{urgencyLevels.find(u => u.id === formData.urgency)?.title}</p>
              </div>
              <div className="review-item">
                <h4>Details:</h4>
                <p>{formData.details}</p>
              </div>
              <div className="review-item">
                <h4>Contact:</h4>
                <p>{formData.contactInfo.name} - {formData.contactInfo.phone}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="help-request-form">
        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((step) => (
            <div key={step.number} className="step-item">
              <div className={`step-circle ${step.active ? 'active' : ''} ${step.completed ? 'completed' : ''}`}>
                {step.number}
              </div>
              <span className={`step-label ${step.active ? 'active' : ''}`}>{step.title}</span>
              {step.number < 4 && <div className="step-line"></div>}
            </div>
          ))}
        </div>

        {/* Form Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <button onClick={prevStep} className="btn-secondary">
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button 
              onClick={nextStep} 
              className="btn-primary"
              disabled={currentStep === 1 && (!formData.helpType || !formData.urgency)}
            >
              Next
            </button>
          ) : (
            <button className="btn-primary">
              Submit Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestHelp;