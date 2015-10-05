require 'uglifier'

task :serve do
  `ruby -run -e httpd -- -p 5000 .`
end

task :minify do
  file = Uglifier.new.compile(File.read("jquery_chapman_events_feed.js"))
  File.write('jquery_chapman_events_feed.min.js', file)
end