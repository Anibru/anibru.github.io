---
title: "Zulip Follow User Feature"

category: "Software Engineering"

summary: "A full-stack feature implemented in the Zulip open-source communication platform spanning backend APIs, relational data, caching, real-time events, frontend state, and testing."

technologies:
  - Python
  - TypeScript
  - PostgreSQL
  - REST APIs
  - Event-Driven Architecture

featured: true

order: 4

heroImage: "../../assets/projects/zulip-follow-user-feature/zulip-follow-feed.png"

heroAlt: "Follow feed to demonstrate the functionality of the follow feature."

resources:
  - kind: document
    title: "Zulip Follow User Feature Handoff"
    description: "Technical handoff covering feature architecture, implementation details, integration, and testing."
    actions:
      - label: "View PDF"
        href: "/documents/zulip-follow-user-feature/zulip-follow-user-handoff.pdf"
      - label: "Download PDF"
        href: "/documents/zulip-follow-user-feature/zulip-follow-user-handoff.pdf"
        download: true

  - kind: video
    title: "Feature Demo"
    description: "Demonstration of the completed feature and its primary user workflow."
    actions:
      - label: "Watch demo"
        href: "https://www.youtube.com/watch?v=Hr7Z_SgvxBQ&feature=youtu.be"
---

## Context

I implemented a full-stack Follow User feature for Zulip, an open-source communication platform serving approximately 200,000 monthly users.

Unlike a standalone application, this project required working within an established production codebase and following existing architectural conventions for data models, APIs, caching, event propagation, frontend state, and testing.

The feature allows users to follow individual people and surface their messages separately from the channels and topics in which they were originally posted.

## Feature

Users can follow or unfollow another user directly from the right sidebar.

The follow relationship is then used throughout the application to provide:

- A dedicated Following Feed containing messages from followed users

- An `is:followed-user` search filter

- Real-time synchronization of follow state across active clients

- Backend support for push notifications from followed users

Follow relationships are private and are not exposed to the user being followed.

## Feature Architecture

The feature crosses several layers of Zulip's existing architecture.

A follow or unfollow operation moves through:

1. The frontend user interface

2. An authenticated REST API request

3. Backend business logic

4. Persistent relational state

5. Cache invalidation

6. Real-time event generation

7. Frontend state synchronization

Because the same relationship is represented at several points in the system, changes at one layer have to remain consistent with the state maintained elsewhere.

## Backend

I implemented the server-side functionality required to create, retrieve, and remove follow relationships.

A `FollowedUser` relational model stores the user performing the follow, the user being followed, and the time at which the relationship was created.

The feature exposes three authenticated REST operations:

```text

GET /api/v1/users/me/followed_users

POST /api/v1/users/me/followed_users/{user_id}

DELETE /api/v1/users/me/followed_users/{user_id}

```

The backend handles invalid operations including attempts to follow yourself, follow an already-followed user, or unfollow a user without an existing relationship.

The API layer delegates follow and unfollow behavior to the application's actions layer, which performs the database mutation, cache invalidation, and event propagation required by the operation.

## Caching

Follow relationships are integrated into Zulip's existing caching infrastructure.

The backend maintains cached follower sets to avoid repeated database queries in code paths that need to determine which users follow a particular sender.

The cache is populated lazily when the relationship data is requested. Follow and unfollow operations invalidate the relevant cache entry after modifying persistent state.

The next lookup then reconstructs the cached value from the database.

This required the database and caching layers to remain synchronized so that a follow operation could not leave stale relationship data available to later message or notification processing.

## Real-Time Events

Updating the database is insufficient when the same account may be active in multiple browser sessions.

After a follow or unfollow operation, the actions layer emits a `followed_users` event containing the updated followed-user list.

Zulip's Tornado-based real-time event system distributes this event to the user's active clients.

The frontend receives the event and replaces its local followed-user state with the authoritative state sent by the server.

This allows a follow performed in one browser session to appear in another active session without requiring a page reload.

## Frontend State

The client stores followed-user state in a dedicated TypeScript module using a `Set<number>` of user IDs.

The module provides operations to:

- Initialize followed users from server-provided data

- Replace the complete followed-user set after a real-time event

- Add a followed user

- Remove a followed user

- Determine whether a particular user is currently followed

This state is consumed by both the user interface and the message-filtering system.

## Following Feed and Search

I integrated the feature into Zulip's existing narrow filtering system through a new `is:followed-user` operator.

The filter determines whether each message sender is contained in the current frontend followed-user set.

Because it uses the existing narrow system, it can be combined with other search operators. For example:

```text

is:followed-user channel:general

is:followed-user is:unread

```

The same filter powers the dedicated Following Feed in the left sidebar.

Using Zulip's existing filtering architecture allows messages in the feed to retain normal application behavior, including replying, reacting, unread-state tracking, and navigation back to their original conversations.

## Push Notifications

The backend also integrates followed-user relationships into Zulip's existing push-notification pipeline.

When a message is sent, the system determines which users:

- Follow the sender

- Have followed-user push notifications enabled

- Have permission to view the message

The resulting user IDs are passed into the existing push-notification infrastructure.

This required the feature to respect both the new follow relationship and Zulip's existing visibility and permission rules.

At the time of the handoff, the backend notification pipeline was complete, while the corresponding user-facing settings toggle remained future work.

## Testing

I refined test coverage across:

- API behavior

- Database state

- Cache population and invalidation

- Real-time event propagation

- Frontend state management

- Search filtering

- Regression cases

- Mutation testing

- Edge cases

Backend tests covered valid and invalid follow operations, bots and deactivated users, database updates, cache invalidation, event emission, and idempotent action-layer behavior.

Frontend tests covered initialization, adding and removing followed users, bulk state replacement, membership checks, and the behavior of the `is:followed-user` filter.

The feature crosses several subsystem boundaries, so testing required verifying state transitions between the API, database, cache, event system, and frontend rather than treating each component independently.