module.exports = {
  // See http://brunch.io for documentation.
  files: {
    javascripts: {
      joinTo: {
        'libraries.js': /^(?!app\/)/,
        'app.js': /^app\//
      },
      order: {
        before: [/jquery/]
      }
    },
    stylesheets: { joinTo: 'app.css' },
    templates: { joinTo: 'app.js' }
  },

  server: {
    run: true,
    path: "server.js"
  }
};
