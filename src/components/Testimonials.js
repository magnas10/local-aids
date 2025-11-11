import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const testimonials = [
    {
      name: 'Margaret Thompson',
      age: '74 years old',
      location: 'Perth, WA',
      type: 'Helped',
      quote: "When I broke my ankle, I thought I'd be stuck at home for weeks. David came to help with my grocery shopping every Tuesday for 6 weeks. He didn't just shop - he chatted about the weather, helped me organize my pantry, and even brought his dog for visits. It felt like having a grandson nearby.",
      task: 'Weekly grocery shopping assistance',
      volunteer: 'David Chen',
      completed: 'December 2024',
      rating: 5
    },
    {
      name: 'David Chen',
      age: '28 years old',
      location: 'Perth, WA',
      type: 'Volunteer',
      quote: "Helping Margaret was one of the most rewarding experiences I've had. What started as weekly grocery runs became genuine friendship. She taught me her secret recipe for lemon cake, and I learned so much about local history from her stories. Volunteering gave me a sense of purpose I didn't know I was missing.",
      task: 'Weekly grocery shopping assistance',
      helped: 'Margaret Thompson',
      completed: 'December 2024',
      rating: 5
    },
    {
      name: 'Robert Singh',
      age: '81 years old',
      location: 'Adelaide, SA',
      type: 'Helped',
      quote: "My grandson lives overseas and I struggled with my new smartphone for months. Emma was so patient teaching me how to video call him. Now I chat with my grandson in London every Sunday! She even helped me set up online banking. These young people are angels.",
      task: 'Smartphone and technology setup',
      volunteer: 'Emma Rodriguez',
      completed: 'November 2024',
      rating: 5
    }
  ];

  return (
    <section className="testimonials">
      <div className="preview-badge">Preview</div>
      <h2 className="section-title">Real Stories, Real Impact</h2>
      <p className="section-subtitle">
        Hear from community members whose lives have been touched by kindness. Every
        connection creates lasting bonds that go beyond the original task.
      </p>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <div>
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-info">
                  {testimonial.age} • {testimonial.location}
                </p>
              </div>
              <span className={`type-badge ${testimonial.type.toLowerCase()}`}>
                {testimonial.type === 'Helped' ? '🙏 Helped' : '👥 Volunteer'}
              </span>
            </div>
            <div className="rating">
              {'⭐'.repeat(testimonial.rating)}
            </div>
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <div className="testimonial-footer">
              <p><strong>Task:</strong> {testimonial.task}</p>
              <p>
                <strong>{testimonial.type === 'Helped' ? 'Volunteer:' : 'Helped:'}</strong>{' '}
                {testimonial.volunteer || testimonial.helped}
              </p>
              <p><strong>Completed:</strong> {testimonial.completed}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="read-more-section">
        <button className="read-more-btn">Read More Success Stories</button>
      </div>
    </section>
  );
}

export default Testimonials;
