---
title: Excel reports with PHP and Jasper
tags:
 - php
 - jaspert-reports
---

At least one time in the life of a developer was happened the need to create an Excel file with data, maybe coming from database, external services or something else. For this reason all PHP developers certainly know [PHPExcel](https://github.com/PHPOffice/PHPExcel), or its successor [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet), and each one of them doesn't wanna deal with it, but only if necessary.

Not properly true, it's a joke: PHPExcel is a great library which saved all of us many times while programming, but often we don't know which alternatives exist in addition to it.

## Jasper Studio
Jasper Studio is a cross-platform software written in Java which allows to create, view and manipulate reports in many formats, providing the possibility to connect them to different kinds of data sources (databases, JSON, webservices, csv, etc.).
It was born on 2001 and its the perfect software for who daily deals with reporting because allows to create reports from user-interface, edit styles, positions and properties of each elements of the report without write a line of code - in most cases. 

Probably you're asking in your mind «Well, but why you are saying about this software to me?» and I can answer to you that Jasper is the alternative solution.

## PHP & Jasper :heart:
On 2012 was created a project called [JasperStarter](http://jasperstarter.cenote.de/), a library which makes available to use command line to compile and generate Jasper reports. Awesome! Isn't it?

Well, but another step is missing.

On 2018 a good guy (:roll_eyes:) published a Packagist's package to integrate the JasperStarter library with PHP: **drum roll** and say welcome to [JasperPHP](https://github.com/davidecaruso/jasper-php).

## Let's do a report
Now is time to e need to put into practice all of this.

### Create a Jasper Report
First of all you need to install JasperStudio on your computer, [here](https://community.jaspersoft.com/project/jaspersoft-studio/releases) you can choose which version and for which OS to install.

Now you can open it and create a new report `File > New > Jasper Report` and choose a template, for this example will use the "Blank A4 Landascape" and, for a little while, choose "One Empty Record" as *Data Adapter*. 

**Congratulation!** your report was created. Well, go straight to the point.
Probably you are seeing something like that (if not maybe because I'm using the dark theme :sunglasses:):

![Jasper Studio #1](/images/2018-02-22-jasper-studio-1.png "Jasper Studio #1")

> Jasper works with *.jrxml* source files and *.jasper* compiled files, be prepared to put hands into source files.

### Set JSON as Jasper data source
As said, we could have many type of data source, but for this example we are going to use the following JSON as source:
```json
{
  "data": [
    {
      "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
      "authors": "Robert C. Martin",
      "publishYear": "2008"
    },
    {
      "title": "Design Patterns",
      "authors": "Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm",
      "publishYear": "1994"
    },
    {
      "title": "The Mythical Man-Month",
      "authors": "Fred Brooks",
      "publishYear": "1975"
    },
    {
      "title": "The Pragmatic Programmer",
      "authors": "Andy Hunt",
      "publishYear": "1999"
    }
  ]
}
```
So create a data source `File > New > Data Adapter`, choose "JSON File" and insert the path to your file.

On the "Outline" view, on the bottom-left corner, right-click on report name and go to "Dataset and Query Dialog". Here by the dropdown menu select the earlier created data source, recommending to select "JSON" as language and, if works, you will see the list of fields under *data*. You can interact with them right-clicking on them, so set *data* as record node and the others as field. The result has to be like this:

![Jasper Studio #2](/images/2018-02-22-jasper-studio-2.png "Jasper Studio #2")

In this way, on the "Outline" view again, you will see the fields. Simple drag-and-drop them into "Detail 1" band and will be created field instances and their relative labels.

Done, our reports is ready to be generated via PHP.

### Generate Jasper report using PHP
Into an existing or an empty project run `composer require davidecaruso/jasper-php`, then move all essential files into your project (*jrxml*, JSON file). Then, your script will be like this:

```php
<?php
require_once '/vendor/autoload.php';

use JasperPHP\JasperPHP;

// Create a new instance of JasperPHP
$jasper = new JasperPHP();

// Compile jrxml file into jasper
$jasper->compile('/path/to/report.jrxml')->execute();

// Generate the report
$jasper->process(
    '/path/to/report.jasper',
    null,
    ['xlsx'],
    [],
    [
        'driver' => 'json',
        'json_query' => 'data', // The data is under the JSON "data" layer
        'data_file' => '/path/to/data.json'
    ]
)->execute();
```

Yes, it worked, but the Excel file is orrible.

### Make a better Jasper Report
You can play with the properties of each elements on the report, infact the next step is to remove useless bands, modify the style of texts, add texts too and change report properties as we need.

To remove a band, right-click on it and select "Delete", so do it for all except for "Title", "Column Header" and "Detail 1".
Add a title drag-and-drop a "Text Field" from the "Palette" view to the "Title" band, set size as you want and write into it something you want.

> If you keep blank spaces in your bands them will be replicated also in the generated file, so reduce them to their content double-clicking on them.

To change text style select an element - or a group of elements - and let's see its properties on the "Properties" view on the bottom-right corner. The tab of this property has the same of the element type (e.g. *Static text*).

If you has generated the report yet you have been noticed that there was a pagination inside of it: happens because Jasper Reports use pagination as default, so disable it `Outline > Click on report name > Properties > Advanced > Pagination` and set "Ignore Pagination" to `true`.