import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

function Blog() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const handleReadMore = (postId) => {
    alert('Blog post feature coming soon!\n\nThis will navigate to the full blog post. For now, please check our social media for the latest updates.');
  };

  const blogPosts = [
    {
      id: 1,
      title: 'Building Stronger Communities Through Local Support',
      excerpt: 'Discover how small acts of kindness create ripple effects that strengthen entire neighborhoods and foster lasting connections.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop&q=80',
      author: 'Sarah Mitchell',
      date: 'December 5, 2025',
      category: 'Community',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'The Impact of Volunteering on Mental Health',
      excerpt: 'Research shows that volunteering not only helps others but significantly improves your own mental wellbeing and life satisfaction.',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop&q=80',
      author: 'Dr. Emily Rodriguez',
      date: 'December 1, 2025',
      category: 'Wellness',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Success Story: How Local Aid Changed Lives in Melbourne',
      excerpt: 'Meet the Johnson family and learn how a simple request for help transformed their lives and inspired an entire community.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop&q=80',
      author: 'James Chen',
      date: 'November 28, 2025',
      category: 'Stories',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Tips for First-Time Volunteers: What to Expect',
      excerpt: 'New to volunteering? Here\'s everything you need to know to make your first experience meaningful and rewarding.',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&q=80',
      author: 'Michael Thompson',
      date: 'November 25, 2025',
      category: 'Tips',
      readTime: '4 min read'
    },
    {
      id: 5,
      title: 'Creating Safe Spaces: Our Commitment to Community Safety',
      excerpt: 'Learn about the comprehensive safety measures and guidelines that make Local Aid a trusted platform for everyone.',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop&q=80',
      author: 'Sarah Mitchell',
      date: 'November 20, 2025',
      category: 'Safety',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'The Power of Neighborhood Connections',
      excerpt: 'Why knowing your neighbors matters more than ever in our digital age, and how to build meaningful local relationships.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=80',
      author: 'Emily Rodriguez',
      date: 'November 15, 2025',
      category: 'Community',
      readTime: '6 min read'
    }
  ];

  const categories = ['all', 'Community', 'Wellness', 'Stories', 'Tips', 'Safety'];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Community Blog</h1>
        <p>Stories, insights, and tips from our community of helpers and changemakers</p>
      </div>

      {/* Category Filter */}
      <div className="blog-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {selectedCategory === 'all' && (
        <div className="featured-post">
          <div className="featured-post-image">
            <img src={blogPosts[0].image} alt={blogPosts[0].title} />
            <span className="featured-badge">Featured</span>
          </div>
          <div className="featured-post-content">
            <span className="post-category">{blogPosts[0].category}</span>
            <h2>{blogPosts[0].title}</h2>
            <p>{blogPosts[0].excerpt}</p>
            <div className="post-meta">
              <span className="post-author">{blogPosts[0].author}</span>
              <span className="post-separator">•</span>
              <span className="post-date">{blogPosts[0].date}</span>
              <span className="post-separator">•</span>
              <span className="post-read-time">{blogPosts[0].readTime}</span>
            </div>
            <button className="btn-primary">Read More</button>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="blog-grid">
        {filteredPosts.map(post => (
          <article key={post.id} className="blog-card">
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
              <span className="blog-category-badge">{post.category}</span>
            </div>
            <div className="blog-card-content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <span className="post-author">{post.author}</span>
                <span className="post-separator">•</span>
                <span className="post-read-time">{post.readTime}</span>
              </div>
              <div className="blog-card-footer">
                <span className="post-date">{post.date}</span>
                <button className="read-more-link">Read More →</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="blog-newsletter-cta">
        <h2>Stay Updated</h2>
        <p>Get the latest stories and insights delivered straight to your inbox</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="btn-primary">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default Blog;
