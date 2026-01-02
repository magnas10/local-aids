import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitHelpRequest } from '../services/api';
import './RequestHelp.css';

function RequestHelp() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  
  const [formData, setFormData] = useState({
    // Personal Information
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
    description: '',
    specialRequirements: '',
    
    // Additional
    howHeard: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  // Help types configuration
  const helpTypes = [
    { 
      id: 'transport', 
      icon: '🚗', 
      title: 'Transportation', 
      description: 'Medical appointments, shopping trips, errands'
    },
    { 
      id: 'shopping', 
      icon: '🛒', 
      title: 'Shopping', 
      description: 'Grocery shopping, pharmacy visits'
    },
    { 
      id: 'companionship', 
      icon: '💬', 
      title: 'Companionship', 
      description: 'Social visits, phone calls, conversation'
    },
    { 
      id: 'household', 
      icon: '🏡', 
      title: 'Household Tasks', 
      description: 'Light cleaning, gardening, maintenance'
    },
    { 
      id: 'meals', 
      icon: '🍽️', 
      title: 'Meal Support', 
      description: 'Meal preparation, cooking assistance'
    },
    { 
      id: 'medical', 
      icon: '💊', 
      title: 'Medical Support', 
      description: 'Medication reminders, health monitoring'
    },
    { 
      id: 'tech', 
      icon: '💻', 
      title: 'Tech Help', 
      description: 'Device setup, internet, online services'
    },
    { 
      id: 'other', 
      icon: '🤝', 
      title: 'Other', 
      description: 'Any other assistance you need'
    }
  ];

  const urgencyLevels = [
    { id: 'low', label: 'Low Priority', description: 'Within 2 weeks', color: '#3b82f6' },
    { id: 'normal', label: 'Normal', description: 'Within 1 week', color: '#10b981' },
    { id: 'high', label: 'High Priority', description: '2-3 days', color: '#f59e0b' },
    { id: 'urgent', label: 'Urgent', description: 'As soon as possible', color: '#ef4444' }
  ];

  const australianStates = [
    { code: 'VIC', name: 'Victoria' },
    { code: 'NSW', name: 'New South Wales' },
    { code: 'QLD', name: 'Queensland' },
    { code: 'WA', name: 'Western Australia' },
    { code: 'SA', name: 'South Australia' },
    { code: 'TAS', name: 'Tasmania' },
    { code: 'ACT', name: 'Australian Capital Territory' },
    { code: 'NT', name: 'Northern Territory' }
  ];

  // Load Google Maps Script
  useEffect(() => {
    if (!window.google) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.warn('Google Maps API key not configured');
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapsLoaded(true);
      script.onerror = () => {
        console.warn('Google Maps failed to load, using manual address entry');
        setMapsLoaded(false);
      };
      document.head.appendChild(script);
    } else {
      setMapsLoaded(true);
    }
  }, []);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (mapsLoaded && addressInputRef.current && !autocompleteRef.current && window.google?.maps?.places) {
      try {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          {
            types: ['address'],
            componentRestrictions: { country: 'au' }
          }
        );

        autocompleteRef.current.setFields(['address_components', 'formatted_address']);

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          
          if (place && place.address_components) {
            let street = '';
            let suburb = '';
            let state = '';
            let postcode = '';

            place.address_components.forEach(component => {
              const types = component.types;
              
              if (types.includes('street_number')) {
                street = component.long_name + ' ';
              }
              if (types.includes('route')) {
                street += component.long_name;
              }
              if (types.includes('locality') || types.includes('postal_town')) {
                suburb = component.long_name;
              }
              if (types.includes('administrative_area_level_1')) {
                state = component.short_name;
              }
              if (types.includes('postal_code')) {
                postcode = component.long_name;
              }
            });

            setFormData(prev => ({
              ...prev,
              address: street || place.formatted_address,
              suburb: suburb,
              state: state || 'VIC',
              postcode: postcode
            }));

            // Clear any address-related errors
            setErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors.address;
              delete newErrors.suburb;
              delete newErrors.postcode;
              return newErrors;
            });
          }
        });
      } catch (error) {
        console.error('Error initializing Google Places Autocomplete:', error);
      }
    }
  }, [mapsLoaded]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.helpType) newErrors.helpType = 'Please select a help type';
      if (!formData.urgency) newErrors.urgency = 'Please select urgency level';
    }

    if (currentStep === 2) {
      if (!formData.description.trim()) newErrors.description = 'Please describe your request';
      if (formData.description.length > 1000) newErrors.description = 'Description must be under 1000 characters';
    }

    if (currentStep === 3) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.suburb.trim()) newErrors.suburb = 'Suburb is required';
      if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
    }

    if (currentStep === 4) {
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms';
      if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) return;

    setSubmitting(true);
    
    try {
      await submitHelpRequest(formData);
      setSubmitSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      
      if (error.errors && Array.isArray(error.errors)) {
        const newErrors = {};
        error.errors.forEach(err => {
          if (err.param) newErrors[err.param] = err.msg;
        });
        setErrors(newErrors);
      } else {
        setErrors({ submit: error.message || 'Failed to submit request' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="step-content">
          <div className="step-header">
            <h2>What type of help do you need?</h2>
            <p>Select the category that best matches your request</p>
          </div>

          <div className="help-types-grid">
            {helpTypes.map(type => (
              <button
                key={type.id}
                type="button"
                className={`help-type-card ${formData.helpType === type.id ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, helpType: type.id }))}
              >
                <span className="help-icon">{type.icon}</span>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
                <div className="check-indicator">✓</div>
              </button>
            ))}
          </div>
          {errors.helpType && <div className="error-message">{errors.helpType}</div>}

          <div className="step-header" style={{ marginTop: '48px' }}>
            <h2>How urgent is your request?</h2>
          </div>

          <div className="urgency-grid">
            {urgencyLevels.map(level => (
              <button
                key={level.id}
                type="button"
                className={`urgency-card ${formData.urgency === level.id ? 'selected' : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, urgency: level.id }))}
                style={{ '--urgency-color': level.color }}
              >
                <div className="urgency-dot" style={{ backgroundColor: level.color }}></div>
                <div className="urgency-content">
                  <h4>{level.label}</h4>
                  <p>{level.description}</p>
                </div>
              </button>
            ))}
          </div>
          {errors.urgency && <div className="error-message">{errors.urgency}</div>}
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="step-content">
          <div className="step-header">
            <h2>Describe your request</h2>
            <p>Please provide details about the help you need</p>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us what you need help with, any specific requirements, and when you'd like the help..."
              rows="6"
              className={errors.description ? 'error' : ''}
            />
            <div className="char-count">{formData.description.length}/1000</div>
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>

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
                <option value="morning">Morning (8am-12pm)</option>
                <option value="afternoon">Afternoon (12pm-5pm)</option>
                <option value="evening">Evening (5pm-8pm)</option>
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
              <option value="less-1">Less than 1 hour</option>
              <option value="1-2">1-2 hours</option>
              <option value="2-4">2-4 hours</option>
              <option value="4-plus">4+ hours</option>
              <option value="recurring">Recurring/Regular</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="specialRequirements">Special Requirements</label>
            <textarea
              id="specialRequirements"
              name="specialRequirements"
              value={formData.specialRequirements}
              onChange={handleChange}
              placeholder="Any special requirements, accessibility needs, or preferences..."
              rows="3"
            />
          </div>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="step-content">
          <div className="step-header">
            <h2>Your contact information</h2>
            <p>We'll use this to match you with volunteers and coordinate help</p>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name *</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Smith"
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0412 345 678"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
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
              placeholder="john.smith@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address *</label>
            <input
              ref={addressInputRef}
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Start typing your address..."
              className={errors.address ? 'error' : ''}
              autoComplete="off"
            />
            {mapsLoaded && (
              <small style={{ color: '#666', fontSize: '13px', marginTop: '4px', display: 'block' }}>
                📍 Start typing and select from suggestions
              </small>
            )}
            {errors.address && <div className="error-message">{errors.address}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="suburb">Suburb *</label>
              <input
                type="text"
                id="suburb"
                name="suburb"
                value={formData.suburb}
                onChange={handleChange}
                placeholder="Melbourne"
                className={errors.suburb ? 'error' : ''}
              />
              {errors.suburb && <div className="error-message">{errors.suburb}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error' : ''}
              >
                {australianStates.map(state => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state && <div className="error-message">{errors.state}</div>}
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
                maxLength="4"
                className={errors.postcode ? 'error' : ''}
              />
              {errors.postcode && <div className="error-message">{errors.postcode}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="howHeard">How did you hear about us? (Optional)</label>
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
              <option value="community">Community Organization</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="step-content">
          <div className="step-header">
            <h2>Review and Submit</h2>
            <p>Please review your request before submitting</p>
          </div>

          {submitSuccess && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Request Submitted Successfully!</h3>
              <p>Thank you for reaching out. We'll connect you with available volunteers soon.</p>
              <p>Redirecting you to home page...</p>
            </div>
          )}

          {errors.submit && (
            <div className="error-banner">{errors.submit}</div>
          )}

          <div className="review-section">
            <div className="review-card">
              <h3>Request Details</h3>
              <div className="review-item">
                <span className="review-label">Help Type:</span>
                <span className="review-value">
                  {helpTypes.find(t => t.id === formData.helpType)?.title}
                </span>
              </div>
              <div className="review-item">
                <span className="review-label">Urgency:</span>
                <span className="review-value">
                  {urgencyLevels.find(u => u.id === formData.urgency)?.label}
                </span>
              </div>
              <div className="review-item">
                <span className="review-label">Description:</span>
                <span className="review-value">{formData.description}</span>
              </div>
              {formData.preferredDate && (
                <div className="review-item">
                  <span className="review-label">Preferred Date:</span>
                  <span className="review-value">{formData.preferredDate}</span>
                </div>
              )}
              {formData.preferredTime && (
                <div className="review-item">
                  <span className="review-label">Preferred Time:</span>
                  <span className="review-value">{formData.preferredTime}</span>
                </div>
              )}
            </div>

            <div className="review-card">
              <h3>Contact Information</h3>
              <div className="review-item">
                <span className="review-label">Name:</span>
                <span className="review-value">{formData.fullName}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Email:</span>
                <span className="review-value">{formData.email}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Phone:</span>
                <span className="review-value">{formData.phone}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Address:</span>
                <span className="review-value">
                  {formData.address}, {formData.suburb} {formData.state} {formData.postcode}
                </span>
              </div>
            </div>
          </div>

          <div className="terms-section">
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms">
                I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> *
              </label>
            </div>
            {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="agreePrivacy"
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={handleChange}
              />
              <label htmlFor="agreePrivacy">
                I agree to the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> *
              </label>
            </div>
            {errors.agreePrivacy && <div className="error-message">{errors.agreePrivacy}</div>}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="request-help-page">
      <div className="request-help-container">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>

        {/* Step Indicators */}
        <div className="step-indicators">
          {[
            { num: 1, label: 'Help Type' },
            { num: 2, label: 'Details' },
            { num: 3, label: 'Contact' },
            { num: 4, label: 'Review' }
          ].map(step => (
            <div
              key={step.num}
              className={`step-indicator ${currentStep === step.num ? 'active' : ''} ${
                currentStep > step.num ? 'completed' : ''
              }`}
            >
              <div className="step-number">
                {currentStep > step.num ? '✓' : step.num}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="request-form">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="form-actions">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="btn btn-secondary"
                disabled={submitting}
              >
                ← Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary"
                disabled={submitting}
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary btn-submit"
                disabled={submitting || submitSuccess}
              >
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestHelp;
