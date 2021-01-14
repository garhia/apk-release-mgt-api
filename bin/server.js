const startApp = require('../src/app');

startApp().then(app => {
  const port = 3000;
  app.listen(port, () => { console.log(`Application started at port ${port}`); });
}).catch(e => {
  console.log('Application failed to start. see error below');
  console.log(e);
});
