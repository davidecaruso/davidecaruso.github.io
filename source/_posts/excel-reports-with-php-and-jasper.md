---
title: Excel reports with PHP and Jasper
tags:
  - php
  - excel-reports
  - jaspert-reports
date: 2018-02-23 11:55:20
---


At least one time in the life of a developer has been happened the need to create an Excel file with data, maybe coming from database, external services or something else. For this reason all PHP developers certainly know [PHPExcel](https://github.com/PHPOffice/PHPExcel), or its successor [PhpSpreadsheet](https://github.com/PHPOffice/PhpSpreadsheet), and each one of them doesn't wanna deal with it, unless necessary.

Not properly true: PHPExcel is a great library which saved all of us many times while programming, but often we don't know which alternatives exist or maybe the report we have to generate is too complex and also its development with PHPExcel.

## Jasper Studio
Jasper Studio is a cross-platform software written in Java which allows to create, view and manipulate reports in many formats, providing the possibility to connect them to different kinds of data sources (databases, JSON, webservices, csv, etc.).
It was born on 2001 and its the perfect software for who daily deals with reporting because allows the full management of reports directly from user-interface, including to edit styles, positions and properties of each elements without write a line of code – in most cases.

Probably you're asking in your mind «Well, but why you are talking about this software?» and the answer is that Jasper is the alternative solution.

## PHP & Jasper
On 2012 was created a project called [JasperStarter](http://jasperstarter.cenote.de/), a library which allows the use command line to compile and generate Jasper reports. Awesome! Isn't it?

Well, but another step is missing.

On 2018 a good guy (:roll_eyes:) has published a PHP package to integrate the JasperStarter library with PHP: **drum roll** and welcome to [JasperPHP](https://github.com/davidecaruso/jasper-php).

> Note: there are many library like this existing from more time, but I prefered to create my own.

## Let's do a report
Now is time to put into practice all of this.

### Create a Jasper Report
First of all you need to install JasperStudio on your computer, [here](https://community.jaspersoft.com/project/jaspersoft-studio/releases) you can choose which version and for which OS to install.

Open it and create a new report `File > New > Jasper Report` and choose a template – for this example I have used "Blank A4 Landascape" – and choose "One Empty Record" as *Data Adapter*.

**Congratulation!** your empty report was created. Well, go straight to the point.
Probably you are seeing something like that (if not maybe because I'm using the dark theme :sunglasses:):

![Jasper Studio #1](/images/2018-02-22-jasper-studio-1.png "Jasper Studio #1")

> Jasper works with *.jrxml* source files and *.jasper* compiled files, be prepared to put hands into source files.

### Set JSON as Jasper data source
As said, we could have many type of data source, but for this *minimalistic* example we are going to use the following as source:
```json
{
  "data": [
    {
      "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
      "authors": "Robert C. Martin",
      "year": "2008"
    },
    {
      "title": "Design Patterns",
      "authors": "Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm",
      "year": "1994"
    },
    {
      "title": "The Mythical Man-Month",
      "authors": "Fred Brooks",
      "year": "1975"
    },
    {
      "title": "The Pragmatic Programmer",
      "authors": "Andy Hunt",
      "year": "1999"
    }
  ]
}
```
So create a data source `File > New > Data Adapter`, choose "JSON File" and insert the path to your file.

On the "Outline" view, on the bottom-left corner, right-click on report name and go to "Dataset and Query Dialog". Here by the dropdown menu select the earlier created data source, recommending to select "JSON" as language and, if works, you will see the list of fields under *data*. You can interact with them right-clicking on them, so set *data* as record node and the others as field. The result has to be like this:

![Jasper Studio #2](/images/2018-02-22-jasper-studio-2.png "Jasper Studio #2")

In this way, on the "Outline" view again, you will see the fields. Simply drag-and-drop them into "Detail 1" band and will be created field instances and their relative labels.

Done, the report is ready to be generated via PHP.

### Generate Jasper report using PHP
Into an existing or an empty project, run `composer require davidecaruso/jasper-php`, then move all essential files into your project (*jrxml* and JSON file). Then, your script will be like this:

```php
<?php
require_once '/vendor/autoload.php';

// Create a new instance of JasperPHP
$jasper = new JasperPHP\JasperPHP();

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

### Tips to make a better Jasper Report
You can play with the properties of each elements and of the report itself:
- delete bands if unnecessary and also blank spaces in them because will be replicated also in the generated file;
- change and beautify styles (borders, text styles, alignment, etc.) using the appropriate "Properties" tab;
- remove pagination because is provided as default, so go to `Outline > Click on report name > Properties > Advanced > Pagination` and set "Ignore Pagination" to `true`;
- if you need to "freeze" rows or columns do `Click on report name > Properties > Advanced > Misc > Edit Properties > Add` and search for something like **net.sf.jasperreports.export.xls.freeze.row** (or **\*.column**) and add a number value for row and a letter for column;
> Example of jrxml output file to freeze until to "D" column and to second row":
```xml
	<property name="net.sf.jasperreports.export.xls.freeze.row" value="3"/>
	<property name="net.sf.jasperreports.export.xls.freeze.column" value="E"/>
```
- use Jasper functionalities to perform operations like sum, average, etc.;
- instead of use a JSON file you could pass to Jasper a json-encoded array, maybe with data coming from a database or use a direct connection to it;
- integrate subreports into a main report (or maybe wait for the next article).

## Example
The following link points to the report of the example, so [download it](http://s000.tinyupload.com/?file_id=94589912227645439654) and generate it.

<br><br>Bye.