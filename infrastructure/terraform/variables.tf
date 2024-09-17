# Project ID variable
variable "project_id" {
  description = "The ID of the Google Cloud project"
  type        = string
}

# Region and zone variables
variable "region" {
  description = "The region to deploy resources"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "The zone to deploy resources"
  type        = string
  default     = "us-central1-a"
}

# GKE cluster configuration variables
variable "gke_cluster_name" {
  description = "Name of the GKE cluster"
  type        = string
  default     = "main-cluster"
}

variable "gke_num_nodes" {
  description = "Number of nodes in the GKE cluster"
  type        = number
  default     = 3
}

variable "gke_machine_type" {
  description = "Machine type for GKE nodes"
  type        = string
  default     = "n1-standard-2"
}

# Cloud SQL configuration variables
variable "db_instance_name" {
  description = "Name of the Cloud SQL instance"
  type        = string
  default     = "main-db-instance"
}

variable "db_version" {
  description = "Database version for Cloud SQL"
  type        = string
  default     = "POSTGRES_13"
}

variable "db_tier" {
  description = "Machine type for Cloud SQL instance"
  type        = string
  default     = "db-f1-micro"
}

# Storage bucket configuration variables
variable "bucket_name" {
  description = "Name of the Google Cloud Storage bucket"
  type        = string
}

variable "bucket_location" {
  description = "Location of the Google Cloud Storage bucket"
  type        = string
  default     = "US"
}

# Pub/Sub configuration variables
variable "topic_name" {
  description = "Name of the Pub/Sub topic"
  type        = string
  default     = "main-topic"
}

variable "subscription_name" {
  description = "Name of the Pub/Sub subscription"
  type        = string
  default     = "main-subscription"
}

# Network configuration variables
variable "network_name" {
  description = "Name of the VPC network"
  type        = string
  default     = "main-network"
}

variable "subnet_name" {
  description = "Name of the subnet"
  type        = string
  default     = "main-subnet"
}

variable "subnet_cidr" {
  description = "CIDR range for the subnet"
  type        = string
  default     = "10.0.0.0/24"
}