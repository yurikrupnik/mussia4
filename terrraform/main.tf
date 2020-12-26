terraform {
//  backend "gcs" {
//    credentials = "terraform-sa-key.json"
//    bucket = "mussia4-terraform"
//  }
//  backend "atlas" {
//    access_token = "as"
//  }
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "3.51.0"

    }
    //    mongodbatlas = {
    //      version = "0.7.0"
    //    }
  }
}

//terraform {
//  required_providers {
//    google = {
//      source = "hashicorp/google"
//
//    }
////    mongodbatlas = {
////      version = "0.7.0"
////    }
//  }
//}

//module "gcloud" {
//  source  = "terraform-google-modules/gcloud/google"
//  version = "2.0.2"
//}

//resource "goog" "" {}
//
//provider "google-beta" {}

