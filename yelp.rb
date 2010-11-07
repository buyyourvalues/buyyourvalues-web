#!/usr/bin/env ruby

require "curb"
require "yaml"
require "cgi"
require "crack"
require 'model'

class Yelp

  attr_accessor :businesses

  def initialize(name)
    @name = name
    @yelp_key = ""
    File.open("config.yaml"){|yf| @yelp_key=YAML::load(yf)["yelp_key"]}
    self.build_url
    self.request_url
  end

  def build_url
    @url = "http://api.yelp.com/business_review_search?limit=1&term=#{CGI::escape(@name)}&location=#{CGI::escape("Manhattan New York")}&ywsid=#{@yelp_key}"
  end

  def request_url
    c = Curl::Easy.new(@url)
    c.perform
    @businesses = Crack::JSON.parse(c.body_str)["businesses"]
    puts @businesses
  end
end

Business.all(:id => (1..10)).each do |b|
  y = Yelp.new(b.name)
  if not y.businesses.empty?
    puts "Adding lat/long to #{b.name}"
    b.latitude = y.businesses[0]['latitude']
    b.longitude = y.businesses[0]['longitude']
    b.save
  end
end
