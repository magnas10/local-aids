#!/bin/bash

# Kill any process using port 5001
PORT=5001
echo "Checking for processes on port $PORT..."
PID=$(lsof -ti:$PORT)

if [ ! -z "$PID" ]; then
  echo "Killing process $PID on port $PORT"
  kill -9 $PID
  sleep 1
fi

echo "Starting server on port $PORT..."
nodemon server.js
