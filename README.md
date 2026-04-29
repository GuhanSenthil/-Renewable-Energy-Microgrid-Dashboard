# ⚡ Renewable Energy Microgrid Dashboard

> AI-Powered Smart Energy Monitoring & Control System for Microgrids 🌍

---

## 📌 Overview

The **Renewable Energy Microgrid Dashboard** is a modern and intelligent platform designed to monitor and manage localized energy systems. It provides real-time insights into solar generation, battery storage, and power consumption, enabling efficient and sustainable energy usage.

This system combines interactive data visualization, AI-driven decision-making, and manual control mechanisms to create a robust smart grid solution.

---

## 🚀 Features

### 📡 Real-Time Monitoring

The system continuously tracks key electrical parameters such as Grid Voltage (V), Solar Current (A), and Battery State of Charge (%). Data is refreshed every 2 seconds to simulate a real-time IoT environment.

### 🔋 Smart Power Distribution

The dashboard visually represents how energy is distributed across solar, battery, and grid sources. This helps operators understand power flow and optimize energy usage efficiently.

### 🧭 Zone-Based Load Control

Users can manage power across different zones, including critical and non-essential loads. The system supports relay toggling with manual override capabilities for precise control.

### 🤖 AI Decision Logging

The platform records automated system decisions such as switching power sources or optimizing loads. This module is designed for seamless integration with the Gemini API for intelligent automation.

### 📈 Data Visualization

Interactive charts built using Recharts display trends in energy consumption, solar generation, and battery performance, enabling data-driven insights.

### 🚨 System Health Status

The system provides real-time health indicators categorized as Optimal, Warning, or Critical, based on voltage levels and battery conditions.

---

## 🏗️ Tech Stack

| Layer      | Technology   |
| ---------- | ------------ |
| Frontend   | React 19     |
| Language   | TypeScript   |
| Styling    | Tailwind CSS |
| Charts     | Recharts     |
| Build Tool | Vite 6       |

## 🌐 IoT Integration

The Renewable Energy Microgrid Dashboard is designed to seamlessly integrate with real-world IoT devices for live energy monitoring and control.

### 📡 Data Acquisition

The system can collect real-time data from:

* Smart energy meters
* Solar inverters
* Battery Management Systems (BMS)
* Voltage and current sensors

These devices communicate using industry-standard protocols such as:

* MQTT (Message Queuing Telemetry Transport)
* WebSockets (for real-time streaming)
* Modbus (commonly used in industrial systems)

---

### 🔗 Communication Architecture

* IoT devices send telemetry data to a central broker/server
* The frontend dashboard subscribes to live data streams
* Updates are reflected instantly in the UI

---

### ⚙️ Current Implementation

* 🔄 Simulated IoT data (updates every 2 seconds)
* 🟡 Ready for real hardware integration

---


This IoT-ready architecture ensures that the dashboard can evolve from a simulation-based system into a fully functional smart microgrid solution.

