# Diagram Module Documentation

## Dynamic Model Relationships Implementation

The diagram module has been updated to implement dynamic model relationships, ensuring that only models created during the current application session are displayed and connected.

### Key Changes:

1. **Modified API Endpoint**: 
   - The `/api/models` GET endpoint now returns an empty models array by default instead of reading from the file
   - This ensures that when the application starts, it doesn't load any pre-existing models

2. **Updated ModelStateService**:
   - The `initialize()` method now starts with an empty models array
   - This ensures a clean state when the application starts

3. **Removed Direct API Call in CodeDiagramSection**:
   - Removed the separate fetch to `/api/models` on component mount
   - Now, only models created after the application starts will be displayed

4. **Added Clear Models Script**:
   - Created a new script (`scripts/clear-models.js`) that clears the models.json file
   - This script can be run independently or as part of the development process

5. **Added New Development Script**:
   - Added a new `dev:clean` script in package.json that clears models before starting the development server
   - Use `npm run dev:clean` or `yarn dev:clean` to start the application with a clean state

### Usage:

To start the application with a clean state (no pre-existing models):

```bash
npm run dev:clean
# or
yarn dev:clean
```

This ensures that the model relationships will only be displayed for models created during the current application session.

### Benefits:

- Cleaner development experience
- True reflection of the dynamic relationship between models
- No confusion caused by pre-existing models or relationships 