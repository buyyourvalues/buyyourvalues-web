#!/usr/bin/ruby
require 'rubygems'
require 'fastercsv'
require 'model.rb'

FasterCSV.foreach("contributors_test.csv",{:headers => true}) do |row|
  business = Business.first_or_create(
    :name => row["organization_name"] || row["contributor_employer"]
  )

  contributor = business.contributors.first_or_create(
    :name => row["contributor_name"],
    :type => row["contributor_type"],
    :zipcode => row["contributor_zipcode"]
  )

  recipient = Recipient.first_or_create(
    :name => row["recipient_name"] || row["committee_name"],
    :party => row["recipient_party"] || row["committee_party"],
    :state => row["recipient_state"],
    :election_type => row["election_type"],
    :seat => row["seat"],
  )

  contribution = Contribution.create(
    :amount => row["amount"],
    :date => row["date"],
    :contributor => contributor,
    :recipient => recipient
  )
end
