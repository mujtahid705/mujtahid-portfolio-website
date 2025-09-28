# Portfolio Template

A modern, responsive HTML/CSS/JavaScript portfolio template that's fully customizable through a JSON configuration file.

## Features

- **Fully Customizable**: Update all content through `data/config.json`
- **Responsive Design**: Works seamlessly on all devices
- **Dark Mode**: Built-in theme toggle functionality
- **Smooth Animations**: Scroll-based animations and interactive elements
- **Clean Code**: Separated HTML, CSS, and JavaScript files
- **Modern Design**: Professional portfolio layout with interactive components

## Project Structure

```
Portfolio/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All CSS styles
├── js/
│   └── script.js           # All JavaScript functionality
├── data/
│   └── config.json         # Configuration file for all content
├── assets/
│   └── images/             # Directory for project images
└── README.md               # This file
```

## Quick Start

1. **Clone or download** the project files
2. **Edit `data/config.json`** to customize your portfolio content
3. **Replace project images** in the `assets/images/` directory
4. **Open `index.html`** in your browser or deploy to a web server

## Customization

### Content Configuration

All content is controlled through the `data/config.json` file. Update the following sections:

#### Personal Information

```json
{
  "personal": {
    "name": "Your Name",
    "title": "Your Title",
    "role": "Your Role",
    "description": "Your description"
  }
}
```

#### Skills

Add or modify skills with names, icons, and proficiency levels:

```json
{
  "skills": {
    "frontend": [
      {
        "name": "React",
        "icon": "⚛️",
        "level": 95
      }
    ]
  }
}
```

#### Projects

Update your project portfolio:

```json
{
  "projects": [
    {
      "title": "Project Name",
      "description": "Project description",
      "image": "path/to/image.jpg",
      "technologies": ["React", "Node.js"],
      "links": {
        "demo": "https://demo-link.com",
        "github": "https://github.com/username/repo"
      }
    }
  ]
}
```

#### Experience

Add your work experience:

```json
{
  "experience": [
    {
      "position": "Job Title",
      "company": "Company Name",
      "period": "2020 - Present",
      "location": "Location",
      "achievements": ["Achievement 1", "Achievement 2"],
      "technologies": ["Tech 1", "Tech 2"]
    }
  ]
}
```

#### Contact Information

Update your contact details:

```json
{
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "Your Location",
    "social": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourusername",
      "email": "mailto:your.email@example.com"
    }
  }
}
```

### Styling

The template uses CSS custom properties (variables) for easy theme customization. Main colors can be adjusted in `css/styles.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #1a1a1a;
  --teal-accent: #0891b2;
  /* ... other variables */
}
```

### Adding New Sections

1. Add the section HTML structure to `index.html`
2. Add corresponding data to `config.json`
3. Update the JavaScript in `script.js` to populate the new section
4. Add any specific styling to `styles.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

## Credits

- Icons: Feather Icons (inline SVG)
- Fonts: Google Fonts (Inter & Poppins)
- Images: Unsplash (replace with your own)

## Support

For questions or issues, please refer to the code comments or create an issue in the repository.
