PROJECT_ID=mussia4-299720
APP_REGION=europe-west

define get-secret
$(shell gcloud secrets versions access latest --secret=$(1) --project=$(PROJECT_ID))
endef

# todo check which apis can be added this way
enable-compute-api:
	gcloud services enable compute.googleapis.com

enable-cloud-functions-api:
	gcloud services enable cloudfunctions.googleapis.com

enable-cloud-storage-api:
	gcloud services enable storage-api.googleapis.com

enable-cloud-build-api:
	gcloud services enable cloudbuild.googleapis.com

# todo check if works together scripts
enable-appengine-api:
	gcloud services enable appengine.googleapis.com \
	gcloud app create --region europe-west

enable-secretmanager-api:
	gcloud services enable secretmanager.googleapis.com

enable-gmail-api:
	gcloud services enable gmail.googleapis.com

run-local:
	docker-compose up


create-tf-backed-bucket:
	gsutil mb -p $(PROJECT_ID) -l europe-west1 gs://$(PROJECT_ID)-terraform



push:
	docker tag $(LOCAL_TAG) $(REMOTE_TAG)
	docker push $(REMOTE_TAG)



deploy-languages:
	gcloud run deploy languages \
      --image gcr.io/mussia4/languages \
      --platform managed \
      --region europe-west1 \
      --project $PROJECT_ID

deploy-cloud-run:
	echo pusssss
