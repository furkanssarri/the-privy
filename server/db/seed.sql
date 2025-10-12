BEGIN;

-- Insert sample users (password hashes are dummy values for development)
INSERT INTO users (username, password_hash, salt, is_admin, created_at) VALUES
  ('alice_dev', 'pbkdf2$100000$salt123$abc123...', 'salt123', TRUE, NOW() - INTERVAL '10 days'),
  ('bob_coder', 'pbkdf2$100000$salt456$def456...', 'salt456', FALSE, NOW() - INTERVAL '7 days'),
  ('charlie_tech', 'pbkdf2$100000$salt789$ghi789...', 'salt789', FALSE, NOW() - INTERVAL '5 days'),
  ('diana_design', 'pbkdf2$100000$salt012$jkl012...', 'salt012', FALSE, NOW() - INTERVAL '3 days'),
  ('admin', 'pbkdf2$100000$salt999$xyz999...', 'salt999', TRUE, NOW() - INTERVAL '1 day');

-- Insert sample posts
INSERT INTO posts (title, content, author_id, created_at) VALUES
(
    'Welcome to Our Exclusive Club!', 
    'This is the first post in our members-only community. Feel free to introduce yourselves and share what brought you here. Remember to be respectful and enjoy the exclusive content!', 
    (SELECT id FROM users WHERE username = 'alice_dev'), 
    NOW() - INTERVAL '9 days'
),
(
    'The Secret to Great Coffee', 
    'After years of research, I''ve discovered the perfect coffee brewing technique. The key is in the water temperature and grind size. Members can ask me for the detailed recipe!', 
    (SELECT id FROM users WHERE username = 'bob_coder'), 
    NOW() - INTERVAL '6 days'
),
(
    'My Journey Learning Node.js', 
    'I started learning Node.js six months ago and wanted to share my experience. The event loop was confusing at first, but once it clicked, everything made so much more sense. Any other beginners here?', 
    (SELECT id FROM users WHERE username = 'charlie_tech'), 
    NOW() - INTERVAL '4 days'
),
(
    'Design Principles for Modern Web Apps', 
    'Good design is not just about aesthetics - it''s about usability and experience. Here are my top 5 principles for creating web applications that users love to interact with.', 
    (SELECT id FROM users WHERE username = 'diana_design'), 
    NOW() - INTERVAL '2 days'
),
(
    'Admin Announcement: New Features Coming Soon!', 
    'Hello members! We have some exciting new features in the pipeline. Enhanced privacy controls and group messaging are just around the corner. Stay tuned for updates!', 
    (SELECT id FROM users WHERE username = 'admin'), 
    NOW() - INTERVAL '12 hours'
),
(
    'Why I Love Working Remotely', 
    'After two years of remote work, I can''t imagine going back to an office. The flexibility, the focus time, the work-life balance... it''s been transformative. What are your experiences?', 
    (SELECT id FROM users WHERE username = 'alice_dev'), 
    NOW() - INTERVAL '3 days'
);

COMMIT;
