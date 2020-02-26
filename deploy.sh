#!/bin/sh
DATE=`date +%Y-%m-%d`

sass --load-path="./themes/BrianDGLS/sass" ./themes/BrianDGLS/sass/main.scss ./themes/BrianDGLS/layouts/partials/main.css

hugo
node ./minify-html
cd public
git add .
git commit -m "Deployed  - ${DATE}"
git push origin master
cd ..
