#!/bin/bash

cd ~/ExamWebApp/frontend/ && npm install
cd ~/ExamWebApp/backend/ && npm install

cd ~/ExamWebApp && sudo systemctl restart pm2-ubuntu.service
