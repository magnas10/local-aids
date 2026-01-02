import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Sign Up & Create Your Profile',
      description: 'Join our community by creating a free account. Tell us about yourself, your skills, and what kind of help you can offer or need.',
      icon: '👤',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop&q=80',
      forHelper: 'Share your skills and availability',
      forSeeker: 'Describe your situation and needs'
    },
    {
      number: 2,
      title: 'Post or Browse Requests',
      description: 'Need help? Post a request detailing what you need. Want to help? Browse available opportunities in your area.',
      icon: '🔍',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&q=80',
      forHelper: 'Find opportunities that match your skills',
      forSeeker: 'Post your request with clear details'
    },
    {
      number: 3,
      title: 'Connect & Communicate',
      description: 'Use our secure messaging system to coordinate details, ask questions, and plan how to help.',
      icon: '💬',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=500&fit=crop&q=80',
      forHelper: 'Message to offer your assistance',
      forSeeker: 'Review volunteers and choose who to work with'
    },
    {
      number: 4,
      title: 'Provide or Receive Help',
      description: 'Meet safely, provide or receive the assistance needed, and make a positive impact in your community.',
      icon: '🤝',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=500&fit=crop&q=80',
      forHelper: 'Help your neighbor and make a difference',
      forSeeker: 'Get the support you need from caring volunteers'
    },
    {
      number: 5,
      title: 'Share Feedback & Build Trust',
      description: 'After the interaction, leave a review to help build trust in our community and recognize great volunteers.',
      icon: '⭐',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&h=500&fit=crop&q=80',
      forHelper: 'Receive recognition for your kindness',
      forSeeker: 'Thank your helper with a review'
    }
  ];

  const userTypes = [
    {
      type: 'help-seeker',
      title: 'Need Help?',
      icon: '🙋',
      description: 'Get support from caring volunteers in your community',
      features: [
        'Post requests for various types of assistance',
        'Browse verified volunteers in your area',
        'Communicate safely through our platform',
        'Get help with groceries, errands, companionship & more',
        'No fees - all help is provided by volunteers'
      ],
      cta: 'Post a Request',
      link: '/request-help'
    },
    {
      type: 'volunteer',
      title: 'Want to Help?',
      icon: '🌟',
      description: 'Make a difference by volunteering your time and skills',
      features: [
        'Find opportunities that match your skills',
        'Choose when and how much you want to help',
        'Build meaningful connections in your community',
        'Earn recognition and verified volunteer status',
        'Track your impact and volunteer hours'
      ],
      cta: 'Become a Volunteer',
      link: '/signup'
    }
  ];

  const safetyFeatures = [
    {
      icon: '✓',
      title: 'Verified Users',
      description: 'Email and phone verification for all users'
    },
    {
      icon: '✓',
      title: 'Secure Messaging',
      description: 'In-platform communication keeps contacts private'
    },
    {
      icon: '✓',
      title: 'Rating System',
      description: 'Community reviews help build trust'
    },
    {
      icon: '✓',
      title: '24/7 Support',
      description: 'Our team monitors activity and responds to reports'
    },
    {
      icon: '✓',
      title: 'Safety Guidelines',
      description: 'Comprehensive tips for safe interactions'
    },
    {
      icon: '✓',
      title: 'Easy Reporting',
      description: 'Quick reporting tools for any concerns'
    }
  ];

  return (
    <div className="how-it-works-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=600&fit=crop&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '120px 20px',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3em', marginBottom: '20px', fontWeight: 'bold' }}>
            How Local Aid Works
          </h1>
          <p style={{ fontSize: '1.3em', maxWidth: '800px', margin: '0 auto', opacity: 0.95 }}>
            Connecting neighbors to help neighbors. Simple, safe, and impactful.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="steps-section" style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5em', marginBottom: '60px', color: '#2c3e50' }}>
            Five Simple Steps
          </h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div key={index} className="step-card" style={{
                background: 'white',
                borderRadius: '15px',
                padding: '0',
                marginBottom: '40px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                overflow: 'hidden'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '0' }}>
                  <div style={{
                    backgroundImage: `url(${step.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '350px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      fontSize: '3em',
                      background: 'linear-gradient(135deg, #20b2aa 0%, #1a8f88 100%)',
                      color: 'white',
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>
                      {step.icon}
                    </div>
                  </div>
                  <div style={{ padding: '40px' }}>
                    <div style={{
                      display: 'inline-block',
                      background: '#20b2aa',
                      color: 'white',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      fontSize: '0.9em',
                      fontWeight: 'bold',
                      marginBottom: '15px'
                    }}>
                      Step {step.number}
                    </div>
                    <h3 style={{ fontSize: '1.8em', marginBottom: '15px', color: '#2c3e50' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
                      {step.description}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                      <div style={{ 
                        padding: '15px', 
                        background: '#e8f5f4', 
                        borderRadius: '10px',
                        borderLeft: '4px solid #20b2aa'
                      }}>
                        <strong style={{ color: '#20b2aa' }}>For Volunteers:</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.95em' }}>{step.forHelper}</p>
                      </div>
                      <div style={{ 
                        padding: '15px', 
                        background: '#fff3e0', 
                        borderRadius: '10px',
                        borderLeft: '4px solid #ffc107'
                      }}>
                        <strong style={{ color: '#f57c00' }}>For Help Seekers:</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.95em' }}>{step.forSeeker}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="user-types-section" style={{ padding: '80px 20px' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5em', marginBottom: '60px', color: '#2c3e50' }}>
            Choose Your Path
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
            {userTypes.map((userType, index) => (
              <div key={index} className="user-type-card" style={{
                background: 'white',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                textAlign: 'center',
                border: '2px solid #e0e0e0',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{ fontSize: '4em', marginBottom: '20px' }}>{userType.icon}</div>
                <h3 style={{ fontSize: '2em', marginBottom: '15px', color: '#2c3e50' }}>{userType.title}</h3>
                <p style={{ fontSize: '1.1em', color: '#666', marginBottom: '30px' }}>{userType.description}</p>
                <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                  {userType.features.map((feature, i) => (
                    <li key={i} style={{ 
                      padding: '10px 0', 
                      borderBottom: '1px solid #f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <span style={{ color: '#20b2aa', fontSize: '1.2em' }}>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={userType.link} style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #20b2aa 0%, #1a8f88 100%)',
                  color: 'white',
                  padding: '15px 40px',
                  borderRadius: '30px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1em',
                  transition: 'transform 0.2s ease'
                }}>
                  {userType.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="safety-section" style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5em', marginBottom: '20px', color: '#2c3e50' }}>
            Your Safety is Our Priority
          </h2>
          <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#666', maxWidth: '800px', margin: '0 auto 60px' }}>
            We've built multiple layers of protection to ensure safe and positive interactions
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '30px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {safetyFeatures.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '3em', 
                  color: '#20b2aa',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
                  {feature.icon}
                </div>
                <h4 style={{ fontSize: '1.3em', marginBottom: '10px', color: '#2c3e50' }}>
                  {feature.title}
                </h4>
                <p style={{ color: '#666', fontSize: '0.95em' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/safety-tips" style={{
              display: 'inline-block',
              background: 'white',
              color: '#20b2aa',
              padding: '15px 40px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid #20b2aa',
              fontSize: '1.1em'
            }}>
              Read Full Safety Guidelines →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ 
        padding: '100px 20px',
        backgroundImage: 'linear-gradient(rgba(32, 178, 170, 0.95), rgba(26, 143, 136, 0.95)), url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=600&fit=crop&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '1.3em', marginBottom: '40px', opacity: 0.95 }}>
            Join thousands of Australians making a difference in their communities
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/signup" style={{
              display: 'inline-block',
              background: 'white',
              color: '#20b2aa',
              padding: '18px 50px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2em'
            }}>
              Sign Up Now
            </Link>
            <Link to="/events" style={{
              display: 'inline-block',
              background: 'transparent',
              color: 'white',
              padding: '18px 50px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2em',
              border: '2px solid white'
            }}>
              Browse Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
