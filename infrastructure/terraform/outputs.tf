output "gke_cluster_endpoint" {
  description = "GKE cluster endpoint"
  value       = google_container_cluster.primary.endpoint
}

output "gke_cluster_ca_certificate" {
  description = "GKE cluster CA certificate"
  value       = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
  sensitive   = true
}

output "gke_cluster_name" {
  description = "GKE cluster name"
  value       = google_container_cluster.primary.name
}

output "cloud_sql_instance_connection_name" {
  description = "Cloud SQL instance connection name"
  value       = google_sql_database_instance.main.connection_name
}

output "cloud_sql_instance_ip_address" {
  description = "Cloud SQL instance IP address"
  value       = google_sql_database_instance.main.ip_address.0.ip_address
}

output "cloud_sql_database_name" {
  description = "Cloud SQL database name"
  value       = google_sql_database.main.name
}

output "storage_bucket_names" {
  description = "Storage bucket names"
  value       = [for bucket in google_storage_bucket.buckets : bucket.name]
}

output "storage_bucket_urls" {
  description = "Storage bucket URLs"
  value       = [for bucket in google_storage_bucket.buckets : bucket.url]
}

output "pubsub_topic_id" {
  description = "Pub/Sub topic ID"
  value       = google_pubsub_topic.main.id
}

output "pubsub_subscription_id" {
  description = "Pub/Sub subscription ID"
  value       = google_pubsub_subscription.main.id
}

output "vpc_network_name" {
  description = "VPC network name"
  value       = google_compute_network.main.name
}

output "vpc_network_id" {
  description = "VPC network ID"
  value       = google_compute_network.main.id
}

output "vpc_subnet_names" {
  description = "VPC subnet names"
  value       = [for subnet in google_compute_subnetwork.subnets : subnet.name]
}

output "vpc_subnet_ids" {
  description = "VPC subnet IDs"
  value       = [for subnet in google_compute_subnetwork.subnets : subnet.id]
}

# HUMAN ASSISTANCE NEEDED
# Please review the following outputs and ensure they match the actual resource names used in your Terraform configuration:
# - google_container_cluster.primary
# - google_sql_database_instance.main
# - google_sql_database.main
# - google_storage_bucket.buckets
# - google_pubsub_topic.main
# - google_pubsub_subscription.main
# - google_compute_network.main
# - google_compute_subnetwork.subnets
# Adjust the resource names if necessary to match your specific configuration.