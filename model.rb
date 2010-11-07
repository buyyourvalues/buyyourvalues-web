#!/usr/bin/env ruby

require 'rubygems'
require 'dm-core'
require 'dm-migrations'

DataMapper.setup :default, "postgres://buyyourvalues:buyyourvalues@localhost/buyyourvalues"

class Business
  include DataMapper::Resource
  belongs_to :business_category
  has n, :contributors

  property :id, Serial
  property :name, String, :length => 100
  property :latitude, String
  property :longitude, String
end

class Contributor
  include DataMapper::Resource
  has n, :contributions
  belongs_to :business

  property :id, Serial
  property :name, String, :length => 100
  property :type, String
  property :zipcode, String
  property :address, String, :length => 256
  property :city, String
  property :state, String
  property :occupation, String
end

class Contribution
  include DataMapper::Resource
  belongs_to :contributor
  belongs_to :recipient

  property :id, Serial
  property :amount, Float
  property :date, DateTime
end

class Recipient
  include DataMapper::Resource
  has n, :contributions

  property :id, Serial
  property :name, String, :length => 100
  property :state, String
  property :party, String
  property :election_type, String
  property :seat, String
  property :district, String
end

# They're all restaurants, but in case we ever deal with more
class BusinessCategory
  include DataMapper::Resource
  has n, :businesses

  property :id, String, :key => true
  property :source, String
  property :name, String, :length => 100
  property :industry, String
  property :order, String
end

DataMapper.finalize
DataMapper.auto_upgrade!
