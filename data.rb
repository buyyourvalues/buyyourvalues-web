#!/usr/bin/ruby

require 'rubygems'
require 'sinatra'
require 'erb'
require 'model'

get '/' do
   erb :outer
end
