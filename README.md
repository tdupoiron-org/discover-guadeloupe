# ✨ Discover Sevilla

A modern web application to help you explore and track your journey through Sevilla's most captivating sites.

## 🚀 Features

- 📍 Browse curated list of Sevilla's top sites
- ✓ Track visited locations
- 📊 Monitor your exploration progress
- 🔍 Filter sites by visit status
- 📱 Fully responsive design
- 🎨 Clean, professional UI following AXA brand guidelines

## 🛠️ Development

### Prerequisites

- Node.js 20 or higher
- npm

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run E2E tests
- `npm run test:ui` - Run tests in interactive UI mode
- `npm run test:headed` - Run tests with browser UI
- `npm run test:debug` - Debug tests step-by-step
- `npm run test:report` - View test report

## 🧪 Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (recommended for development)
npm run test:ui

# Run tests in a specific browser
npx playwright test --project=chromium

# Debug tests
npm run test:debug
```

### Test Coverage

Our E2E tests cover:
- ✅ Navigation and page loading
- ✅ Site browsing and card display
- ✅ Filter interactions (All Sites, To Visit, Visited)
- ✅ Visit tracking and progress updates
- ✅ Visual regression testing
- ✅ Responsive design on multiple viewports

### Writing Tests

See [CONTRIBUTING_TESTS.md](./CONTRIBUTING_TESTS.md) for guidelines on writing tests.

For detailed testing documentation, see [e2e/README.md](./e2e/README.md).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests to ensure everything works (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🎨 Design Philosophy

This application follows AXA's brand guidelines:
- **Colors**: Blue and white primary palette
- **Typography**: AXA official font family
- **UX**: Clean, intuitive, and minimalist
- **Values**: Trustworthy and reliable

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
