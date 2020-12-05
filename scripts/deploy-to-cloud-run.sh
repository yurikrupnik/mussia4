#! /bin/bash

set -e

name=$npm_package_config_docker_image_org_name/$npm_package_config_docker_image_name
gc_image=gcr.io/$npm_package_config_project/$npm_package_config_service

echo $name
echo $gc_image

docker build -t $gc_image . \
  --force-rm \
  --build-arg modulePath=$npm_package_config_modulePath \
  --build-arg distFolder=$npm_package_files_0

echo 'Finished building'
#docker tag $name \
#  $gc_image
#
docker push $gc_image
echo 'Finished pushing'

#docker images

gcloud run deploy $npm_package_config_service \
  --image $gc_image \
  --platform managed \
  --region europe-west1
