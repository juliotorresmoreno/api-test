#/bin/sh

npm i
cd test-front
npm i
npm run build
cp -r test-front/build/* public/