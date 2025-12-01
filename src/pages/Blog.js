import React from 'react';
import './Pages.css';

function Blog() {
  const featuredPost = {
    id: 1,
    title: 'How Community Support is Transforming Australian Neighborhoods',
    excerpt: 'Discover how local volunteers are making a difference in communities across Australia, one act of kindness at a time.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop',
    author: 'Emma Wilson',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    date: 'November 28, 2025',
    readTime: '5 min read',
    category: 'Community'
  };

  const posts = [
    {
      id: 2,
      title: '10 Ways to Make a Difference in Your Local Community',
      excerpt: 'Simple yet impactful ways you can contribute to building a stronger, more connected neighborhood.',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=250&fit=crop',
      author: 'James Chen',
      date: 'November 25, 2025',
      readTime: '4 min read',
      category: 'Volunteering'
    },
    {
      id: 3,
      title: 'The Mental Health Benefits of Helping Others',
      excerpt: 'Research shows that volunteering can significantly improve your mental wellbeing. Here\'s what the science says.',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      author: 'Dr. Sarah Mitchell',
      date: 'November 22, 2025',
      readTime: '6 min read',
      category: 'Wellness'
    },
    {
      id: 4,
      title: 'Spotlight: Rural Communities Coming Together',
      excerpt: 'How remote Australian communities are using Local AIDS to overcome distance and isolation.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop',
      author: 'Mark Thompson',
      date: 'November 18, 2025',
      readTime: '5 min read',
      category: 'Stories'
    },
    {
      id: 5,
      title: 'Safety Tips for Volunteers and Help Seekers',
      excerpt: 'Essential guidelines to ensure safe and positive experiences for everyone in our community.',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=250&fit=crop',
      author: 'Local AIDS Team',
      date: 'November 15, 2025',
      readTime: '3 min read',
      category: 'Safety'
    },
    {
      id: 6,
      title: 'From Stranger to Friend: Building Lasting Connections',
      excerpt: 'Heartwarming stories of friendships that started with a simple offer to help.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop',
      author: 'Lisa Park',
      date: 'November 12, 2025',
      readTime: '4 min read',
      category: 'Stories'
    }
  ];

  const categories = ['All', 'Community', 'Volunteering', 'Stories', 'Wellness', 'Safety', 'Tips'];

  return (
    <div className="page-container blog-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="page-hero-content">
          <span className="page-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Our Blog
          </span>
          <h1>Stories & Insights</h1>
          <p>Discover inspiring stories, helpful tips, and news from our community.</p>
        </div>
      </section>

      {/* Categories */}
      <section className="blog-categories">
        <div className="section-container">
          <div className="category-pills">
            {categories.map((category, index) => (
              <button 
                key={index} 
                className={`category-pill ${index === 0 ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="featured-post-section">
        <div className="section-container">
          <article className="featured-post">
            <div className="featured-post-image">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <span className="featured-badge">Featured</span>
            </div>
            <div className="featured-post-content">
              <span className="post-category">{featuredPost.category}</span>
              <h2>{featuredPost.title}</h2>
              <p>{featuredPost.excerpt}</p>
              <div className="post-meta">
                <div className="post-author">
                  <img src={featuredPost.authorImage} alt={featuredPost.author} />
                  <span>{featuredPost.author}</span>
                </div>
                <span className="post-date">{featuredPost.date}</span>
                <span className="post-read-time">{featuredPost.readTime}</span>
              </div>
              <button className="btn-primary">Read Article</button>
            </div>
          </article>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="section-container">
          <h2>Latest Articles</h2>
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} />
                  <span className="post-category">{post.category}</span>
                </div>
                <div className="blog-card-content">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Load More */}
          <div className="load-more">
            <button className="btn-secondary">Load More Articles</button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="page-cta">
        <div className="cta-content">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest stories and community updates delivered to your inbox.</p>
          <form className="newsletter-form-inline" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Blog;
