# TicketSolve - Web Ticketing System

A web-based ticketing system built with PHP, Twig templating engine, and modern frontend technologies.

## Technologies and Frameworks Used

- **Backend:**
  - PHP 7.4+
  - Twig 3.21 (Templating Engine)
  - Composer (PHP Package Manager)

- **Frontend:**
  - TailwindCSS (via CDN)
  - Vanilla JavaScript
  - HTML5
  - CSS3

## Setup and Installation

1. **Prerequisites:**
   - PHP 7.4 or higher
   - Composer installed
   - Web server (Apache/Nginx)

2. **Installation Steps:**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   composer install

   # Configure web server to point to the project directory
   # For local development, you can use PHP's built-in server:
   php -S localhost:8000
   ```

3. **Configuration:**
   - The application uses a simple file-based routing system
   - Twig template caching is disabled for development (can be enabled in production)
   - All templates are stored in the `templates/` directory

## Project Structure

```
├── public/             # Public assets
│   ├── css/           # Stylesheets
│   └── js/            # JavaScript files
├── src/               # PHP source files
├── templates/         # Twig templates
│   ├── base.twig      # Base template
│   └── pages/         # Page templates
├── vendor/            # Composer dependencies
├── composer.json      # Composer configuration
└── index.php         # Application entry point
```

## UI Components and State Structure

- **Components:**
  - Landing Page (`landing.twig`)
  - Login Form (`login.twig`)
  - Registration Form (`register.twig`)
  - Dashboard (`dashboard.twig`)
  - Ticket Form (`ticketform.twig`)
  - My Tickets View (`mytickets.twig`)

- **State Management:**
  - User authentication state managed through PHP sessions
  - Client-side state handled through JavaScript
  - Form data managed through POST requests

## Accessibility Features

- Semantic HTML structure
- Responsive design for various screen sizes
- Mobile-friendly navigation
- ARIA labels where applicable
- High contrast color scheme

## Known Issues and Limitations

1. Template caching is disabled by default (enable for production)
2. No built-in API documentation
3. Session management is basic and could be enhanced
4. Form validation is primarily client-side

## Test User Credentials

For testing purposes, you can use the following credentials:

```
Email: test@ticketsolve.com
Password: Test123!
```

## Development Notes

- The application uses a simple routing system based on GET parameters
- All JavaScript files are modular and page-specific
- TailwindCSS is included via CDN (consider installing locally for production)
- Error reporting is enabled for development (should be disabled in production)

## Security Considerations

1. Enable template caching in production
2. Implement CSRF protection
3. Add rate limiting for login attempts
4. Enable HTTPS in production
5. Sanitize all user inputs
