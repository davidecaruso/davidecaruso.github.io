---
title: Method overloading in PHP
tags:
- oop
- php
---

## Definition
One of the most appreciable things of the OOP is the *overloading*, a technique which provides the possibility to declare multiple methods - or properties as well - with different functionalities but with the same name. The cool thing is that the implementation which is called is choosen by the type and the number of the arguments passed to the method.

As the the other programming languages, also PHP provides this functionality but is a bit different from the others: you can dynamically create methods and properties without declare them explicitily, but you cannot declare of them with the same name.

It could be helpful if you need similar functionalities, maybe with the same logic inside, and you don't want to
 declare them one by one. A great way to implement that is to isolate the main logic of your function and to overload methods which will call it.

## Dropped into reality
Supposing you have a class and don't want to retrieve its properties by itself directly but instead using another class probably you will declare a *get* method for each property of the main class.
The following is the alternative solution I'm proposing for:
 
```php
<?php
class UnknownBookPropertyException extends Exception {}

class Book {
    private $id;
    public $title;
    public $author;

    public function __construct(int $id, string $title, string $author)
    {
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
                throw new UnknownBookPropertyException("The property '{$property}' does not exist.");
            }
        }
    }
}

$book = new Book(1, 'Foo', 'John Doe');
$librarian = new Librarian($book);

echo $librarian->getBookTitle(); // prints 'Foo'
echo $librarian->getBookPublishDate(); // throws an exception
```

The *method overloading* is provided by the **__call** magic method of the *Librarian* class: inside it a regular-expression-match allows to trigger methods of which name starts with **getBook** followed by the name of the needed property; before to return the book property we make sure that the given one is one of the availables, title and author, and next return it.

Both two solution work fine but ask to yourself what could happen if book properties change, increase or decrease: you will need to declare new methods, maybe delete some one else or more over change already existing ones each time your 
needs change, annoying stuff in short.
 
In this way you don't have to take care about of that because them are automatically declared.

PHP has many magic methods for overloading that you can see [here](http://php.net/manual/en/language.oop5.overloading.php), **__call** is only one of them.