---
title: 'Git: how to reset file permissions'
tags:
  - snippet
  - git
  - chmod
date: 2018-03-27 13:27:29
---

**Scenario**: In a project which uses Git, I have changed my files' permissions using the `chmod` command and I don't want to reset them manually.

**Question**: How can reset their permissions using Git?

**Answer**:
```bash
# go to project directory
cd /path/to/project
# optional: unstage all changes
git reset HEAD --
# reset permissions
git diff -p \
    | grep -E '^(diff|old mode|new mode)' \
    | sed -e 's/^old/NEW/;s/^new/old/;s/^NEW/new/' \
    | git apply
```

<br><br>Bye.