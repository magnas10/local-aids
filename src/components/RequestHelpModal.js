import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitHelpRequest } from '../services/api';
import './RequestHelpModal.css';

function RequestHelpModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    address: '',
    suburb: '',
    state: 'VIC',
    postcode: '',
    
    // Request Details
    helpType: '',
    urgency: 'normal',
    preferredDate: '',
    preferredTime: '',
    duration: '',
    
    // Description
    description: '',
    specialRequirements: '',
    
    // Additional
    howHeard: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const helpTypes = [
    { id: 'transport', icon: '🚗', label: 'Transport', desc: 'Medical appointments, shopping trips' },
    { id: 'shopping', icon: '🛒', label: 'Shopping Assistance', desc: 'Grocery shopping, errands' },
    { id: 'companionship', icon: '👥', label: 'Companionship', desc: 'Social visits, phone calls' },
    { id: 'household', icon: '🏠', label: 'Household Help', desc: 'Light cleaning, gardening' },
    { id: 'meals', icon: '🍽️', label: 'Meal Support', desc: 'Meal preparation, delivery' },
    { id: 'medical', icon: '💊', label: 'Medical Support', desc: 'Medication reminders, health check-ins' },
    { id: 'tech', icon: '💻', label: 'Tech Support', desc: 'Device setup, digital assistance' },
    { id: 'other', icon: '❓', label: 'Other', desc: 'Any other assistance needed' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleHelpTypeSelect = (typeId) => {
    setFormData(prev => ({ ...prev, helpType: typeId }));
  };

  const validateStep = (stepNum) => {
    switch(stepNum) {
      case 1:
        if (!formData.helpType) {
          alert('Please select a type of help');
          return false;
        }
        return true;
      case 2:
        if (!formData.description || formData.description.trim() === '') {
          alert('Please describe what help you need');
          return false;
        }
        return true;
      case 3:
        if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.suburb || !formData.postcode) {
          alert('Please fill in all required personal information');
          return false;
        }
        return true;
      case 4:
        if (!formData.agreeTerms || !formData.agreePrivacy) {
          alert('Please agree to the terms and conditions');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting help request with data:', formData);
      const result = await submitHelpRequest(formData);
      console.log('Help request submitted successfully:', result);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      console.error('Failed to submit help request:', error);
      console.error('Error details:', error);
      
      // Show more detailed error message
      let errorMessage = 'Failed to submit help request. Please try again.';
      if (error.errors && Array.isArray(error.errors)) {
        errorMessage = error.errors.map(e => e.message || e).join(', ');
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.error('Displaying error to user:', errorMessage);
      alert(errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      suburb: '',
      state: 'VIC',
      postcode: '',
      helpType: '',
      urgency: 'normal',
      preferredDate: '',
      preferredTime: '',
      duration: '',
      description: '',
      specialRequirements: '',
      howHeard: '',
      agreeTerms: false,
      agreePrivacy: false
    });
    setStep(1);
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        
        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="modal-header">
              <h2>Request Help</h2>
              <p>We're here to support you. Fill out this form and a volunteer will be matched to assist you.</p>
            </div>

            {/* Progress Steps */}
            <div className="progress-steps">
              <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Help Type</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Details</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">Your Info</span>
              </div>
              <div className="progress-line"></div>
              <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>
                <span className="step-number">4</span>
                <span className="step-label">Review</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Step 1: Help Type */}
              {step === 1 && (
                <div className="form-step">
                  <h3>What type of help do you need?</h3>
                  <div className="help-type-grid">
                    {helpTypes.map(type => (
                      <div
                        key={type.id}
                        className={`help-type-card ${formData.helpType === type.id ? 'selected' : ''}`}
                        onClick={() => handleHelpTypeSelect(type.id)}
                      >
                        <span className="help-type-icon">{type.icon}</span>
                        <h4>{type.label}</h4>
                        <p>{type.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="urgency-section">
                    <h4>How urgent is your request?</h4>
                    <div className="urgency-options">
                      <label className={`urgency-option ${formData.urgency === 'low' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="urgency"
                          value="low"
                          checked={formData.urgency === 'low'}
                          onChange={handleChange}
                        />
                        <span className="urgency-indicator low"></span>
                        <div>
                          <strong>Low</strong>
                          <p>Within 2 weeks</p>
                        </div>
                      </label>
                      <label className={`urgency-option ${formData.urgency === 'normal' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="urgency"
                          value="normal"
                          checked={formData.urgency === 'normal'}
                          onChange={handleChange}
                        />
                        <span className="urgency-indicator normal"></span>
                        <div>
                          <strong>Normal</strong>
                          <p>Within 1 week</p>
                        </div>
                      </label>
                      <label className={`urgency-option ${formData.urgency === 'high' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="urgency"
                          value="high"
                          checked={formData.urgency === 'high'}
                          onChange={handleChange}
                        />
                        <span className="urgency-indicator high"></span>
                        <div>
                          <strong>High</strong>
                          <p>Within 2-3 days</p>
                        </div>
                      </label>
                      <label className={`urgency-option ${formData.urgency === 'urgent' ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="urgency"
                          value="urgent"
                          checked={formData.urgency === 'urgent'}
                          onChange={handleChange}
                        />
                        <span className="urgency-indicator urgent"></span>
                        <div>
                          <strong>Urgent</strong>
                          <p>ASAP</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Request Details */}
              {step === 2 && (
                <div className="form-step">
                  <h3>Tell us more about your request</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredDate">Preferred Date</label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="preferredTime">Preferred Time</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                      >
                        <option value="">Select time</option>
                        <option value="morning">Morning (8am - 12pm)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm)</option>
                        <option value="evening">Evening (5pm - 8pm)</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="duration">Estimated Duration</label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                    >
                      <option value="">Select duration</option>
                      <option value="30min">30 minutes</option>
                      <option value="1hour">1 hour</option>
                      <option value="2hours">2 hours</option>
                      <option value="3hours">3 hours</option>
                      <option value="halfday">Half day (4+ hours)</option>
                      <option value="ongoing">Ongoing support</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description of Help Needed *</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Please describe what you need help with in detail..."
                      rows="4"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="specialRequirements">Special Requirements or Notes</label>
                    <textarea
                      id="specialRequirements"
                      name="specialRequirements"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      placeholder="Any mobility needs, accessibility requirements, or other important information..."
                      rows="3"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Personal Information */}
              {step === 3 && (
                <div className="form-step">
                  <h3>Your Contact Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="04XX XXX XXX"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Example Street"
                      required
                    />
                  </div>

                  <div className="form-row triple">
                    <div className="form-group">
                      <label htmlFor="suburb">Suburb *</label>
                      <input
                        type="text"
                        id="suburb"
                        name="suburb"
                        value={formData.suburb}
                        onChange={handleChange}
                        placeholder="Melbourne"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State *</label>
                      <select
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="VIC">VIC</option>
                        <option value="NSW">NSW</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="postcode">Postcode *</label>
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleChange}
                        placeholder="3000"
                        pattern="[0-9]{4}"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="howHeard">How did you hear about us?</label>
                    <select
                      id="howHeard"
                      name="howHeard"
                      value={formData.howHeard}
                      onChange={handleChange}
                    >
                      <option value="">Select an option</option>
                      <option value="search">Search Engine</option>
                      <option value="social">Social Media</option>
                      <option value="friend">Friend or Family</option>
                      <option value="healthcare">Healthcare Provider</option>
                      <option value="community">Community Center</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="form-step">
                  <h3>Review Your Request</h3>
                  
                  <div className="review-section">
                    <div className="review-card">
                      <h4>Help Type</h4>
                      <div className="review-content">
                        <span className="review-icon">
                          {helpTypes.find(t => t.id === formData.helpType)?.icon}
                        </span>
                        <div>
                          <strong>{helpTypes.find(t => t.id === formData.helpType)?.label}</strong>
                          <span className={`urgency-badge ${formData.urgency}`}>
                            {formData.urgency.charAt(0).toUpperCase() + formData.urgency.slice(1)} Priority
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="review-card">
                      <h4>Schedule</h4>
                      <p><strong>Date:</strong> {formData.preferredDate || 'Flexible'}</p>
                      <p><strong>Time:</strong> {formData.preferredTime || 'Flexible'}</p>
                      <p><strong>Duration:</strong> {formData.duration || 'Not specified'}</p>
                    </div>

                    <div className="review-card">
                      <h4>Description</h4>
                      <p>{formData.description}</p>
                      {formData.specialRequirements && (
                        <>
                          <h5>Special Requirements:</h5>
                          <p>{formData.specialRequirements}</p>
                        </>
                      )}
                    </div>

                    <div className="review-card">
                      <h4>Contact Information</h4>
                      <p><strong>Name:</strong> {formData.fullName}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                      <p><strong>Phone:</strong> {formData.phone}</p>
                      <p><strong>Address:</strong> {formData.address}, {formData.suburb}, {formData.state} {formData.postcode}</p>
                    </div>
                  </div>

                  <div className="consent-section">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                      />
                      <span>I agree to the <Link to="/terms" target="_blank">Terms of Service</Link> *</span>
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="agreePrivacy"
                        checked={formData.agreePrivacy}
                        onChange={handleChange}
                        required
                      />
                      <span>I agree to the <Link to="/privacy" target="_blank">Privacy Policy</Link> and consent to being contacted *</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="form-navigation">
                {step > 1 && (
                  <button type="button" className="btn-back" onClick={prevStep}>
                    ← Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    className="btn-next"
                    onClick={nextStep}
                    disabled={step === 1 && !formData.helpType}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitting || !formData.agreeTerms || !formData.agreePrivacy}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          /* Success Message */
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Request Submitted Successfully!</h2>
            <p>Thank you for reaching out. Your request has been received and a volunteer coordinator will review it shortly.</p>
            <div className="success-details">
              <p><strong>Reference Number:</strong> REQ-{Date.now().toString().slice(-8)}</p>
              <p><strong>Expected Response:</strong> Within 24-48 hours</p>
            </div>
            <p className="success-note">You will receive a confirmation email at <strong>{formData.email}</strong></p>
            <button className="btn-close" onClick={resetForm}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestHelpModal;
