import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { helpRequestsAPI } from '../services/api';
import './RequestHelp.css';

function RequestHelp() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    helpType: '',
    urgency: '',
    details: '',
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      address: '',
      addressValidated: false,
      addressPlaceId: ''
    }
  });

  const [addressError, setAddressError] = useState('');
  const [useManualAddress, setUseManualAddress] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const addressInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps?.places) {
        setMapsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBMYGJcHkXqXZ5JF5XqXZ5JF5XqXZ5JF5Q&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapsLoaded(true);
      script.onerror = () => {
        console.warn('Google Maps failed to load, using manual entry');
        setUseManualAddress(true);
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize autocomplete when maps is loaded
  useEffect(() => {
    if (mapsLoaded && addressInputRef.current && !useManualAddress && !autocompleteRef.current) {
      try {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          addressInputRef.current,
          {
            types: ['address'],
            componentRestrictions: { country: ['au', 'us'] }
          }
        );

        autocompleteRef.current.setFields(['formatted_address', 'address_components', 'place_id']);

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place && place.formatted_address) {
            setFormData(prev => ({
              ...prev,
              contactInfo: {
                ...prev.contactInfo,
                address: place.formatted_address,
                addressValidated: true,
                addressPlaceId: place.place_id || ''
              }
            }));
            setAddressError('');
          }
        });
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        setUseManualAddress(true);
      }
    }
  }, [mapsLoaded, useManualAddress]);

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
      id: 'meals',
      title: 'Meal Support',
      description: 'Meal preparation, delivery',
      icon: '🍽️',
      selected: formData.helpType === 'meals'
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

  const handleSubmit = async () => {
    // Validate all fields
    if (!formData.helpType) {
      setSubmitError('Please select a help type');
      return;
    }
    if (!formData.urgency) {
      setSubmitError('Please select urgency level');
      return;
    }
    if (!formData.details.trim()) {
      setSubmitError('Please provide details about your request');
      return;
    }
    if (!formData.contactInfo.name.trim()) {
      setSubmitError('Please enter your name');
      return;
    }
    if (!formData.contactInfo.phone.trim()) {
      setSubmitError('Please enter your phone number');
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.contactInfo.phone.trim())) {
      setSubmitError('Please enter a valid 10-digit phone number');
      return;
    }
    if (!formData.contactInfo.email.trim()) {
      setSubmitError('Please enter your email');
      return;
    }
    if (!formData.contactInfo.email.includes('@')) {
      setSubmitError('Please enter a valid email address');
      return;
    }
    if (!formData.contactInfo.address.trim() || formData.contactInfo.address.trim().length < 10) {
      setSubmitError('Please enter a complete address');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      // Parse address into suburb, state, postcode if possible
      const addressParts = formData.contactInfo.address.trim().split(',');
      const suburb = addressParts.length > 1 ? addressParts[addressParts.length - 2]?.trim() || 'Suburb' : 'Suburb';
      const statePostcode = addressParts.length > 0 ? addressParts[addressParts.length - 1]?.trim() : 'VIC 3000';
      const stateParts = statePostcode.split(' ').filter(p => p);
      const state = stateParts.length > 0 ? stateParts[0] : 'VIC';
      const postcode = stateParts.length > 1 ? stateParts[1] : '3000';

      const requestData = {
        fullName: formData.contactInfo.name,
        email: formData.contactInfo.email,
        phone: formData.contactInfo.phone,
        address: formData.contactInfo.address,
        suburb: suburb,
        state: state,
        postcode: postcode,
        helpType: formData.helpType,
        urgency: formData.urgency,
        description: formData.details,
        agreeTerms: true,
        agreePrivacy: true
      };

      console.log('Submitting help request:', requestData);
      await helpRequestsAPI.submit(requestData);

      setSubmitSuccess(true);
      setFormData({
        helpType: '',
        urgency: '',
        details: '',
        contactInfo: {
          name: '',
          phone: '',
          email: '',
          address: '',
          addressValidated: false,
          addressPlaceId: ''
        }
      });

      // Show success and redirect
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting help request:', error);
      // Extract specific field errors if available
      let errorMessage = 'Failed to submit request. ';
      if (error.errors && Array.isArray(error.errors)) {
        const fieldErrors = error.errors.map(e => e.msg).join('; ');
        errorMessage += fieldErrors;
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
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
              <div style={{ position: 'relative' }}>
                <input
                  ref={addressInputRef}
                  type="text"
                  placeholder={useManualAddress ? "Enter your full address" : "Start typing your address..."}
                  value={formData.contactInfo.address}
                  onChange={(e) => {
                    const newAddress = e.target.value;
                    setFormData({
                      ...formData,
                      contactInfo: {
                        ...formData.contactInfo,
                        address: newAddress,
                        addressValidated: newAddress.trim().length >= 10
                      }
                    });
                    setAddressError('');
                  }}
                />
                {mapsLoaded && !useManualAddress && (
                  <div style={{ 
                    position: 'absolute', 
                    right: '16px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    fontSize: '20px'
                  }}>
                    📍
                  </div>
                )}
              </div>
              {addressError && <div style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px' }}>{addressError}</div>}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '8px'
              }}>
                <small style={{ color: '#666', fontSize: '0.85em' }}>
                  {mapsLoaded && !useManualAddress ? (
                    formData.contactInfo.addressValidated 
                      ? '✓ Address selected' 
                      : '📍 Use map autocomplete or type manually'
                  ) : (
                    formData.contactInfo.addressValidated 
                      ? '✓ Address ready' 
                      : 'Type your full address (at least 10 characters)'
                  )}
                </small>
                {mapsLoaded && (
                  <button
                    type="button"
                    onClick={() => {
                      setUseManualAddress(!useManualAddress);
                      setFormData(prev => ({
                        ...prev,
                        contactInfo: {
                          ...prev.contactInfo,
                          address: '',
                          addressValidated: false,
                          addressPlaceId: ''
                        }
                      }));
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--teal)',
                      fontSize: '0.85em',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: '4px 8px'
                    }}
                  >
                    {useManualAddress ? '📍 Use map' : '✍️ Enter manually'}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="help-form-content">
            {submitSuccess && (
              <div style={{
                background: '#d1fae5',
                border: '2px solid #10b981',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                color: '#065f46'
              }}>
                <h3 style={{ margin: '0 0 10px 0' }}>✓ Request Submitted Successfully!</h3>
                <p style={{ margin: 0 }}>Thank you for submitting your help request. We'll connect you with available volunteers soon. Redirecting to home...</p>
              </div>
            )}
            {submitError && (
              <div style={{
                background: '#fee2e2',
                border: '2px solid #ef4444',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                color: '#991b1b'
              }}>
                <h3 style={{ margin: '0 0 10px 0' }}>✕ Error</h3>
                <p style={{ margin: 0 }}>{submitError}</p>
              </div>
            )}
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
              <div className="review-item">
                <h4>Email:</h4>
                <p>{formData.contactInfo.email}</p>
              </div>
              <div className="review-item">
                <h4>Address:</h4>
                <p>{formData.contactInfo.address}</p>
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
              onClick={() => {
                // Validate address on step 3 before proceeding
                if (currentStep === 3) {
                  if (!formData.contactInfo.address.trim()) {
                    setAddressError('Please enter your address.');
                    return;
                  }
                  if (formData.contactInfo.address.trim().length < 10) {
                    setAddressError('Please enter a complete address (at least 10 characters).');
                    return;
                  }
                  // Ensure addressValidated is set to true for manual entries
                  if (!formData.contactInfo.addressValidated) {
                    setFormData(prev => ({
                      ...prev,
                      contactInfo: {
                        ...prev.contactInfo,
                        addressValidated: true
                      }
                    }));
                  }
                }
                nextStep();
              }}
              className="btn-primary"
              disabled={currentStep === 1 && (!formData.helpType || !formData.urgency)}
            >
              Next
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          )}
        
        </div>
      </div>
    </div>
  );
}

export default RequestHelp;
