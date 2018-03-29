echo "=== Building CLIENT part"
npm run client-build

echo "=== Starting express SERVER"
node server/server.js