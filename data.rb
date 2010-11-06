#!/usr/bin/ruby
require 'rubygems'
require 'sinatra'
require 'erb'

get '/' do
   erb :outer
end


