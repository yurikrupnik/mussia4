PROJECT_ID=mussia4

run-local:
	docker-compose up


create-tf-backed-bucket:
	gsutil mb -p $(PROJECT_ID) -l europe-west1 gs://$(PROJECT_ID)-terraform



push:
	docker tag $(LOCAL_TAG) $(REMOTE_TAG)
	docker push $(REMOTE_TAG)
