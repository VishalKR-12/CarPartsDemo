# CarVision Pro

CarVision Pro is an AI-powered car parts labeling and detection system built with React, TypeScript, and Vite. It provides real-time detection, image upload analysis, and a user-friendly dashboard for managing and visualizing car part detections.

## Features
- **Real-Time Detection:** Use your camera to detect and label car parts live.
- **Image Upload & Analysis:** Upload images to analyze and label car parts automatically.
- **Dashboard:** Visualize detection results and manage your data.
- **Settings Panel:** Customize detection settings and preferences.
- **Documentation:** Access built-in documentation for guidance.
- **Light/Dark Mode:** Switch between light and dark themes for better usability.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/VishalKR-12/CarPartsDemo.git
   cd CarPartsDemo/project
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```

### Running the App
Start the development server:
```sh
npm run dev
```
Open your browser and go to the URL shown in the terminal (usually [http://localhost:5173](http://localhost:5173)).

### Building for Production
To build the app for production:
```sh
npm run build
```

To preview the production build:
```sh
npm run preview
```

## Project Structure
```
project/
  ├── public/           # Static assets
  ├── src/              # Source code
  │   ├── components/   # React components
  │   ├── context/      # React context providers
  │   ├── utils/        # Utility functions
  │   ├── App.tsx       # Main app component
  │   └── main.tsx      # Entry point
  ├── index.html        # HTML template
  ├── package.json      # Project metadata and scripts
  └── ...
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
This project is licensed under the MIT License.

## Acknowledgements
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) 
