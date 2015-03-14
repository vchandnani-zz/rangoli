require 'test_helper'

class AppTest < Minitest::Test

  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def setup
    Elephant.destroy_all
  end

  def test_default_route
    get '/'
    assert_equal "http://example.org/index.html", last_response.location
  end

  def test_create_elephants
    expected_results = {}
		e1 = { :name => "rangoli", :rider => "vinny", :passengers => "bobby" }
		post '/elephants', e1.to_json
		assert_equal 200, last_response.status
		results = JSON.parse(last_response.body)
		assert_equal expected_results, results
	end

  def test_create_elephants_with_duplicate_name
		e1 = { :name => "rangoli", :rider => "vinny", :passengers => "bobby" }
		post '/elephants', e1.to_json
		post '/elephants', e1.to_json
		assert_equal 400, last_response.status
		results = JSON.parse(last_response.body)
		assert_equal "is not unique.", results["error"]["name"][0]
	end

	def test_read_elephants
		e1 = { :name => "rangoli", :rider => "vinny", :passengers => "bobby" }
		post '/elephants', e1.to_json
		e2 = { :name => "rangoli2", :rider => "vinny2", :passengers => "bobby2" }
		post '/elephants', e2.to_json
		get '/elephants'
		assert_equal 200, last_response.status
		results = JSON.parse(last_response.body)
		assert_equal 2, results.size
		assert_equal "rangoli", results[0]["name"]
		assert_equal "vinny", results[0]["rider"]
		assert_equal "bobby", results[0]["passengers"]
		assert_equal "rangoli2", results[1]["name"]
		assert_equal "vinny2", results[1]["rider"]
		assert_equal "bobby2", results[1]["passengers"]
	end

  def test_read_elephants_by_valid_id
		e1 = { :name => "rangoli", :rider => "vinny", :passengers => "bobby" }
		post '/elephants', e1.to_json
    e = Elephant.find_by_name("rangoli")
    get "/elephants/#{e.id}"
		assert_equal 200, last_response.status
		results = JSON.parse(last_response.body)
		assert_equal "rangoli", results["name"]
		assert_equal "vinny", results["rider"]
		assert_equal "bobby", results["passengers"]
  end

  def test_read_elephants_by_invalid_id
    get "/elephants/bad_id"
		assert_equal 403, last_response.status
		results = JSON.parse(last_response.body)
		assert_equal "not found.", results["error"]["elephant"][0]
  end

	def test_update_elephants_by_valid_id
		expected_results = {}
		e1 = { :name => "rangoli", :rider => "vinny", :passengers => "bobby" }
		post '/elephants', e1.to_json
		e = Elephant.find_by_name("rangoli")
		e2 = { :name => "rangoli", :rider => "vinny2", :passengers => "bobby2" }
		put "/elephants/#{e.id}", e2.to_json
		assert_equal 200, last_response.status
		results = JSON.parse(last_response.body)
		get '/elephants'
		results = JSON.parse(last_response.body)
		assert_equal 1, results.size
		assert_equal "vinny2", results[0]["rider"]
		assert_equal "bobby2", results[0]["passengers"]
	end

	def test_update_elephants_by_invalid_id
		e1 = { :name => "rangoli", :rider => "vinny", :passengers => "bobby" }
		post '/elephants', e1.to_json
		e2 = { :name => "rangoli2", :rider => "vinny2", :passengers => "bobby2" }
		put '/elephants/bad_id', e2.to_json
		assert_equal 403, last_response.status
		results = JSON.parse(last_response.body)
		assert_equal "not found.", results["error"]["elephant"][0]
	end

	def test_delete_elephants_by_valid_id
		expected_results = {}
		e1 = { :name => "rangoli", :rider => "vinny", :passengers => "bobby" }
		post '/elephants', e1.to_json
		e = Elephant.find_by_name("rangoli")
		assert_equal 200, last_response.status
		delete "/elephants/#{e.id}"
		results = JSON.parse(last_response.body)
		assert_equal expected_results, results
		get 'elephants'
		results = JSON.parse(last_response.body)
		assert_equal 0, results.size
	end

	def test_delete_elephants_by_invalid_id
		delete '/elephants/bad_id'
		assert_equal 403, last_response.status
		results = JSON.parse(last_response.body)
		assert_equal "not found.", results["error"]["elephant"][0]
	end

end
