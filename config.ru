require 'sass/plugin/rack'

use Sass::Plugin::Rack
use Rack::Static, urls: ['/stylesheets', '/javascripts'], root: 'public'

run lambda { |env| [200, {'Content-Type' => 'text/html'}, File.open('public/index.html', 'r')] }