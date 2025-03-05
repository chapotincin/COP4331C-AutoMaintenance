#!/bin/bash
cd /root/car-project   # Ensure this is the correct path to your project
git reset --hard origin/main  # Ensure your working directory matches the remote
git pull origin main  # Pull the latest changes
npm install  # (Optional) Install dependencies if needed
systemctl restart your-app-service  # (Optional) Restart your app if using systemd
