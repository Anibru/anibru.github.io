---
title: "State Transition Matrix Integrator"

category: "Aerospace Software"

summary: "An open-source Python library for propagating dynamical systems together with first- and higher-order state sensitivities. Built entirely by hand, without the use of any generative AI."

technologies:
  - Python
  - SciPy
  - SymPy
  - NumPy
  - Numerical Integration
  - Orbital Mechanics

featured: true

order: 1

heroImage: "../../assets/projects/state-transition-matrix-integrator/stmint-orbit-examples.png"

heroAlt: "Example NRHO as integrated by STMint. Celestial bodies are not plotted to scale."

resources:
  - kind: repository
    title: "State Transition Matrix Integrator"
    description: "Open-source Python implementation of symbolic-to-numerical state and sensitivity propagation."
    actions:
      - label: "View on GitHub"
        href: "https://github.com/SIOSlab/STMInt"

  - kind: publication
    title: "Applications of Induced Tensor Norms to Guidance Navigation and Control"
    description: "Peer-reviewed Journal of Guidance, Control, and Dynamics paper supported by this software and related trajectory-sensitivity research."
    actions:
      - label: "Read publication"
        href: "https://arc.aiaa.org/doi/10.2514/1.G009054"
---

## Context

I developed the State Transition Matrix Integrator, or STMint, while conducting undergraduate research in the Space Imaging and Optical Systems Laboratory at Cornell University.

My research focused on nonlinear dynamics, orbital mechanics, flow maps, and higher-order sensitivity analysis. STMint was developed to make the numerical tools required for this work reusable across different dynamical systems and trajectory-analysis problems.

## Problem

Numerically integrating a dynamical system produces a nominal trajectory, but many aerospace applications also require information about how that trajectory changes when its initial conditions are perturbed.

A state transition matrix describes the first-order relationship between a perturbation in the initial state and the resulting perturbation later in the trajectory. Higher-order state transition tensors extend this relationship to capture nonlinear effects that become important as perturbations grow.

Computing these quantities requires constructing and integrating the variational equations associated with the original equations of motion.

I wanted a framework where the user could specify the dynamics symbolically and obtain both the trajectory and its associated state sensitivities without deriving and implementing each variational system manually.

## Architecture

STMint accepts a symbolic system of ordinary differential equations defined using SymPy.

From this representation, the library symbolically constructs the derivatives required by the variational equations and converts the resulting expressions into numerical functions. These functions are then integrated alongside the original state using SciPy.

This creates a symbolic-to-numerical pipeline:

1. Define the state variables and equations of motion symbolically.
2. Construct the required derivatives of the dynamics.
3. Generate the corresponding variational equations.
4. Convert the symbolic system into numerical functions.
5. Integrate the state and sensitivity equations over the requested time interval.

The same interface can therefore be applied to different dynamical models without rewriting the sensitivity equations for each system.

## State and Sensitivity Propagation

The first-order solver propagates the state together with its state transition matrix.

For an initial perturbation $\delta x_0$, the state transition matrix $\Phi$ provides the linear approximation

$$
\delta x(t) \approx \Phi(t,t_0)\delta x_0.
$$

For nonlinear systems, this approximation becomes less accurate as the magnitude of the initial perturbation increases.

STMint also supports higher-order state transition tensors, which incorporate additional terms in the local expansion of the flow map. These tensors provide higher-order predictions of how perturbations evolve through nonlinear dynamics.

The library can return either the final state and sensitivities or their complete time histories, allowing the same integrator to support endpoint analysis and full trajectory visualization.

## Orbital Dynamics

I developed and tested STMint using several orbital-dynamics models, including two-body and restricted three-body systems.

These applications included:

- Two-body orbit propagation
- Restricted three-body dynamics
- Relative-motion propagation
- Impulsive trajectory changes
- Spacecraft rendezvous
- Near-rectilinear halo orbit trajectories
- First- and higher-order trajectory perturbation analysis

The orbital examples provided a practical test of the library across systems with substantially different nonlinear behavior.

## Spacecraft Rendezvous

One of the primary research applications of STMint was spacecraft rendezvous analysis in the restricted three-body problem.

I used state transition matrices and higher-order tensors to propagate relative motion around reference trajectories and evaluate how accurately different orders of the local flow-map approximation predicted the evolution of perturbed spacecraft states.

This allowed nonlinear trajectory behavior to be studied without numerically propagating every nearby initial condition independently.

## Research Application

STMint supported research on the use of induced tensor norms for guidance, navigation, and control.

The work examined variational equations, state transition tensors, and higher-order descriptions of trajectory perturbations under nonlinear dynamical models. I developed many of the numerical examples and application cases used in the research, including spacecraft rendezvous near a near-rectilinear halo orbit.

This work contributed to the peer-reviewed paper *Applications of Induced Tensor Norms to Guidance Navigation and Control* in the *Journal of Guidance, Control, and Dynamics*.

## Portfolio Additions

TODO:

- Add a software architecture diagram showing the symbolic-to-numerical pipeline.
- Show a symbolic equation-of-motion input and the corresponding STMint setup.
- Add a representative two-body or restricted three-body trajectory.
- Show the near-rectilinear halo orbit rendezvous application.
- Compare first- and higher-order perturbation predictions against numerical propagation.