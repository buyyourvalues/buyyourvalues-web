#!/usr/bin/env ruby

require 'rubygems'
require 'dm-core'
require 'dm-migrations'

DataMapper.setup :default, 'sqlite:///home/mickey/10001/data.db'

class Business
  include DataMapper::Resource
  has n, :contributors

  property :id, Serial
  property :name, String
  property :address, Text
end

class Contributor
  include DataMapper::Resource
  belongs_to :business

  property :id, Serial
  property :name, String
  property :type, String
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
  property :address, Text
  property :district, String
  property :party, String
end

DataMapper.finalize
DataMapper.auto_upgrade!
