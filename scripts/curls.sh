#!/bin/sh

# IMPORTANT:
# TEST 1 creates 2 elephants with IDs 92 and 93 respectively.
# TEST 6 updates the elephant with ID = 92.
# TEST 9 deletes the elephant with ID = 93.
# If the contents of the development database: db/rangoli_dev.sqlite3
# change, the update and delete tests need to be changed accordingly.

clear;

echo "TEST 1: create elephants with valid name, rider and passengers"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST -d '{ "name":"rangoli", "rider":"vinny", "passengers":"bobby" }' http://localhost:4567/elephants
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST -d '{ "name":"rangoli2", "rider":"vinny2", "passengers":"bobby2" }' http://localhost:4567/elephants
echo

echo "TEST 2: create elephant with same name, rider and passengers"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X POST -d '{ "name":"rangoli", "rider":"vinny", "passengers":"bobby" }' http://localhost:4567/elephants
echo

echo "TEST 3: read all elephants"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X GET http://localhost:4567/elephants
echo

echo "TEST 4: read elephant by valid ID"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X GET http://localhost:4567/elephants/92
echo

echo "TEST 5: read elephant by invalid ID"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X GET http://localhost:4567/elephants/bad_id
echo

echo "TEST 6: update elephant by valid ID"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d '{ "name":"rangoli", "rider":"vinny2", "passengers":"bobby2" }' http://localhost:4567/elephants/92
echo

echo "TEST 7: read all elephants"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X GET http://localhost:4567/elephants
echo

echo "TEST 8: update elephant by invalid ID"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X PUT -d '{ "name":"no_rangoli", "rider":"vinny2", "passengers":"bobby2" }' http://localhost:4567/elephants/bad_id
echo

echo "TEST 9: delete elephant by valid ID"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X DELETE http://localhost:4567/elephants/93
echo

echo "TEST 10: read all elephants"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X GET http://localhost:4567/elephants
echo

echo "TEST 11: delete elephant by invalid ID"
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -X DELETE http://localhost:4567/elephants/bad_id
echo
