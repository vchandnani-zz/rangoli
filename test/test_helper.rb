ENV["RACK_ENV"] = "test"

require './app'
require 'minitest/autorun'
require 'rack/test'
require 'mocha/setup'
