require 'sinatra'
require 'sinatra/activerecord'
require './models/elephant'

get '/' do
  "Hello World!"
end
