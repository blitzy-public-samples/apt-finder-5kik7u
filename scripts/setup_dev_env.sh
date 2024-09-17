#!/bin/bash

# Set up development environment for the project

# Install required system dependencies
echo "Installing system dependencies..."
sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-venv nodejs npm postgresql

# Set up Python virtual environment
echo "Setting up Python virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js and npm (if not already installed)
if ! command -v node &> /dev/null
then
    echo "Installing Node.js and npm..."
    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Set up local database
echo "Setting up local database..."
sudo -u postgres psql -c "CREATE DATABASE myproject;"
sudo -u postgres psql -c "CREATE USER myuser WITH PASSWORD 'mypassword';"
sudo -u postgres psql -c "ALTER ROLE myuser SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE myuser SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE myuser SET timezone TO 'UTC';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE myproject TO myuser;"

# Configure environment variables
echo "Configuring environment variables..."
cp .env.example .env
# HUMAN ASSISTANCE NEEDED
# TODO: Update the .env file with appropriate values for your local setup

echo "Development environment setup complete!"