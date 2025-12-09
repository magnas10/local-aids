import React, { useState } from 'react';
import './Testimonials.css';

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Margaret Thompson',
      age: '74 years old',
      location: 'Perth, WA',
      type: 'Helped',
      avatar: 'https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=150&h=150&fit=crop&crop=face',
      quote: "When I broke my ankle, I thought I'd be stuck at home for weeks. David came to help with my grocery shopping every Tuesday for 6 weeks. He didn't just shop - he chatted about the weather, helped me organize my pantry, and even brought his dog for visits. It felt like having a grandson nearby.",
      task: 'Weekly grocery shopping assistance',
      partner: 'David Chen',
      completed: 'December 2024',
      rating: 5
    },
    {
      id: 2,
      name: 'David Chen',
      age: '28 years old',
      location: 'Perth, WA',
      type: 'Volunteer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: "Helping Margaret was one of the most rewarding experiences I've had. What started as weekly grocery runs became genuine friendship. She taught me her secret recipe for lemon cake, and I learned so much about local history from her stories. Volunteering gave me a sense of purpose I didn't know I was missing.",
      task: 'Weekly grocery shopping assistance',
      partner: 'Margaret Thompson',
      completed: 'December 2024',
      rating: 5
    },
    {
      id: 3,
      name: 'Robert Singh',
      age: '81 years old',
      location: 'Adelaide, SA',
      type: 'Helped',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: "My grandson lives overseas and I struggled with my new smartphone for months. Emma was so patient teaching me how to video call him. Now I chat with my grandson in London every Sunday! She even helped me set up online banking. These young people are angels.",
      task: 'Smartphone and technology setup',
      partner: 'Emma Rodriguez',
      completed: 'November 2024',
      rating: 5
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-wrapper">
        <div className="testimonials-header">
          <span className="testimonials-badge">⭐ Success Stories</span>
          <h2>Real Stories, Real Impact</h2>
          <p>Hear from community members whose lives have been touched by kindness. Every connection creates lasting bonds that go beyond the original task.</p>
        </div>

        <div className="testimonials-showcase">
          <div className="featured-testimonial">
            <div className="quote-icon">"</div>
            <blockquote>{testimonials[activeIndex].quote}</blockquote>
            <div className="testimonial-author">
              <img 
                src={testimonials[activeIndex].avatar} 
                alt={testimonials[activeIndex].name}
                className="author-avatar"
              />
              <div className="author-info">
                <h4>{testimonials[activeIndex].name}</h4>
                <p>{testimonials[activeIndex].age} • {testimonials[activeIndex].location}</p>
                <div className="author-rating">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
              </div>
              <span className={`author-type ${testimonials[activeIndex].type.toLowerCase()}`}>
                {testimonials[activeIndex].type === 'Helped' ? 'Received Help' : 'Volunteer'}
              </span>
            </div>
            <div className="testimonial-details">
              <div className="detail-item">
                <span className="detail-label">Task</span>
                <span className="detail-value">{testimonials[activeIndex].task}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">{testimonials[activeIndex].type === 'Helped' ? 'Volunteer' : 'Helped'}</span>
                <span className="detail-value">{testimonials[activeIndex].partner}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Completed</span>
                <span className="detail-value">{testimonials[activeIndex].completed}</span>
              </div>
            </div>
          </div>

          <div className="testimonials-nav">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                className={`nav-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={testimonial.avatar} alt={testimonial.name} />
                <div className="nav-info">
                  <span className="nav-name">{testimonial.name}</span>
                  <span className="nav-location">{testimonial.location}</span>
                </div>
                <span className={`nav-type ${testimonial.type.toLowerCase()}`}>
                  {testimonial.type === 'Helped' ? '✓' : '•'}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="testimonials-cta">
          <button className="read-more-btn">
            Read More Success Stories
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
