# Testing Plan

## Unit Tests

### Core Package
- Configuration loading and validation
- File discovery and filtering
- ID generation logic
- Error handling

### Parser Packages
- HTML element parsing
- Vue template processing
- Angular template handling
- JSX/TSX component parsing
- Edge cases and malformed input

## Integration Tests

### End-to-End Workflows
- Complete scan process for different file types
- Configuration file loading
- CLI flag handling
- Multi-framework projects

### Parser Integration
- HTML parser with various file types
- JS parser with React/TypeScript components
- Cross-parser compatibility

## Test Structure

```
tests/
├── unit/
│   ├── core/
│   ├── parser-html/
│   └── parser-js/
├── integration/
├── fixtures/
└── snapshots/
```

## Test Configuration

### Vitest Setup
- Node.js environment
- Coverage reporting with v8
- Snapshot testing for output comparison
- Watch mode for development

### Coverage Requirements
- Minimum 80% line coverage
- Focus on critical paths
- Exception handling coverage

## Performance Testing

### Large File Handling
- Files with 1000+ elements
- Multiple file processing
- Memory usage monitoring
- Processing time benchmarks

## CLI Testing

### Command Validation
- Dry run mode testing
- Write mode verification
- Flag combination testing
- Error scenario handling

## Continuous Integration

### GitHub Actions
- Test on Node.js 18, 20, 22
- Coverage reporting
- Automated test runs on PR
- Performance regression detection