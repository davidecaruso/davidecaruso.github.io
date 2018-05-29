---
title: Dependency Injection vs Dependency Inversion
tags:
  - solid principles
  - design patterns
  - oop
date: 2018-05-29 13:59:39
---


The *Dependency Injection* and the *Dependency Inversion* are concepts closely related and often confused with each other – maybe for their similar names – but are different. 

## Dependency Injection
The *Dependency Injection* is a structural **Design Pattern**. It helps to decouple our code base with external components thus will be easier to test it, refactor it and moreover control its dependencies.

An example of coupled dependency could be the following:
```php
<?php
class UserController
{
    public function viewAction()
    {
        $repository = new UserRepository();
        $user = $repository->getById(42);
        return $user;
    }
}
```
The *UserRepository* is tightly coupled to the *User* class, and it'll be a problem if we need to rafactor the method by which we retrieved data from database or maybe switching to a different database storage.

A solution is to define a *contract* between the class and its dependency through a *setter injection*:
```php
<?php
class UserController
{
    protected $repository;
    public function setUserRepository(UserRepository $repo)
    {
        $this->repository = $repo;
    }
    public function viewAction()
    {
        $user = $this->repository->getById(42);
        return $user;
    }
}

// and then

$controller = new UserController();
$controller->setUserRepository(new UserRepository());
$user = $controller->viewAction();
```
Though this solutions works, each time we use the user class we need to *set* the repository property, and even more if we forgot to do this could be some errors.

So the better solution is the *constructor injection*:
```php
<?php
class UserController
{
    protected $repository;
    public function __construct(UserRepository $repo)
    {
        $this->repository = $repo;
    }
    public function viewAction()
    {
        $user = $this->repository->getById(42);
        return $user;
    }
}

// and then

$controller = new UserController(new UserRepository());
$user = $controller->viewAction();
```
Now we can safely change the repository for the *UserController* class when necessary and test it easily.

## Dependency Inversion
The *Dependency Inversion* is one of the **SOLID Principles**. It states:
> High level modules should not depend upon low level modules. Both should
  depend upon abstractions.
  
And:

> Abstractions should not depend upon details. Details should depend upon
  abstractions.

It helps to not couple our code base to concretions but to abstractions, thus we can safely change functionalities without worrying about broken code.

Let's take as example a class which manages a game:
```php
class GameManager
{
    protected $input;
    protected $video;
    public function __construct()
    {
        $this->input = new KeyboardInput();
        $this->video = new ScreenOutput();
    }
    public function run()
    {
        // accept user input from $this->input
        // draw the game state on $this->video
    }
}
```
The class is depending on two low level classes: *KeyboardInput* and *ScreenOutput*. If we ever want to change how input or output are handled in this class, such as switching to a joystick or terminal output, or switch platforms entirely, we can’t. We have a hard dependency on these two classes.

What we can do is invert this dependency to abstractions instead of concretions  using the *InputInterface* and the *OutputInterface* – note that we are using the *Dependency Injection* pattern:
```php
class GameManager
{
    protected $input;
    protected $video;
    public function __construct(
        InputInterface $input,
        OutputInterface $output
    ) {
        $this->input = $input;
        $this->video = $output;
    }
    public function run()
    {
        // accept user input from $this->input
        // draw the game state on $this->video
    }
}

class KeyboardInput implements InputInterface
{
    public function getInputEvent() { /*...*/ }
}
class JoystickInput implements InputInterface
{
    public function getInputEvent() { /*...*/ }
}
class ScreenOutput implements OutputInterface
{
    public function render() { /*...*/ }
}
class TerminalOutput implements OutputInterface
{
    public function render() { /*...*/ }
}
```
Doing that we can easily change functionalities in the future, and it will have a little impact upon the existing code.

<br><br>Bye.