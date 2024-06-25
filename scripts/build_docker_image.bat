@echo off

set version="1.0.0"
set image_name="padp721-web-backoffice"

yarn build &&^
docker build --no-cache -t padp721/%image_name%:%version% . &&^
docker save -o .\docker\%image_name%-%version%.tar padp721/%image_name%:%version%
