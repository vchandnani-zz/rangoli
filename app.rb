require 'sinatra'
require 'sinatra/activerecord'
require './models/elephant'

get '/' do
  "Hello World!"
end

post '/elephant' do
  content_type :json
  params = JSON.parse(request.body.read)
  results = {}
  e = Elephant.create( :name => params["name"],
                       :rider => params["rider"],
                       :passengers => params["passengers"] )
  if e.id.nil?
    halt 400, { error: e.errors }.to_json
  end
  return results.to_json
end

get '/elephants' do
  content_type :json
	results = {}
	e = Elephant.all
	if e
		results = e
	else
		halt 403, {error: {elephants: ["not found."]}}.to_json
	end
	return results.to_json
end
