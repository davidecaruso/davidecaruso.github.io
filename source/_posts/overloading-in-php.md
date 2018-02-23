---
title: Overloading in PHP
tags:
  - oop
  - php
date: 2018-02-20 13:10:42
---


## Definition
One of the most appreciable things of the <abbr title="Object Oriented Programming">OOP</abbr> is the *overloading*, a technique which provides the possibility to declare many methods - or properties as well - with different functionalities but with the same name. The only things in which they differ are the type and/or the number of the arguments passed to, and is thanks to them that you can choose which implementation to call.

As the other programming languages, also PHP provides this functionality but is a bit different: you can dynamically create methods and properties without declare them explicitily, but you cannot declare of them with the same name, almost the opposite of the traditional.

## How it helps
It could be very helpful if you need similar functionalities, maybe with the same logic inside, and you don't want to declare them one by one. A great way to implement that is to isolate the main logic of your function and to overload methods which will call it.

## Dropped into reality
Supposing you have a class and don't want to retrieve its properties by itself directly but instead using another class(\*): probably what you are going to do is to declare a *get* method for each property of the main class.
Yes, it works but look at the solution below:

> \* mantain separate logics is a good attitude to write clean code and make it maintainable; read about **[SoC](https://en.wikipedia.org/wiki/Separation_of_concerns)**
 
```php
<?php
class UnknownBookPropertyException extends Exception {}

class Book {
    private $id;
    public $title;
    public $author;

    public function __construct(
        int $id, 
        string $title, 
        string $author
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
    }
}

class Librarian {
    private $book;
    private $bookProperties = [];

    public function __construct(Book $book)
    {
        $this->book = $book;
        $this->bookProperties = array_keys(get_object_vars($book));
    }

    public function __call(string $name, array $arguments)
    {
        // Trigger the getBook[Property] methods
        if (preg_match('/^getBook([A-Za-z]+)/', $name, $matches)) {
            $property = strtolower($matches[1]);
            if (in_array($property, $this->bookProperties)) {
                return $this->book->$property;
            } else {
                throw new UnknownBookPropertyException(
                    "The property '{$property}' does not exist."
                );
            }
        }
    }
}

$book = new Book(1, 'Foo', 'John Doe');
$librarian = new Librarian($book);

echo $librarian->getBookTitle(); // prints 'Foo'
echo $librarian->getBookPublishDate(); // throws an exception
```

The *method overloading* is provided by the **__call** magic method of the *Librarian* class: inside it a regular-expression-match allows to trigger methods of which name starts with **getBook** followed by the name of the property you are asking for; before to return the book property we make sure that the given is one of the availables - only public properties in this case, title and author - and then return it.

Both two solution work fine but ask to yourself what could happen if book properties change, increase or decrease: you will need to declare new methods, maybe you have to delete some one else or moreover change already existing ones each time your needs change, annoying stuff in short.
 
In this way you don't have to take care about of that because them are automatically declared.

## Other techniques
PHP has many magic methods for overloading that you can see 
[here][overloading], many of them deal with properties, others with methods and **__call** is one of them.
 
 The following is the list of the available methods:

| Method             | Type                 | Description                                                            |
|--------------------|----------------------|------------------------------------------------------------------------|
| **[__set]**        | Property overloading | is run when writing data to inaccessible properties.                   |
| **[__get]**        | Property overloading | is utilized for reading data from inaccessible properties.             |
| **[__isset]**      | Property overloading | is triggered by calling isset() or empty() on inaccessible properties. |
| **[__unset]**      | Property overloading | is invoked when unset() is used on inaccessible properties.            |
| **[__call]**       | Method overloading   | is triggered when invoking inaccessible methods in an object context.  |
| **[__callstatic]** | Method overloading   | is triggered when invoking inaccessible methods in a static context.   |
<sup style="text-align: right;">PHP Manual. *Overloading*. Retrieved from [php.net][overloading]</sup>

[overloading]: http://php.net/manual/en/language.oop5.overloading.php
[__set]: http://php.net/manual/en/language.oop5.overloading.php#object.set
[__get]: http://php.net/manual/en/language.oop5.overloading.php#object.get
[__isset]: http://php.net/manual/en/language.oop5.overloading.php#object.isset
[__unset]: http://php.net/manual/en/language.oop5.overloading.php#object.unset
[__call]: http://php.net/manual/en/language.oop5.overloading.php#object.call
[__callstatic]: http://php.net/manual/en/language.oop5.overloading.php#object.callstatic

<br><br>Bye.