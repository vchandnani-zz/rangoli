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

end
