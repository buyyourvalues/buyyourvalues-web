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

task :backup_db do
  sh "pg_dump -Ubuyyourvalues > data/data.sql"
end

task :restore_db => [:clean] do
  sh "psql -Ubuyyourvalues < data/data.sql"
end

desc "DB console"
task :console do
  sh 'psql -Ubuyyourvalues'
end

task :db_empty => [:clean, :migrate]

task :default => :migrate
