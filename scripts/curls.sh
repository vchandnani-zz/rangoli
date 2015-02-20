#!/bin/sh

clear;

echo "TEST 1: create elephants with valid name, rider and passengers"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST -d '{ "name":"rangoli", "rider":"vinny", "passengers":"bobby" }' http://localhost:4567/elephant
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST -d '{ "name":"rangoli2", "rider":"vinny2", "passengers":"bobby2" }' http://localhost:4567/elephant
echo

echo "TEST 2: create elephant with same name, rider and passengers"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST -d '{ "name":"rangoli", "rider":"vinny", "passengers":"bobby" }' http://localhost:4567/elephant
echo

echo "TEST 3: read all elephants"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X GET http://localhost:4567/elephants
echo

echo "TEST 4: update elephant by name"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d '{ "name":"rangoli", "rider":"vinny2", "passengers":"bobby2" }' http://localhost:4567/elephant
echo

echo "TEST 5: read all elephants"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X GET http://localhost:4567/elephants
echo

echo "TEST 6: update elephant by invalid name"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d '{ "name":"no_rangoli", "rider":"vinny2", "passengers":"bobby2" }' http://localhost:4567/elephant
echo

echo "TEST 7: delete elephant by valid name"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X DELETE http://localhost:4567/elephant/rangoli
echo

echo "TEST 8: read all elephants"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X GET http://localhost:4567/elephants
echo

echo "TEST 9: delete elephant by invalid name"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X DELETE http://localhost:4567/elephant/no_rangoli
echo
