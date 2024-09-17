# Main Terraform configuration file for GCP resources

# Provider configuration for Google Cloud
provider "google" {
  project = var.project_id
  region  = var.region
}

# GKE cluster
resource "google_container_cluster" "primary" {
  name     = "${var.project_id}-gke"
  location = var.region
  
  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "${google_container_cluster.primary.name}-node-pool"
  location   = var.region
  cluster    = google_container_cluster.primary.name
  node_count = var.gke_num_nodes

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    labels = {
      env = var.project_id
    }

    machine_type = "n1-standard-1"
    tags         = ["gke-node", "${var.project_id}-gke"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}

# Cloud SQL instance
resource "google_sql_database_instance" "main" {
  name             = "${var.project_id}-db-instance"
  database_version = "POSTGRES_13"
  region           = var.region

  settings {
    tier = "db-f1-micro"
  }

  deletion_protection = false
}

# Cloud Storage buckets
resource "google_storage_bucket" "static_assets" {
  name          = "${var.project_id}-static-assets"
  location      = var.region
  force_destroy = true

  uniform_bucket_level_access = true
}

resource "google_storage_bucket" "data_lake" {
  name          = "${var.project_id}-data-lake"
  location      = var.region
  force_destroy = true

  uniform_bucket_level_access = true
}

# Pub/Sub topics and subscriptions
resource "google_pubsub_topic" "main" {
  name = "${var.project_id}-main-topic"
}

resource "google_pubsub_subscription" "main" {
  name  = "${var.project_id}-main-subscription"
  topic = google_pubsub_topic.main.name

  ack_deadline_seconds = 20
}

# VPC
resource "google_compute_network" "vpc" {
  name                    = "${var.project_id}-vpc"
  auto_create_subnetworks = "false"
}

# Subnet
resource "google_compute_subnetwork" "subnet" {
  name          = "${var.project_id}-subnet"
  region        = var.region
  network       = google_compute_network.vpc.name
  ip_cidr_range = "10.10.0.0/24"
}

# Service Account
resource "google_service_account" "default" {
  account_id   = "${var.project_id}-sa"
  display_name = "Service Account"
}

# IAM binding
resource "google_project_iam_binding" "service_account" {
  project = var.project_id
  role    = "roles/editor"

  members = [
    "serviceAccount:${google_service_account.default.email}",
  ]
}

# HUMAN ASSISTANCE NEEDED
# The following areas may need further customization based on specific project requirements:
# - GKE cluster configuration (node sizes, autoscaling, etc.)
# - Cloud SQL instance configuration (size, high availability, backups, etc.)
# - Storage bucket configurations (lifecycle rules, versioning, etc.)
# - Pub/Sub configurations (message retention, dead-letter topics, etc.)
# - Network configurations (firewall rules, private Google access, etc.)
# - IAM roles and permissions (principle of least privilege)