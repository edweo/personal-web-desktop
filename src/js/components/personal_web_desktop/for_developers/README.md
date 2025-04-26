### Template for creating an application for the Personal Web Desktop
This is the bare-bones template to create an application, every application must include the following files:
- `index.js` - ESM module entry point when importing the application
- `pwd_options.js` - options for the PWD before starting and configuring the app
- `application_name.js` - core application code and web-component code, can be named after the application
- `application_name.css` - css file used for styling the application, can be named the same as core application file
- `icon.png` - the icon for the application for displaying purposes such as process window or task manager


To import the application in the Personal Web Desktop:
- Add the application in the `user_apps.js` file
- Open `personal_web_desktop.js`
- Add your application to the `user_programs` array in constructor