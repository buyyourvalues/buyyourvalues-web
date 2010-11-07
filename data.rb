#!/usr/bin/env ruby

# Gems
require 'rubygems'
require 'sinatra'
require 'erb'
require 'transparency_data'

# Local files
require 'model'

get '/' do
  erb :outer
end

get '/data-load' do
  TransparencyData.api_key = 'cbb3e6d549ce43eb8f45c4b53b1a9081'
  TransparencyData::Client.contributions(:contributor_ft => params[:search]).to_json
end

get '/businesses' do
  data = []
  businesses = Business.all(:latitude.not => '', :longitude.not => '')
  businesses.each do |b|
    new_data = {
      :business_name => b.name,
      :latitude => b.latitude,
      :longitude => b.longitude,
      :contributions => []
    }

    b.contributors.each do |contrib|
      contrib.contributions.each do |c|
        r = c.recipient
        if r.party
          new_data[:contributions] << {:amount => c.amount, :party => r.party}
        end
      end
    end
 
    data << new_data
  end

  data.to_json
end
