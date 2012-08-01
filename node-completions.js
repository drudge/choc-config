var http = require('http')
  , fs = require('fs')
  , out = {};

[ 'process', 'stdio', 'util', 'fs', 'domain', 'net', 'http', 'https', 'tls', 'events', 'crypto', 'path', 'url', 'vm', 'querystring', 'os', 'tty', 
  'punycode', 'zlib', 'dns', 'dgram'].forEach(function(moduleName) {
  var opts = {
      host: 'nodejs.org'
    , port: 80
    , path: '/api/' + moduleName + '.json'
  };

  http.request(opts, function(res) {
    var body = '';
    res.setEncoding('utf8');

    if (res.statusCode !== 200) {
      console.log('Failed to fetch:', opts.path);
      return; 
    }

    res.on('data', function (chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var json
        , module;

      try {
        json = JSON.parse(body); 
      } catch (e) {
        console.log('Failed to parse:', opts.path);
        return; 
      }
      if (json.modules) {
        module = json.modules[0];
      } else if (json.globals) {
         module = json.globals[0];

         if (moduleName == 'stdio') {
          moduleName = 'console'; 
         }
      }


      out[moduleName] = {};

      if (module) {

        out[moduleName]['methods'] = {
           icon:'method'
          , type: 'method'
          , items: []
          , prototypes: []
          , prefix: moduleName + '.'
          , extendedConfidence: true
        };

        //console.log(module);
        if (module.methods) {
          module.methods.forEach(function(method) {
            out[moduleName].methods.items.push(method.name);
            out[moduleName].methods.prototypes.push(method.textRaw);
          });
        }

        if (out[moduleName].methods) {
          fs.writeFile('js/' + moduleName + '_' + 'methods.json', JSON.stringify(out[moduleName].methods));
          console.log('Wrote:', moduleName + '_' + 'methods.json');
        }
      }

      if (module.classes) {      
        out[moduleName]['classes'] = {
           icon:'class'
          , items: []
          , prefix: moduleName + '.'
        };

        if (module.classes) {
          module.classes.forEach(function(cls) {
            out[moduleName].classes.items.push(cls.name);
          });
        }

        if (out[moduleName].classes) {
          fs.writeFile('js/' + moduleName + '_' + 'classes.json', JSON.stringify(out[moduleName].classes));
          console.log('Wrote:', moduleName + '_' + 'classes.json');
        }
      }
    });
  }).end();
});