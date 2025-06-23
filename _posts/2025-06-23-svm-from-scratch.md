---
layout: post
title: "Support Vector Machines – An Intuitive Introduction"
date: 2025-06-23
categories: ml
---

Support Vector Machines (SVMs) are powerful supervised learning models used for classification and regression tasks.

They work by finding the optimal hyperplane that best separates data points of different classes. The core idea is to maximize the **margin** — the distance between the hyperplane and the nearest data points (called support vectors)..

## 🧠 Key Concepts

- **Hyperplane:** A decision boundary that separates classes.
- **Support Vectors:** Data points that lie closest to the hyperplane.
- **Margin:** Distance between hyperplane and support vectors.

### 🧮 Mathematically

The decision function is:

```math
$$h(x) = \text{sign}(w \cdot x + b)$$
