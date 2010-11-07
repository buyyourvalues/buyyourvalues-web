desc "Migrate Database"
task :migrate do
  require 'model'
end

desc "Read and import from CSV"
task :import => [:clean, :migrate] do 
  require 'parse'
end

desc "Clean DB data"
task :clean do
  sh "sudo -u postgres dropdb buyyourvalues"
  sh "sudo -u postgres createdb buyyourvalues"
end

desc "DB console"
task :console do
  sh 'sqlite3 data.db'
end

task :db_empty => [:clean, :migrate]

task :default => :migrate
