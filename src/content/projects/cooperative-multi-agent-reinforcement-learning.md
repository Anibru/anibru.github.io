---
title: "Cooperative Multi-Agent Reinforcement Learning"

category: "Machine Learning Research"

summary: "A controlled ablation study of cooperative multi-agent reinforcement learning on SMAC, comparing algorithm choice, policy memory, reward design, and stochastic training variation."

technologies:
  - Python
  - EPyMARL
  - SMAC
  - Google Cloud
  - Reinforcement Learning

featured: true

order: 3

heroImage: "../../assets/projects/cooperative-multi-agent-reinforcement-learning/learning_curves.png"

heroAlt: "Test win rate as a function of environment steps for all four ablation settings. Lines show the mean across three seeds, and shaded regions show one standard deviation."

resources:
  - kind: document
    title: "Cooperative Multi-Agent Reinforcement Learning Report"
    description: "Full experimental report covering QMIX and MAPPO, experimental design, training runs, and evaluation."
    actions:
      - label: "View PDF"
        href: "/documents/cooperative-multi-agent-reinforcement-learning/multi-agent-rl-report.pdf"
      - label: "Download PDF"
        href: "/documents/cooperative-multi-agent-reinforcement-learning/multi-agent-rl-report.pdf"
        download: true

  - kind: video
    title: "Research Presentation"
    description: "Presentation of the experimental design, training methodology, and results."
    actions:
      - label: "Watch presentation"
        href: "https://www.youtube.com/watch?v=Qpv2G1-Wyoc"
---

## Problem

Cooperative multi-agent reinforcement learning requires multiple agents to learn coordinated behavior while operating from incomplete local observations and sharing a common objective.

I investigated how several design choices affect learning on the StarCraft Multi-Agent Challenge (SMAC), where independently controlled agents must coordinate their actions to defeat a scripted opposing team.

The study focused on three factors: reinforcement-learning algorithm, access to temporal history, and reward structure.

## Experimental Design

I designed a controlled three-axis ablation study using the SMAC `3m` scenario, in which three allied Marines learn to defeat three enemy Marines.

I compared:

- **QMIX and MAPPO** to study the effect of reinforcement-learning algorithm.
- **GRU and feed-forward MLP policies** to test whether explicit temporal memory improves performance under partial observability.
- **Dense and sparse rewards** to measure the effect of intermediate learning signals on exploration and coordination.

The resulting experimental matrix contained four configurations:

- QMIX + GRU + dense reward
- MAPPO + GRU + dense reward
- QMIX + MLP + dense reward
- QMIX + GRU + sparse reward

Each configuration was trained using three independent random seeds for 525,000 environment steps per seed, producing approximately **6.3 million environment steps** of training in total.

Experiments were implemented with EPyMARL and executed on an NVIDIA L4 GPU using Google Cloud.

## Evaluation

I evaluated each configuration using periodic test episodes with exploration disabled, measuring both final task performance and learning behavior throughout training.

The primary metric was **test win rate**, evaluated every 10,000 environment steps using 32 test episodes.

Using three independent seeds for every configuration made it possible to distinguish consistent algorithmic behavior from stochastic variation between individual training runs.

I also examined per-seed learning curves and behavioral statistics such as episode duration and enemies defeated to investigate failure modes that were not visible from final win rate alone.

## Results

Reward structure produced the largest effect observed in the study.

The baseline **QMIX + GRU + dense reward** configuration reached a mean final win rate of **96.0%**, while the otherwise identical sparse-reward configuration remained at **0.0% across all three seeds**.

Removing recurrence had almost no measurable effect. The **QMIX + MLP + dense reward** configuration reached **96.9%**, compared with 96.0% for the recurrent baseline. On the relatively small `3m` scenario, the current observation contained enough information for near-optimal behavior without explicit temporal memory.

Algorithm choice had a much larger effect on training stability. **MAPPO** reached final win rates of **79.3%, 0.7%, and 52.7%** across its three seeds, giving a mean of **44.2%** with a standard deviation of **32.7 percentage points**. In comparison, QMIX reached 96.0% with a standard deviation of only 1.6 percentage points.

The MAPPO learning curves showed that all three seeds initially learned effective policies before undergoing substantial performance collapses later in training. Only one seed recovered to high performance.

## Failure Analysis

The sparse-reward experiments revealed a distinct learned failure mode.

Under the sparse reward function, agents received positive feedback only for winning and negative feedback for losing. Successful coordinated attacks were therefore extremely difficult to discover through early random exploration.

Although win rate remained at zero, average episode duration increased from roughly 26 to 59 steps over training. Replay analysis showed that the agents learned increasingly defensive behavior, moving toward the edges of the map and delaying defeat rather than developing effective focus-fire strategies.

Dense rewards changed the exploration process by providing intermediate feedback for dealing damage. This signal guided the agents toward combat behavior and eventually toward coordinated target selection.

## Key Findings

The experiments produced three main conclusions:

- **Reward design was the dominant factor in learning success.** Removing intermediate rewards reduced final performance from approximately 96% to 0%.
- **Explicit recurrent memory provided little benefit on the SMAC `3m` scenario.** GRU and feed-forward policies achieved nearly identical performance.
- **QMIX was substantially more stable than MAPPO under the fixed sample budget.** MAPPO was capable of strong performance, but its results varied dramatically across random seeds.
