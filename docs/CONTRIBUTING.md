# Contributing to Idomatic

Thanks for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- Git

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/idomatic.git`
3. Install dependencies: `npm install`
4. Link packages for local development:
   ```bash
   cd packages/core && npm link
   cd ../parser-html && npm link
   cd ../parser-js && npm link
   cd ../create && npm link
   ```

## Project Structure

```
idomatic/
├── packages/
│   ├── core/           # Main CLI package
│   ├── parser-html/    # HTML/Vue/Angular parser
│   ├── parser-js/      # JSX/TSX parser
│   └── create/         # Project initializer
├── local-test/         # Local testing environment
└── docs/              # Documentation
```

## Development Workflow

### Making Changes
1. Create a feature branch: `git checkout -b feature/description`
2. Make your changes
3. Test locally in `local-test/` directory
4. Run tests: `npm test`
5. Commit with descriptive message
6. Push and create pull request

### Testing Your Changes
```bash
cd local-test
npx idomatic scan --dry  # Test without writing
npx idomatic scan --write # Test with writing
```

## Code Style

### Commit Messages
Use conventional commits:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `test: add tests`

### JavaScript Style
- Use ES6+ features
- Prefer `const` over `let`
- Use descriptive variable names
- Add comments for complex logic

## Testing

### Running Tests
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage
```

### Writing Tests
- Write tests for new features
- Ensure existing tests pass
- Use descriptive test names
- Test edge cases

## Pull Requests

### Before Submitting
- [ ] Tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation updated if needed
- [ ] Tested manually in local-test

### PR Description
Include:
- What changes were made
- Why the changes were needed
- How to test the changes
- Any breaking changes

## Reporting Issues

### Bug Reports
Include:
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Sample code if applicable

### Feature Requests
Include:
- Use case description
- Proposed solution
- Alternative solutions considered

## Release Process

We follow semantic versioning:
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

## Questions?

- Open an issue for bugs or feature requests
- Start a discussion for questions or ideas

Thanks for contributing!