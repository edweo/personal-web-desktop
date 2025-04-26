### Personal Web Desktop
This is a web component that simulates a desktop environment where the user can: 
- Launch applications via the `Taskbar`
- `Minimise/maximise/resize` the currently open process windows
- `Move` process windows around the desktop
- Use a `Task Manager` to close/show/hide process windows
- `Open` multiple process windows

### Features that Were not Implemented
- When opening multiple windows, the next process window could be shown slightly lower  (x, y)
to not hide/block the other window, for now all new process windows open in top left corner of the PWD
- Some applications are not re-sizeable due to the fact that initially these applications were not developed with that in mind
(we can see this as the developer did not intend for application to be resizable),
however the PWD itself has no problem to resize a window and this feature is enabled by specifying `resizable: true`
in `pwd_options` in the application options

### Developing Applications (web-components) for the PWD
More information and the template to develop an application can be found
[here](for_developers/README.md)