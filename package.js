Package.describe({
  name: "tkornblit:intercom",
  summary: "Intercom.io basic integration",
  version: "0.2.1"
});

Package.on_use(function (api, where) {
  api.use('session@1.0.4', "client");
  api.add_files('intercom_server.js', 'server');
  api.add_files(['intercom_loader.js', 'intercom_client.js'], 'client');
  
  api.export('IntercomSettings');
  api.export('IntercomHash', 'server');
});
