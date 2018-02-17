---
title: OOP - Method Overloading
tags:
- oop
- php
---

Often happens, while programming, that you need to create methods and properties dynamically, it means the necessity to 
have a set different functionalities available with the same name.

In PHP, and in other programming languages, exists an usage of this functionality called *method overloading* that 
provides instead a lot of methods without declaring them in your scope explicitily.
Your need could be to have similar functionalities similar names, so a great way to implement this is to isolate
the main logic of your function and declare methods as overloaded.

Supposing you have a class which takes care to return properties of an external object and you don't want to declare each
 *get* method. The following could be an interesting solution:
 
```php
<?php
class UnknownBookPropertyException extends Exception {
}

class Book {
    public $title;
    public $author;

    public function __construct(string $title, string $author)
    {
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

$book = new Book('Foo', 'John Doe');
$librarian = new Librarian($book);

echo $librarian->getBookTitle(); // prints 'Foo'
echo $librarian->getBookPublishDate(); // throws an exception
```

The *method overloading* is provided by the **__call** method of the *Librarian* class: inside it a regular expression 
match allow to trigger methods of which name starts with **getBook** followed by the needed property; before to get the
book property we make sure that the given one is one of the availables, title and author, and next return it.

In this case if the book properties change or increase you don't need to declare get methods for each new property 
because them are automatically declared.