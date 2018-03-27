---
title: How to delete a remote branch
tags:
  - snippet
  - git
date: 2018-03-27 13:41:12
---


**Scenario**: I want to delete a useless remote branch of my Git repository.

**Question**: How can I delete it?

**Answer**:
```bash
git push REMOTE_NAME --delete BRANCH_NAME
# or shortly
git push REMOTE_NAME :BRANCH_NAME
```

<br><br>Bye.
