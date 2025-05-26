#!/bin/bash
host="db"
port="3306"
until nc -z $host $port; do
  echo "Waiting for $host:$port..."
  sleep 1
done
echo "$host:$port is available."
exec "$@"