require 'test_helper'

class AppTest < Minitest::Test

  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_default_route
    get '/'
    assert_equal 'Hello World!', last_response.body
  end

  def test_create_elephant
		expected_results = {}
		e1 = { :name => "rangoli", :rider => "vinny", :passengers => "bobby" }
		post '/elephant', e1.to_json
		assert_equal 200, last_response.status
		results = JSON.parse(last_response.body)
		assert_equal expected_results, results
	end

end
