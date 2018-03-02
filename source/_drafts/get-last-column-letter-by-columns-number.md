---
title: How to get last column letter of an Excel by the columns number
tags:
  - php
  - excel-reports
  - snippet
---

**Scenario**: I have raw data to write in an Excel report and I need to know which will be the last column.

**Question**: How can I get it?

**Answer (*PHP*)**:
```php
<?php
function getLastColumnLetter(int $columns): string
{
    $letter = '';
    while ($columns != 0) {
        $ratio = ($columns - 1) % 26;
        $columns = intval(($columns - $ratio) / 26);
        $letter = chr(65 + $ratio) . $letter; // Or 96 for lowercase letters
    }
    return $letter;
}

echo getLastColumnLetter(1); // A
echo getLastColumnLetter(26); // Z
echo getLastColumnLetter(52); // AZ
echo getLastColumnLetter(54); // BB
echo getLastColumnLetter(14943907276374871); // DAVIDECARUSO
```

<br><br>Bye.