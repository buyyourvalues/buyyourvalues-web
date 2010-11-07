#!/usr/bin/env ruby

require "curb"
require "yaml"
require "cgi"
require "crack"

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
    @url = "http://api.yelp.com/business_review_search?term=#{CGI::escape(@name)}&location=#{CGI::escape("Manhattan New York")}&ywsid=#{@yelp_key}"
  end

  def request_url
    c = Curl::Easy.new(@url)
    c.perform
    @businesses = Crack::JSON.parse(c.body_str)["businesses"]
    puts @businesses
  end
end
