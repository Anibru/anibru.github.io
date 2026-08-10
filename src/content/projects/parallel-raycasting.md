---
title: "Parallel Raycasting"
category: "Systems Programming"
summary: "A multithreaded C raycasting system comparing alternative strategies for parallelizing illumination calculations."
technologies:
  - C
  - POSIX Threads
  - Parallel Computing
featured: true
order: 2
---

## Problem

Raycasting becomes computationally expensive as image dimensions, obstacle counts, and light counts increase.

## Approach

I implemented sequential and POSIX-threaded versions using both light-based and column-based work partitioning.

This allowed the computational work to be distributed according to two different decomposition strategies.

## Outcome

The project enabled direct correctness and performance comparisons among the sequential and parallel implementations.