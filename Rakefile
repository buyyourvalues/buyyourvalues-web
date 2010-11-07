desc "Migrate Database"
task :migrate do
  require 'model'
end

desc "Read and import from CSV"
task :parse => [:clean, :migrate] do
  require 'parse'
end

desc "Find addresses & geocode 'em"
task :yelp => [:parse] do
  require 'yelp'
end

desc "Import CSV data into DB"
task :import => [:yelp]

desc "Clean DB data"
task :clean do
  sh "sudo -u postgres dropdb buyyourvalues"
  sh "sudo -u postgres createdb buyyourvalues"
end

desc "Back up data to a sql file"
task :backup_db do
  sh "pg_dump -Ubuyyourvalues > data/data.sql"
end

desc "Restore DB from dump"
task :restore_db => [:clean] do
  sh "psql -Ubuyyourvalues < data/data.sql"
end

desc "DB console"
task :console do
  sh 'psql -Ubuyyourvalues'
end

desc "Clean DB"
task :db_empty => [:clean, :migrate]

task :default => :migrate
