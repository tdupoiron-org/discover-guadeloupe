# Discover Guadeloupe - iOS App

A native iOS application for discovering and exploring the most captivating sites in Guadeloupe, built with React Native and Expo.

## Features

✨ **All Features from Web Version**:
- 📋 **List View**: Browse all attractions in a beautiful card-based interface
- 🗺️ **OpenStreetMap View**: Interactive map showing all sites with custom markers
- 🌍 **Multi-Language Support**: Available in English, French, and German
- 🌓 **Dark Mode**: Full dark mode support with system preference detection
- ✅ **Visit Tracking**: Mark sites as visited and track your progress
- 📍 **Geolocation**: Shows your current location on the map
- 🎨 **iPhone 13 mini Optimized**: Designed specifically for iPhone 13 mini screen size

## Technical Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development and build tools
- **React Navigation**: Tab-based navigation
- **react-native-maps**: OpenStreetMap integration
- **i18next**: Internationalization framework
- **TypeScript**: Type-safe development

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Expo CLI (installed via npx)
- iOS Simulator (Xcode) or physical iOS device for testing

## Installation

1. Navigate to the ios-app directory:
```bash
cd ios-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on iOS Simulator:
```bash
npm run ios
```

5. Or scan the QR code with Expo Go app on your iPhone

## Project Structure

```
ios-app/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── SiteCard.tsx
│   │   └── MapViewComponent.tsx
│   ├── screens/         # Main app screens
│   │   ├── ListScreen.tsx
│   │   ├── MapScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── contexts/        # React contexts
│   │   └── ThemeContext.tsx
│   ├── data/            # Static data
│   │   └── sites.ts
│   ├── types/           # TypeScript type definitions
│   │   └── site.ts
│   └── i18n/            # Internationalization
│       ├── index.ts
│       └── locales/
│           ├── en.json
│           ├── fr.json
│           └── de.json
├── App.tsx              # Main app component
└── app.json             # Expo configuration
```

## Building for Production

### iOS (requires macOS)

1. Build the iOS app:
```bash
expo build:ios
```

2. Follow the prompts to configure app signing

3. Download the IPA file and submit to App Store Connect

### EAS Build (Recommended)

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Configure EAS:
```bash
eas build:configure
```

3. Build for iOS:
```bash
eas build --platform ios
```

## Configuration

### iPhone 13 mini Optimization

The app is configured in `app.json` to:
- Support portrait orientation only
- Disable tablet support for focused iPhone experience
- Use automatic UI style for dark mode support

### Map Configuration

The app uses OpenStreetMap tiles via react-native-maps with the default provider. Custom map styling is applied in dark mode for better visibility.

## Features Details

### List View
- Displays all 12 curated Guadeloupe attractions
- Filter by: All Sites, To Visit, Visited
- Progress tracking with visual progress bar
- Rich site information with images, ratings, duration, and crowd levels

### Map View
- Interactive map centered on Guadeloupe
- Color-coded markers (red=must-see, orange=popular, green=hidden-gem)
- Tap markers to see detailed information
- User location shown with permission

### Dark Mode
- Three modes: Light, Dark, System
- Respects iOS system preferences
- Custom dark color scheme for better readability
- Dark map styling for consistent experience

### Multi-Language
- English (default)
- French (Français)
- German (Deutsch)
- Easy to add more languages by adding JSON files

## License

MIT License - Copyright (c) 2025 tdupoiron

## Author

Made with ❤️ for travelers by [tdupoiron](https://github.com/tdupoiron)
