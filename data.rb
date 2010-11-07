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
