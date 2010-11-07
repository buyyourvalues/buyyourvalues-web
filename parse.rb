#!/usr/bin/env ruby
require 'rubygems'
require 'fastercsv'
require 'model'

FasterCSV.foreach("catcodes.csv", :headers => true) do |row|
  BusinessCategory.create(
    :id => row['code'],
    :source => row['source'],
    :name => row['name'],
    :industry => row['industry'],
    :order => row['order']
  )
end

FasterCSV.foreach("contributions.csv", :headers => true) do |row|
  business = Business.first_or_create(
    :name => row["organization_name"] || row["contributor_employer"],
    :business_category_id => row["contributor_category"] || ''
  )

  contributor = Contributor.first_or_create(
    :name => row["contributor_name"],
    :type => row["contributor_type"],
    :address => row["contributor_address"],
    :city => row["contributor_city"],
    :state => row["contributor_state"],
    :zipcode => row["contributor_zipcode"],
    :occupation => row["contributor_occupation"] || '',
    :business => business
  )

  recipient = Recipient.first_or_create(
    :name => row["recipient_name"] || row["committee_name"],
    :party => row["recipient_party"] || row["committee_party"],
    :state => row["recipient_state"],
    :election_type => row["election_type"],
    :seat => row["seat"],
    :district => row["district"] || ''
  )

  contribution = Contribution.create(
    :amount => row["amount"],
    :date => row["date"],
    :contributor => contributor,
    :recipient => recipient
  )
end

Recipient.all(:party => nil).destroy
