provider "google" {
  credentials = file("terraform-sa-key.json")
  project = "mussia4-299720"
  region = "europe-west1"
  zone = "europe-west3-b"
}


resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}

resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
    }
  }
}


resource "google_storage_bucket" "demo-bucket" {
  name = "terra-fomrmation-bucket"
//  location = "EU"
  location = "europe-west1"
}

resource "google_cloud_run_service" "default" {
  name = "languages"
  location = "europe-west1"

  template {
    spec {
      containers {
        image = "gcr.io/mussia4-299720/languages"
        env {
          name = "DB_URL"
          value = "@cluster0.zurzw.mongodb.net/"
        }
        env {
          name = "DB_PASSWORD"
          value = "AXnEdzgKsyg8XVaN"
        }
        env {
          name = "DB_USER"
          value = "admin"
        }
      }
    }
  }
  traffic {
    percent = 100
    latest_revision = true
  }
}

//resource "google_storage_bucket" "bucket" {
//  name = "functions-gcp-coder"
//}
//
//resource "google_storage_bucket_object" "archive" {
//  name = "index.zip"
//  bucket = google_storage_bucket.bucket.name
//  source = "function.zip"
//}
//
//resource "google_cloudfunctions_function" "function" {
//  name = "function-test"
//  description = "first function vi aterraform"
//  runtime = "node12"
//  available_memory_mb = 128
////  source_archive_bucket = google_storage_bucket.bucket.name
////  source_archive_object = google_storage_bucket_object.archive.name
//  trigger_http = true
//  timeout = 60
//  entry_point = "helloWorld"
//  labels = {
//    my-label = "my-env-var-value"
//  }
////   = google_storage_bucket.bucket.name
//}
//resource "google_compute_instance" "appser" {
//  project = "mussia4"
//  name = "ariss"
//  machine_type = "f1-micro"
//  boot_disk {
//    initialize_params {
//      image = "debian-cloud/debian-9"
//    }
//  }
//  network_interface {
//    network = "vpc_network"
//  }
//}

