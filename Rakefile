desc "Read and import from CSV"
task :import do 
  require 'parse'
end

desc "Migrate Database"
task :migrate do
  require 'model'
end

desc "Clean DB data"
task :clean do
  FileUtils.rm 'data.db'
end

task :db_empty => [:clean, :migrate]

task :default => :migrate
