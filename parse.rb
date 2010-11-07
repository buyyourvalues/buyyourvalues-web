require 'rubygems'
require 'fastercsv'
require 'model.rb'

FasterCSV.foreach("contributors_test.csv",{:headers => true}) do |row|
  business = Business.first_or_create(:name => (row["organization_name"] || row["contributor_employer"]))
  contributor = business.contributors.first_or_create(:name => row["contributor_name"])
  contributor.type = row["contributor_type"]
  contributor.zipcode = row["contributor_zipcode"]
  contribution = contributor.contribution.new({:amount => row["amount"],:date => row["date"]})
  recipient = Recipient.first_or_create(:name => (row["recipient_name"] || row["committee_name"]))
  recipient.party = row["recipient_party"] || row["committee_party"]
  recipient.state = row["recipient_state"]
  contribution.recipient = recipient
  business.save
  contributor.save
  contributon.save
  recipient.save
end
