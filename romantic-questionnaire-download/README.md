# 🌷 Romantic Questionnaire App

A beautiful romantic questionnaire web app with a cherry red theme and tulip decorations.

## ✨ Features

- 4 custom romantic questions with emoji support
- Yes/No selection with smart delay logic:
  - **Yes**: Instant proceed (no delay)
  - **No**: 5-second delay + reason input required
- Beautiful cherry red romantic theme
- Floating tulip animations
- Romantic Playfair Display font
- Progress bar tracking
- Success page: "come to dm fasttt 💕"
- Reason input box when selecting "No"
- Final message input if last question is "No"

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Extract/Clone this folder**

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
romantic-questionnaire/
├── public/
│   └── index.html          # HTML template with emoji support
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── button.jsx  # Button component
│   │       └── textarea.jsx # Textarea component
│   ├── mock/
│   │   └── mockData.js     # Mock data storage (ready for backend)
│   ├── pages/
│   │   └── Questionnaire.jsx # Main questionnaire component
│   ├── App.css             # App styling
│   ├── App.js              # Main app component
│   ├── index.css           # Global styles with Tailwind
│   └── index.js            # React entry point
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
└── README.md              # This file
```

## 🎨 Customization

### Change Questions

Edit the `questions` array in `src/pages/Questionnaire.jsx`:

```javascript
const questions = [
  "Your question 1? 🌷",
  "Your question 2? 😊",
  "Your question 3?",
  "Your question 4? 💕"
];
```

### Change Colors

Modify the gradient colors in `src/pages/Questionnaire.jsx`:
- Main background: `from-rose-950 via-red-900 to-pink-900`
- Buttons: `from-red-600 to-pink-500`
- Text: `text-red-600`

### Change Delay Time

In `src/pages/Questionnaire.jsx`, find the timer logic:
```javascript
setCountdown(5); // Change 5 to your desired seconds
```

## 🔧 Backend Integration (Optional)

Currently using mock data. To connect to a real backend:

1. Replace `saveMockResponse()` calls in `Questionnaire.jsx` with API calls
2. Set up your backend API endpoint (e.g., FastAPI, Express)
3. Create MongoDB schema for responses
4. Update the save logic to POST to your API

Example:
```javascript
const response = await fetch('YOUR_API_URL/api/responses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(finalData)
});
```

## 🌸 Technologies Used

- **React 19** - UI framework
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Lucide React** - Icons
- **Playfair Display** - Romantic font
- **React Router** - Routing

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## 💕 Features Breakdown

### Delay Logic
- **Yes selected**: No delay, proceed immediately
- **No selected**: 5-second countdown before proceeding (first 3 questions only)
- Last question: No delay regardless of answer

### Input Validation
- "No" answer requires a reason to proceed
- Final message input if last question is "No"

### Animations
- Floating tulips in background
- Pulsing heart icons
- Smooth button transitions
- Progress bar animation
- Bouncing emojis on success page

## 📄 License

Free to use and customize for personal projects!

## 🙏 Credits

Built with love using React and Tailwind CSS
Images from Unsplash

---

Made with 💕 by [Your Name]
